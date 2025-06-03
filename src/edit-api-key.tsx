import { Form, ActionPanel, Action, showToast, Toast, popToRoot, Icon } from "@raycast/api";
import { useState } from "react";
import { updateApiKey } from "./utils/apiKeyStorage"; // Now uses flat JSON storage

interface EditApiKeyProps {
  name: string;
  service: string;
  keyValue: string;
  showKey?: boolean;
  onToggleKeyVisibility?: () => void;
  onSave: () => void;
}

// Common services with their icons
const SERVICES = [
  { name: "AWS", icon: Icon.Cloud },
  { name: "Azure", icon: Icon.Link },
  { name: "Google Cloud", icon: Icon.Globe },
  { name: "GitHub", icon: Icon.Code },
  { name: "Stripe", icon: Icon.CreditCard },
  { name: "SendGrid", icon: Icon.Envelope },
  { name: "Twilio", icon: Icon.Message },
  { name: "Custom", icon: Icon.Key },
] as const;

interface FormValues {
  service: string;
  keyName: string;
  keyValue: string;
}

export default function EditApiKey({ 
  name, 
  service, 
  keyValue, 
  showKey = false, 
  onToggleKeyVisibility,
  onSave,
  id // add id to props
}: EditApiKeyProps & { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const initialService = SERVICES.find(s => s.name === service) ? service : "Custom";
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [customService, setCustomService] = useState<string>(initialService === "Custom" ? service || "" : "");
  
  const [keyName, setKeyName] = useState(name);
  const [key, setKey] = useState(keyValue);

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
      await updateApiKey(id, { service: serviceName, name: values.keyName, key: values.keyValue });
      await showToast({
        style: Toast.Style.Success,
        title: "API Key Updated",
        message: `Successfully updated ${values.keyName}`,
      });
      onSave();
      await popToRoot();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Update API Key",
        message: "Could not update API key in local storage",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Update API Key"
            onSubmit={handleSubmit}
            icon={Icon.Pencil}
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
            icon={service.icon}
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
        />
      )}

      <Form.TextField
        id="keyName"
        title="Key Name"
        placeholder="Enter a name for this key"
        value={keyName}
        onChange={setKeyName}
      />

      <Form.PasswordField
        id="keyValue"
        title="API Key"
        placeholder="Enter your API key value"
        value={key}
        onChange={setKey}
      />

      <Form.Description
        title="Note"
        text="Your API key will be securely stored and can be accessed later through the API Keys list."
      />
    </Form>
  );
}
