import { getSettings } from "@/store/settingsState"
import {
  buildArticleSummaryPrompt,
  parseSummaryResponse,
  sanitizeArticleForSummary,
} from "@/utils/article-summary"

const normalizeBaseUrl = (baseUrl) => baseUrl.trim().replace(/\/+$/u, "")

const getAiSummaryConfig = () => ({
  apiKey: getSettings("openAiApiKey")?.trim() ?? "",
  baseUrl: getSettings("openAiBaseUrl")?.trim() ?? "",
  model: getSettings("openAiModel")?.trim() ?? "",
})

export const hasAiSummaryConfig = () => {
  const { apiKey, baseUrl, model } = getAiSummaryConfig()
  return Boolean(apiKey && baseUrl && model)
}

const getResponseErrorMessage = async (response) => {
  try {
    const errorBody = await response.json()
    return errorBody?.error?.message ?? errorBody?.message ?? response.statusText
  } catch {
    return response.statusText
  }
}

export const generateArticleSummary = async (entry) => {
  const { apiKey, baseUrl, model } = getAiSummaryConfig()

  if (!apiKey || !baseUrl || !model) {
    throw new Error("AI summary is not configured")
  }

  const summaryInput = sanitizeArticleForSummary(entry)
  const response = await fetch(`${normalizeBaseUrl(baseUrl)}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: buildArticleSummaryPrompt(summaryInput),
    }),
  })

  if (!response.ok) {
    throw new Error(await getResponseErrorMessage(response))
  }

  const data = await response.json()
  const messageContent = data?.choices?.[0]?.message?.content
  const summaryItems = parseSummaryResponse(messageContent)

  if (summaryItems.length === 0) {
    throw new Error("The model returned an empty summary")
  }

  return summaryItems
}
