import { List, showToast, Toast, ActionPanel, Action, Icon, Detail, Grid, LocalStorage, getPreferenceValues } from "@raycast/api";
import { Grid as GridView } from "@raycast/api";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ApiKey, getApiKeys, deleteApiKey, getAllCategories, getKeysByCategory } from "./utils/apiKeyStorage"; // Now uses flat JSON storage
import { ApiKeyListItem } from "./components/ApiKeyListItem";
import AddApiKey from "./add-api-key";

// Track which keys are currently visible
const useVisibleKeys = () => {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  return { visibleKeys, toggleKeyVisibility };
};

export default function Command() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showKeyStates, setShowKeyStates] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [viewType, setViewType] = useState<string>("list");

  const preferences = getPreferenceValues();
  const defaultView = preferences?.defaultView || "list";

  const fetchApiKeys = useCallback(async () => {
    setIsLoading(true);
    try {
      const keys = await getApiKeys();
      setApiKeys(keys); // Now uses flat JSON storage
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Load API Keys",
        message: "Could not load API keys from local storage",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh data when component mounts and after adding a new key
  useEffect(() => {
    const loadData = async () => {
      await fetchApiKeys();
      const cats = await getAllCategories();
      setCategories(cats);
    };
    loadData();

    // Load view type from preferences
    const loadViewType = async () => {
      const savedView = await LocalStorage.getItem("defaultView");
      if (savedView) {
        setViewType(savedView as string);
      }
    };
    loadViewType();
  }, []);

  const filteredKeys = useMemo(() => {
    let result = [...apiKeys];
    
    // Filter by search text
    if (searchText) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (key) =>
          key.name.toLowerCase().includes(search) ||
          key.service.toLowerCase().includes(search) ||
          (key.categories?.some(cat => cat.toLowerCase().includes(search))) ||
          (key.notes?.toLowerCase().includes(search))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(key => 
        key.categories?.includes(selectedCategory)
      );
    }
    
    // Sort by last used (most recent first)
    return result.sort((a, b) => {
      const aTime = a.lastUsed ? new Date(a.lastUsed).getTime() : 0;
      const bTime = b.lastUsed ? new Date(b.lastUsed).getTime() : 0;
      return bTime - aTime;
    });
  }, [apiKeys, searchText, selectedCategory]);

  if (isLoading) {
    return (
      <List isLoading={true} searchBarPlaceholder="Loading your API keys...">
        <List.EmptyView
          icon={{ source: Icon.ArrowClockwise }}
          title="Loading your API keys"
          description="Please wait while we load your saved API keys..."
        />
      </List>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <List searchBarPlaceholder="No API keys found">
        <List.EmptyView
          icon={{ source: Icon.Key }}
          title="No API Keys Found"
          description={
            'Get started by adding your first API key. Click the "Add API Key" button below.'
          }
          actions={
            <ActionPanel>
              <Action.Push
                title="Add API Key"
                icon={Icon.Plus}
                target={<AddApiKey onSave={fetchApiKeys} />}
                shortcut={{ modifiers: ["cmd"], key: "n" }}
              />
              <Action.OpenInBrowser
                title="View Documentation"
                url="https://developer.raycast.com"
                icon={Icon.Book}
              />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  const renderCategoryDropdown = () => (
    <List.Dropdown
      tooltip="Filter by Category"
      value={selectedCategory}
      onChange={setSelectedCategory}
    >
      <List.Dropdown.Item title="All Categories" value="All" />
      {categories.map((category) => (
        <List.Dropdown.Item 
          key={category} 
          title={category} 
          value={category}
        />
      ))}
    </List.Dropdown>
  );

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search API keys..."
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select View Type"
          value={viewType}
          onChange={(newValue) => {
            setViewType(newValue);
            LocalStorage.setItem("defaultView", newValue);
          }}
        >
          <List.Dropdown.Item title="List View" value="list" icon={Icon.List} />
          <List.Dropdown.Item title="Grid View" value="grid" icon={Icon.AppWindowGrid2x2} />
        </List.Dropdown>
      }
    >
      <List.Section title={selectedCategory === "All" ? "All API Keys" : `Category: ${selectedCategory}`}>
        {filteredKeys.length === 0 ? (
          <List.EmptyView
            icon={Icon.Key}
            title="No API Keys Found"
            description={
              selectedCategory === "All" 
                ? "Add your first API key to get started"
                : `No keys found in category "${selectedCategory}"`
            }
            actions={
              <ActionPanel>
                <Action.Push
                  title="Add API Key"
                  target={<AddApiKey onSave={fetchApiKeys} />}
                  icon={Icon.Plus}
                />
                {selectedCategory !== "All" && (
                  <Action
                    title="Clear Category Filter"
                    onAction={() => setSelectedCategory("All")}
                    icon={Icon.XmarkCircle}
                  />
                )}
              </ActionPanel>
            }
          />
        ) : (
          viewType === "list" ? (
            filteredKeys.map((apiKey) => {
              const keyId = `${apiKey.name}-${apiKey.service}`;
              return (
                <ApiKeyListItem
                  key={keyId}
                  keyId={keyId}
                  apiKey={apiKey}
                  onKeyUpdated={fetchApiKeys}
                  onToggleKeyVisibility={() => setShowKeyStates(prev => ({...prev, [keyId]: !prev[keyId]}))}
                  showKey={!!showKeyStates[keyId]}
                />
              );
            })
          ) : (
            <GridView columns={2} aspectRatio="1">
              {filteredKeys.map((apiKey) => {
                const keyId = `${apiKey.name}-${apiKey.service}`;
                return (
                  <ApiKeyListItem
                    key={keyId}
                    keyId={keyId}
                    apiKey={apiKey}
                    onKeyUpdated={fetchApiKeys}
                    onToggleKeyVisibility={() => setShowKeyStates(prev => ({...prev, [keyId]: !prev[keyId]}))}
                    showKey={!!showKeyStates[keyId]}
                  />
                );
              })}
            </GridView>
          )
        )}
      </List.Section>
    </List>
  );
}
