import { Action, ActionPanel, List, Icon, Color, showToast, Toast } from "@raycast/api";
import React, { useState, useEffect } from "react";
import { ApiKey, updateKeyLastUsed } from "../utils/apiKeyStorage";
import { copyToClipboardWithClear } from "../utils/clipboard";
import ViewApiKeyDetail from "../view-api-key-detail";
import EditApiKey from "../edit-api-key";

interface ApiKeyListItemProps {
  apiKey: ApiKey;
  onKeyUpdated?: () => void;
  onToggleKeyVisibility?: (keyId: string) => void;
  showKey?: boolean;
  keyId?: string;
}

export function ApiKeyListItem({ 
  apiKey, 
  onKeyUpdated, 
  onToggleKeyVisibility,
  showKey = false,
  keyId = ''
}: ApiKeyListItemProps) {
  const getServiceIcon = (service?: string): Icon => {
    switch (service?.toLowerCase()) {
      case "brave search":
        return Icon.Globe;
      case "everart ai":
        return Icon.Image;
      case "obsidian":
        return Icon.Document;
      case "github":
        return Icon.Terminal;
      case "openai":
        return Icon.Star;
      case "replicate":
        return Icon.Code;
      default:
        return Icon.Key;
    }
  };


  
  const handleToggleVisibility = async () => {
    if (onToggleKeyVisibility && keyId) {
      onToggleKeyVisibility(keyId);
      // Update last used when toggling visibility
      await updateKeyLastUsed(apiKey.id);
    }
  };

  // Format last used date
  const formatLastUsed = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <List.Item
      title={apiKey.name}
      subtitle={apiKey.service || "No service specified"}
      icon={getServiceIcon(apiKey.service)}
      detail={
        <List.Item.Detail
          markdown={`# ${apiKey.name}

**Service:** ${apiKey.service || "Not specified"}

**Key:**
\`\`\`
${showKey ? apiKey.key : '•'.repeat(apiKey.key.length >= 8 ? 8 : apiKey.key.length)}
\`\`\`
`}
        />
      }
      accessories={[
        {
          icon: showKey ? Icon.Eye : Icon.EyeDisabled,
          tooltip: showKey ? "Hide key" : "Show key",
        },
        ...(apiKey.categories?.length > 0 ? [{
          tag: { value: apiKey.categories.join(', '), color: Color.Blue },
          tooltip: 'Categories: ' + apiKey.categories.join(', ')
        }] : []),
        {
          text: `Last used: ${formatLastUsed(apiKey.lastUsed)}`,
          tooltip: apiKey.lastUsed ? `Last used on ${new Date(apiKey.lastUsed).toLocaleString()}` : 'Never used'
        }
      ]}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.Push
              title="View Details"
              icon={Icon.Eye}
              target={
                <ViewApiKeyDetail
                  apiKey={apiKey}
                />
              }
            />
            <Action.Push
              title="Edit API Key"
              icon={Icon.Pencil}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
              target={
                <EditApiKey
                  id={apiKey.id}
                  name={apiKey.name}
                  service={apiKey.service || ""}
                  keyValue={apiKey.key}
                  showKey={showKey}
                  onToggleKeyVisibility={handleToggleVisibility}
                  onSave={() => onKeyUpdated?.()}
                />
              }
            />
            <Action
              title={showKey ? "Hide Key" : "Show Key"}
              icon={showKey ? Icon.EyeDisabled : Icon.Eye}
              onAction={handleToggleVisibility}
              shortcut={{ modifiers: ["cmd"], key: "h" }}
            />
            <Action
              title="Copy Key to Clipboard"
              icon={Icon.Clipboard}
              onAction={() => copyToClipboardWithClear(apiKey.key)}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
            <Action
              title="Delete API Key"
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              onAction={async () => {
                const { deleteApiKey } = await import("../utils/apiKeyStorage");
                await deleteApiKey(apiKey.id);
                onKeyUpdated?.();
              }}
              shortcut={{ modifiers: ["cmd"], key: "backspace" }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.Push
              title="Add New API Key"
              icon={Icon.Plus}
              target={require("../add-api-key").default}
              shortcut={{ modifiers: ["cmd", "shift"], key: "n" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
