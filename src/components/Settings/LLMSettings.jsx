import { Divider, Input } from "@arco-design/web-react"
import { useStore } from "@nanostores/react"

import { polyglotState } from "@/hooks/useLanguage"
import { settingsState, updateSettings } from "@/store/settingsState"

import "./LLMSettings.css"

const LLMSettings = () => {
  const { openAiApiKey, openAiBaseUrl, openAiModel } = useStore(settingsState)
  const { polyglot } = useStore(polyglotState)

  return (
    <div className="ai-settings-page">
      <section className="ai-settings-tip-panel">
        <div className="ai-settings-tip-header">
          <div className="ai-settings-tip-badge">Tips</div>
          <p className="ai-settings-tip-subtitle">
            {polyglot.t("settings.ai_storage_notice_description")}
          </p>
        </div>
      </section>

      <section className="ai-settings-card">
        <div className="ai-settings-field">
          <div className="ai-settings-field-text">
            <div className="ai-settings-field-title">{polyglot.t("settings.base_url_label")}</div>
            <div className="ai-settings-field-description">
              {polyglot.t("settings.ai_base_url_description")}
            </div>
          </div>
          <Input
            className="ai-settings-input"
            placeholder={polyglot.t("settings.ai_base_url_placeholder")}
            value={openAiBaseUrl}
            onChange={(value) => updateSettings({ openAiBaseUrl: value.trim() })}
          />
        </div>

        <Divider className="ai-settings-divider" />

        <div className="ai-settings-field">
          <div className="ai-settings-field-text">
            <div className="ai-settings-field-title">{polyglot.t("settings.api_key_label")}</div>
            <div className="ai-settings-field-description">
              {polyglot.t("settings.ai_api_key_description")}
            </div>
          </div>
          <Input.Password
            className="ai-settings-input"
            placeholder={polyglot.t("settings.ai_api_key_placeholder")}
            value={openAiApiKey}
            onChange={(value) => updateSettings({ openAiApiKey: value.trim() })}
          />
        </div>

        <Divider className="ai-settings-divider" />

        <div className="ai-settings-field">
          <div className="ai-settings-field-text">
            <div className="ai-settings-field-title">{polyglot.t("settings.model_label")}</div>
            <div className="ai-settings-field-description">
              {polyglot.t("settings.ai_model_description")}
            </div>
          </div>
          <Input
            className="ai-settings-input"
            placeholder={polyglot.t("settings.ai_model_placeholder")}
            value={openAiModel}
            onChange={(value) => updateSettings({ openAiModel: value.trim() })}
          />
        </div>
      </section>
    </div>
  )
}

export default LLMSettings
