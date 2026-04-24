import { Divider, Input } from "@arco-design/web-react"
import { useStore } from "@nanostores/react"

import SettingItem from "./SettingItem"

import { polyglotState } from "@/hooks/useLanguage"
import { settingsState, updateSettings } from "@/store/settingsState"

const AiSettings = () => {
  const { openAiApiKey, openAiBaseUrl, openAiModel } = useStore(settingsState)
  const { polyglot } = useStore(polyglotState)

  return (
    <>
      <SettingItem
        description={polyglot.t("settings.ai_base_url_description")}
        title={polyglot.t("settings.ai_base_url_label")}
      >
        <Input
          className="input-select"
          placeholder={polyglot.t("settings.ai_base_url_placeholder")}
          value={openAiBaseUrl}
          onChange={(value) => updateSettings({ openAiBaseUrl: value.trim() })}
        />
      </SettingItem>

      <Divider />

      <SettingItem
        description={polyglot.t("settings.ai_api_key_description")}
        title={polyglot.t("settings.ai_api_key_label")}
      >
        <Input.Password
          className="input-select"
          placeholder={polyglot.t("settings.ai_api_key_placeholder")}
          value={openAiApiKey}
          onChange={(value) => updateSettings({ openAiApiKey: value.trim() })}
        />
      </SettingItem>

      <Divider />

      <SettingItem
        description={polyglot.t("settings.ai_model_description")}
        title={polyglot.t("settings.ai_model_label")}
      >
        <Input
          className="input-select"
          placeholder={polyglot.t("settings.ai_model_placeholder")}
          value={openAiModel}
          onChange={(value) => updateSettings({ openAiModel: value.trim() })}
        />
      </SettingItem>

      <Divider />

      <SettingItem
        description={polyglot.t("settings.ai_storage_notice_description")}
        title={polyglot.t("settings.ai_storage_notice_label")}
      >
        <div className="input-select" style={{ color: "var(--color-text-2)" }}>
          {polyglot.t("settings.ai_storage_notice_value")}
        </div>
      </SettingItem>
    </>
  )
}

export default AiSettings
