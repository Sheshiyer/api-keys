import { Action, ActionPanel, Detail, Form, Icon, showToast, Toast, useNavigation } from "@raycast/api";
import { useState, useEffect } from "react";
import { ApiKey, updateApiKey, updateKeyLastUsed } from "./utils/apiKeyStorage"; 
import { formatDistanceToNow } from "date-fns"; 
import { copyToClipboardWithClear } from "./utils/clipboard";

interface ViewApiKeyDetailProps {
  apiKey: ApiKey;
  showKey?: boolean;
  onToggleKeyVisibility?: () => void;
  onUpdate?: () => void;
}

export default function ViewApiKeyDetail({ 
  apiKey: initialApiKey, 
  showKey: initialShowKey = false,
  onToggleKeyVisibility,
  onUpdate 
}: ViewApiKeyDetailProps) {
  const [apiKey, setApiKey] = useState<ApiKey>(initialApiKey);
  const [isEditing, setIsEditing] = useState(false);
  const [showFullKey, setShowFullKey] = useState(initialShowKey);
  const { pop } = useNavigation();

  // Update last used when the detail view is opened
  useEffect(() => {
    const updateLastUsed = async () => {
      await updateKeyLastUsed(apiKey.id);
      onUpdate?.();
    };
    updateLastUsed();
  }, [apiKey.id, onUpdate]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Never' : `${date.toLocaleDateString()} (${formatDistanceToNow(date, { addSuffix: true })})`;
    } catch (e) {
      return 'Never';
    }
  };

  const toggleKeyVisibility = () => {
    const newVisibility = !showFullKey;
    setShowFullKey(newVisibility);
    if (onToggleKeyVisibility) onToggleKeyVisibility();
  };

  const copyToClipboard = async () => {
    await copyToClipboardWithClear(apiKey.key);
    await showToast({
      style: Toast.Style.Success,
      title: "Copied to clipboard",
      message: "API key has been copied to your clipboard",
    });
    await updateKeyLastUsed(apiKey.id);
    onUpdate?.();
  };

  const displayKey = showFullKey 
    ? apiKey.key 
    : '•'.repeat(Math.min(apiKey.key.length, 8));

  const markdown = `
# ${apiKey.name}

**Service:** ${apiKey.service || "Not specified"}

**Categories:** ${apiKey.categories?.join(', ') || "Not specified"}

**Last Used:** ${formatDate(apiKey.lastUsed)}

**API Key:**
\`\`\`
${displayKey}
\`\`\`

**Notes:**
${apiKey.notes || "No notes"}
`;

  interface FormValues {
    name: string;
    service: string;
    categories: string[];
    notes?: string;
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const updatedApiKey: ApiKey = {
        ...apiKey,
        name: values.name,
        service: values.service,
        categories: values.categories,
        notes: values.notes,
      };
      await updateApiKey(apiKey.id, {
        name: values.name,
        service: values.service,
        categories: values.categories,
        notes: values.notes,
      });
      setApiKey(updatedApiKey);
      setIsEditing(false);
      onUpdate?.();
      await showToast({
        style: Toast.Style.Success,
        title: "API Key Updated",
        message: "Changes have been saved successfully",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to update API key",
      });
    }
  };

  if (isEditing) {
    return (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm 
              title="Save Changes" 
              onSubmit={handleSubmit}
            />
            <Action title="Cancel" onAction={() => setIsEditing(false)} />
          </ActionPanel>
        }
      >
        <Form.TextField id="name" title="Name" defaultValue={apiKey.name} />
        <Form.TextField id="service" title="Service" defaultValue={apiKey.service} />
        <Form.TagPicker id="categories" title="Categories" defaultValue={apiKey.categories || []}>
          {(apiKey.categories || []).map((cat) => (
            <Form.TagPicker.Item key={cat} value={cat} title={cat} />
          ))}
        </Form.TagPicker>
        <Form.TextArea id="notes" title="Notes" defaultValue={apiKey.notes || ''} />
      </Form>
    );
  }

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title="Copy API Key"
              icon={Icon.Clipboard}
              onAction={copyToClipboard}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
            <Action
              title={showFullKey ? "Hide Key" : "Show Key"}
              icon={showFullKey ? Icon.EyeDisabled : Icon.Eye}
              onAction={toggleKeyVisibility}
              shortcut={{ modifiers: ["cmd"], key: "h" }}
            />
            <Action
              title="Edit API Key"
              icon={Icon.Pencil}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
              onAction={() => setIsEditing(true)}
            />
            <Action
              title="Back to List"
              icon={Icon.ArrowLeft}
              onAction={pop}
              shortcut={{ modifiers: ["cmd"], key: "[" }}
            />
            <Action
              title="Edit API Key"
              icon={Icon.Pencil}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
              onAction={() => {
                // Will implement edit functionality later
              }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
