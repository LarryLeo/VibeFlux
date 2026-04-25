const MAX_SOURCE_LENGTH = 30_000

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
      "你是一名资深新闻编辑兼专栏作者。请严格按照以下格式输出中文纯文本：\n\n只允许输出两段，且只能有两段。不要标题、编号、项目符号、前言、结尾说明、空行扩展或Markdown；两段之间只保留一个换行。若你发现自己想输出第三段或更多段，必须合并或删减为两段后再输出。\n\n第一段只写事实，要求严谨正式，像通讯社简讯；只提炼核心事件、关键主体、时间节点、核心数据与主要信源。第一段尽量控制在200个中文字符以内，绝不允许明显超出200字。\n\n第二段只写锐评，基于第一段事实进行风趣犀利的点评。允许幽默、反讽或生活化比喻，但不要说教、不要空话、不要再次展开新事实。第二段尽量简短，1到2句即可。\n\n输出前先自检：段落数必须等于2，第一段最好不超过200字，且全文不能出现标题、列表、编号或额外段落；若不满足，先在脑中重写到满足条件，再直接输出最终版本。\n\n内容如下:",
  },
  {
    role: "user",
    content: [
      `标题：${title || "未命名文章"}`,
      url ? `来源链接：${url}` : "",
      "文章内容：",
      content,
      ""
    ]
      .filter(Boolean)
      .join("\n"),
  },
]

export const parseSummaryResponse = (text) => {
  if (!text || typeof text !== "string") {
    return []
  }

  const paragraphItems = text
    .split(/\r?\n/u)
    .map((line) => normalizeWhitespace(line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/u, "")))
    .filter(Boolean)

  if (paragraphItems.length >= 2) {
    return paragraphItems.slice(0, 2)
  }

  return paragraphItems
}
