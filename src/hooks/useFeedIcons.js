import { useStore } from "@nanostores/react"
import { useEffect } from "react"

import { getFeedIcon } from "@/apis"
import { authState } from "@/store/authState"
import { defaultIcon, feedIconsState } from "@/store/feedIconsState"

const loadingIcons = new Set()

const useFeedIcons = (id, feed = null) => {
  const auth = useStore(authState)
  const feedIcons = useStore(feedIconsState)
  const externalIconId = feed?.icon?.external_icon_id

  useEffect(() => {
    if (feedIcons[id] || loadingIcons.has(id)) {
      return
    }

    loadingIcons.add(id)

    if (externalIconId) {
      const iconURL = `${auth.server}/feed/icon/${externalIconId}`

      feedIconsState.setKey(id, { ...defaultIcon, url: iconURL })
      loadingIcons.delete(id)
    } else {
      getFeedIcon(id)
        .then((data) => {
          const iconURL = `data:${data.data}`
          feedIconsState.setKey(id, { ...defaultIcon, url: iconURL })
          loadingIcons.delete(id)
          return null
        })
        .catch(() => {
          loadingIcons.delete(id)
        })
    }

    return () => {
      loadingIcons.delete(id)
    }
  }, [auth.server, externalIconId, feedIcons, id])

  return feedIcons[id]
}

export default useFeedIcons
