import { Form, ActionPanel, Action, showToast, Toast, popToRoot, Icon, useNavigation } from "@raycast/api";
import { useState } from "react";
import { addApiKey, getApiKeys } from "./utils/apiKeyStorage"; // Now uses flat JSON storage

// Common services with emojis in their names
const SERVICES = [
  { name: "🎵 ElevenLabs", category: "Text-to-Speech" },
  { name: "🤖 Operative", category: "Web Evaluation Agent" },
  { name: "⚡ OpenAI", category: "Image Generation" },
  { name: "🎨 Everart Forge", category: "Image Generation" },
  { name: "🔍 Brave Search", category: "Web Search" },
  { name: "✏️ Figma", category: "Design Tool Integration" },
  { name: "💡 Perplexity", category: "AI Search & Research" },
  { name: "🕸️ Firecrawl", category: "Web Scraping" },
  { name: "✉️ Resend", category: "Email Sending" },
  { name: "🔑 Custom", category: "Other" },
] as const;

interface FormValues {
  service: string;
  keyName: string;
  keyValue: string;
  categories: string;
  notes: string;
}

interface AddApiKeyProps {
  onSave?: () => void;
}

export default function AddApiKey({ onSave = () => {} }: AddApiKeyProps) {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].name);
  const [customService, setCustomService] = useState<string>("");
  const [keyName, setKeyName] = useState<string>("");
  const [keyValue, setKeyValue] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  async function handleSubmit(values: FormValues) {
    if (!values.keyName || !values.keyValue) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Missing Fields",
        message: "Please fill in all required fields",
      });
      return;
    }

    setIsLoading(true);
    try {
      const serviceName = selectedService === "Custom" ? customService : selectedService;
      const categoryList = categories
        .split(',')
        .map(cat => cat.trim())
        .filter(Boolean);

      // First try to add the API key
      await addApiKey(serviceName, values.keyName, values.keyValue, categoryList, values.notes);
      
      // If we get here, the save was successful
      await showToast({
        style: Toast.Style.Success,
        title: "API Key Added",
        message: `Successfully added ${values.keyName} for ${serviceName}`,
      });
      onSave();
      popToRoot();
    } catch (error) {
      console.error("Error adding API key:", error);
      
      // Check if the key was actually saved despite the error
      try {
        const keys = await getApiKeys();
        const wasSaved = keys.some(k => 
          k.name === values.keyName && 
          k.service === (selectedService === "Custom" ? customService : selectedService)
        );
        
        if (wasSaved) {
          // If the key was saved despite the error, show success but log the error
          console.warn("API key was saved but an error occurred:", error);
          await showToast({
            style: Toast.Style.Success,
            title: "API Key Added",
            message: `Successfully added ${values.keyName}`,
          });
          onSave();
          popToRoot();
          return;
        }
      } catch (checkError) {
        console.error("Error checking if API key was saved:", checkError);
      }
      
      // If we get here, the key was not saved
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Add API Key",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Get random service for the form submit action
  const randomService = SERVICES[Math.floor(Math.random() * (SERVICES.length - 1))];

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add API Key"
            onSubmit={handleSubmit}
            icon={Icon.Key}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="service"
        title="Service"
        value={selectedService}
        onChange={setSelectedService}
      >
        {SERVICES.map((service) => (
          <Form.Dropdown.Item
            key={service.name}
            value={service.name}
            title={service.name}
            icon={Icon.Key}
          />
        ))}
      </Form.Dropdown>

      {selectedService === "Custom" && (
        <Form.TextField
          id="customService"
          title="Custom Service Name"
          placeholder="Enter custom service name"
          value={customService}
          onChange={setCustomService}
          autoFocus
        />
      )}

      <Form.TextField
        id="keyName"
        title="Key Name"
        placeholder="Enter key name (e.g., PRODUCTION_API_KEY)"
        value={keyName}
        onChange={setKeyName}
      />

      <Form.PasswordField
        id="keyValue"
        title="API Key"
        placeholder="Enter your API key value"
        value={keyValue}
        onChange={setKeyValue}
      />

      <Form.TextField
        id="categories"
        title="Categories (comma-separated)"
        placeholder="e.g., work, personal, project-x"
        value={categories}
        onChange={setCategories}
      />

      <Form.TextArea
        id="notes"
        title="Notes"
        placeholder="Add any additional notes about this API key"
        value={notes}
        onChange={setNotes}
      />

      <Form.Description
        title="Note"
        text="Your API key will be securely stored and can be accessed later through the API Keys list."
      />
    </Form>
  );
}
