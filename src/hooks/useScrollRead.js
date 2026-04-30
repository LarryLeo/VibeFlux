import { Message } from "@arco-design/web-react"
import { useStore } from "@nanostores/react"
import { debounce, throttle } from "lodash-es"
import { useEffect, useRef } from "react"

import { updateEntriesStatus } from "@/apis"
import { handleEntriesStatusUpdate } from "@/hooks/useEntryActions"
import { polyglotState } from "@/hooks/useLanguage"
import { contentState } from "@/store/contentState"
import { settingsState } from "@/store/settingsState"

// An article is considered "read past" once its bottom edge has crossed above
// this fraction of the scroll container's visible height.
const READING_LINE_RATIO = 0.3

/**
 * Robustly marks unread articles as read when the user scrolls past them.
 *
 * Strategy
 * --------
 * 1. An IntersectionObserver (root = scroll container) records every card that
 *    enters the visible area into `seenIdsRef`.  This is the "dwell" gate: an
 *    article is never marked read unless it was actually rendered on screen.
 *
 * 2. A MutationObserver watches the scroll container so that cards added by the
 *    virtualizer after the initial mount are observed immediately.
 *
 * 3. A throttled scroll handler runs the position check on every scroll event:
 *    - Cards currently in the DOM whose bottom edge is above the reading line
 *      are added to `pendingIdsRef`.
 *    - Cards that are back below the reading line are removed from
 *      `pendingIdsRef` (handles scroll-back-up reliably).
 *    - Seen entries that are no longer in the DOM (virtualized out) and appear
 *      before the first currently-visible card in list order are also added to
 *      `pendingIdsRef` (handles fast/coarse scrolling that causes cards to be
 *      unmounted before the position check could fire).
 *
 * 4. A debounced flush (300 ms delay, 1 500 ms max-wait) converts the pending
 *    set into a single batched API call, keeping network traffic low.
 *
 * @param {{ entries: Array, cardsRef: React.RefObject }} options
 */
const useScrollRead = ({ entries, cardsRef }) => {
  const { markReadOnScroll } = useStore(settingsState)
  const { infoFrom } = useStore(contentState)
  const { polyglot } = useStore(polyglotState)

  // Ref that always holds the latest entries list without triggering re-effects.
  const entriesRef = useRef(entries)
  useEffect(() => {
    entriesRef.current = entries
  })

  // Keep polyglot up-to-date in a ref so the effect doesn't restart on locale
  // changes (language switching is rare and not worth re-mounting observers).
  const polyglotRef = useRef(polyglot)
  useEffect(() => {
    polyglotRef.current = polyglot
  })

  const seenIdsRef = useRef(new Set()) // ids that entered the viewport
  const pendingIdsRef = useRef(new Set()) // ids queued to be marked read

  // Clear accumulated state when the user navigates to an entirely different
  // feed / category (no overlap between old and new entry sets).
  const prevEntryIdsRef = useRef(null)
  useEffect(() => {
    const newIds = new Set(entries.map((e) => e.id))

    if (prevEntryIdsRef.current && prevEntryIdsRef.current.size > 0) {
      const hasOverlap = [...prevEntryIdsRef.current].some((id) => newIds.has(id))
      if (!hasOverlap) {
        seenIdsRef.current.clear()
        pendingIdsRef.current.clear()
      }
    }

    prevEntryIdsRef.current = newIds
  }, [entries])

  const enabled = markReadOnScroll && infoFrom !== "history"

  useEffect(() => {
    if (!enabled) {
      return
    }

    const container = cardsRef.current
    if (!container) {
      return
    }

    // ------------------------------------------------------------------
    // Flush: batch-mark all pending entries as read in one API call.
    // ------------------------------------------------------------------
    const flush = debounce(
      () => {
        if (pendingIdsRef.current.size === 0) {
          return
        }

        const pendingIds = new Set(pendingIdsRef.current)
        pendingIdsRef.current.clear()

        const toMark = entriesRef.current.filter(
          (e) => pendingIds.has(e.id) && e.status === "unread",
        )
        if (toMark.length === 0) {
          return
        }

        handleEntriesStatusUpdate(toMark, "read")
        updateEntriesStatus(
          toMark.map((e) => e.id),
          "read",
        ).catch(() => {
          handleEntriesStatusUpdate(toMark, "unread")
          Message.error(polyglotRef.current.t("actions.mark_as_read_error"))
        })
      },
      300,
      { maxWait: 1500 },
    )

    // ------------------------------------------------------------------
    // IntersectionObserver: record cards that have entered the viewport.
    // ------------------------------------------------------------------
    const io = new IntersectionObserver(
      (observations) => {
        for (const obs of observations) {
          if (obs.isIntersecting) {
            const id = Number(obs.target.dataset.entryId)
            if (id) {
              seenIdsRef.current.add(id)
            }
          }
        }
      },
      { root: container, threshold: 0.1 },
    )

    const observeCard = (element) => {
      if (element.dataset?.entryId) {
        io.observe(element)
      }
    }

    // Observe all cards already in the DOM.
    for (const card of container.querySelectorAll("[data-entry-id]")) {
      observeCard(card)
    }

    // ------------------------------------------------------------------
    // MutationObserver: pick up cards added by the virtualizer later.
    // ------------------------------------------------------------------
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) {
            continue
          }

          if (node.dataset?.entryId) {
            observeCard(node)
          } else {
            for (const card of node.querySelectorAll("[data-entry-id]")) {
              observeCard(card)
            }
          }
        }
      }
    })
    mo.observe(container, { childList: true, subtree: true })

    // ------------------------------------------------------------------
    // Scroll handler: position-based read detection.
    // ------------------------------------------------------------------
    const onScroll = throttle(() => {
      const containerRect = container.getBoundingClientRect()
      const readingLineY = containerRect.top + containerRect.height * READING_LINE_RATIO

      const domCards = container.querySelectorAll("[data-entry-id]")
      const domIds = new Set()

      // 1. Cards currently in the DOM.
      for (const card of domCards) {
        const id = Number(card.dataset.entryId)
        domIds.add(id)

        if (!seenIdsRef.current.has(id)) {
          continue
        }

        const rect = card.getBoundingClientRect()
        if (rect.bottom < readingLineY) {
          // Bottom edge is above the reading line → scrolled past.
          pendingIdsRef.current.add(id)
        } else {
          // Card is back below the reading line (user scrolled back up).
          pendingIdsRef.current.delete(id)
        }
      }

      // 2. Seen entries no longer in the DOM (virtualized out).
      //    Only add those that come *before* the first currently-visible card
      //    in list order, confirming they were scrolled past upward.
      if (domCards.length > 0) {
        const firstVisibleId = Number(domCards[0].dataset.entryId)
        const indexMap = new Map(entriesRef.current.map((e, i) => [e.id, i]))
        const firstVisibleIndex = indexMap.get(firstVisibleId) ?? -1

        if (firstVisibleIndex > 0) {
          for (const id of seenIdsRef.current) {
            if (domIds.has(id)) {
              continue
            }

            const index = indexMap.get(id) ?? -1
            if (index !== -1 && index < firstVisibleIndex) {
              pendingIdsRef.current.add(id)
            }
          }
        }
      }

      if (pendingIdsRef.current.size > 0) {
        flush()
      }
    }, 150)

    container.addEventListener("scroll", onScroll)

    return () => {
      container.removeEventListener("scroll", onScroll)
      onScroll.cancel()
      flush.cancel()
      io.disconnect()
      mo.disconnect()
    }
  }, [enabled, cardsRef])
}

export default useScrollRead
