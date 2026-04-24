const MAX_BULLET_LENGTH = 180
const MAX_BULLETS = 3
const MIN_SEGMENT_LENGTH = 40
const MAX_SOURCE_LENGTH = 12_000

const normalizeWhitespace = (text) => text.replaceAll(/\s+/g, " ").trim()

const stripHtml = (html = "") => {
  if (typeof DOMParser !== "undefined") {
    const documentFragment = new DOMParser().parseFromString(html, "text/html")
    return normalizeWhitespace(documentFragment.body.textContent ?? "")
  }

  return normalizeWhitespace(html.replaceAll(/<[^>]+>/g, " "))
}

const truncateSource = (text) => {
  if (text.length <= MAX_SOURCE_LENGTH) {
    return text
  }

  return `${text.slice(0, MAX_SOURCE_LENGTH).replace(/\s+\S*$/u, "")}...`
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

export const sanitizeArticleForSummary = (entry) => {
  const plainText = truncateSource(stripHtml(entry?.content))

  return {
    content: plainText,
    title: entry?.title?.trim() ?? "",
    url: entry?.url?.trim() ?? "",
  }
}

export const buildArticleSummaryPrompt = ({ content, title, url }) => [
  {
    role: "system",
    content:
      "你是一名擅长总结 RSS 文章的助手。请用中文输出 2 到 3 条简洁的要点，聚焦具体事实，不要写导语、Markdown 标题或额外评论。",
  },
  {
    role: "user",
    content: [
      `标题：${title || "未命名文章"}`,
      url ? `来源链接：${url}` : "",
      "文章内容：",
      content,
      "",
      "请直接输出中文要点，每行一条，使用纯文本，不要加序号以外的多余格式。",
    ]
      .filter(Boolean)
      .join("\n"),
  },
]

export const parseSummaryResponse = (text) => {
  if (!text || typeof text !== "string") {
    return []
  }

  const bulletItems = text
    .split(/\r?\n/u)
    .map((line) => normalizeWhitespace(line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/u, "")))
    .filter((line) => line.length >= MIN_SEGMENT_LENGTH)
    .slice(0, MAX_BULLETS)
    .map((line) => clampSentence(line))

  if (bulletItems.length > 0) {
    return bulletItems
  }

  return buildSentenceCandidates(normalizeWhitespace(text))
    .slice(0, MAX_BULLETS)
    .map((sentence) => clampSentence(sentence))
}
