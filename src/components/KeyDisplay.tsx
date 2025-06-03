import { Action, ActionPanel, Icon } from "@raycast/api";
import { useState } from "react";
import { copyToClipboardWithClear } from "../utils/clipboard";

interface KeyDisplayProps {
  value: string;
  showFullKey?: boolean;
  onToggleVisibility?: () => void;
}

export function KeyDisplay({ value, showFullKey = false, onToggleVisibility }: KeyDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    if (onToggleVisibility) onToggleVisibility();
  };

  const displayValue = () => {
    if (isVisible || showFullKey) return value;
    if (value.length <= 8) return "•".repeat(8);
    const visibleChars = 4;
    return `${value.substring(0, visibleChars)}${'•'.repeat(8)}${value.substring(value.length - visibleChars)}`;
  };

  const copyToClipboard = async () => {
    try {
      await copyToClipboardWithClear(value);
      setHasCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setHasCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action
          title="Copy to Clipboard"
          icon={hasCopied ? Icon.Checkmark : Icon.Clipboard}
          onAction={copyToClipboard}
        />
        <Action
          title={isVisible ? "Hide Key" : "Show Key"}
          icon={isVisible ? Icon.EyeDisabled : Icon.Eye}
          onAction={toggleVisibility}
          shortcut={{ modifiers: ["cmd"], key: "h" }}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
