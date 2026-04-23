const MAX_BULLET_LENGTH = 180
const MAX_BULLETS = 3
const MIN_SEGMENT_LENGTH = 40

const normalizeWhitespace = (text) => text.replaceAll(/\s+/g, " ").trim()

const stripHtml = (html = "") => {
  if (typeof DOMParser !== "undefined") {
    const documentFragment = new DOMParser().parseFromString(html, "text/html")
    return normalizeWhitespace(documentFragment.body.textContent ?? "")
  }

  return normalizeWhitespace(html.replaceAll(/<[^>]+>/g, " "))
}

const clampSentence = (sentence) => {
  if (sentence.length <= MAX_BULLET_LENGTH) {
    return sentence
  }

  return `${sentence.slice(0, MAX_BULLET_LENGTH).replace(/\s+\S*$/, "")}...`
}

const buildSentenceCandidates = (text) => {
  const sentenceCandidates = text
    .split(/(?<=[.!?。！？])\s+/u)
    .map((sentence) => normalizeWhitespace(sentence))
    .filter((sentence) => sentence.length >= MIN_SEGMENT_LENGTH)

  if (sentenceCandidates.length > 0) {
    return sentenceCandidates
  }

  return text
    .split(/[;；:：]\s+|\n+/u)
    .map((sentence) => normalizeWhitespace(sentence))
    .filter(Boolean)
}

const generateArticleSummary = (entry) => {
  const plainText = stripHtml(entry?.content)
  const sentenceCandidates = buildSentenceCandidates(plainText)
  const summaryItems = sentenceCandidates
    .slice(0, MAX_BULLETS)
    .map((sentence) => clampSentence(sentence))

  if (summaryItems.length > 0) {
    return summaryItems
  }

  if (entry?.title) {
    return [entry.title]
  }

  return []
}

export default generateArticleSummary
