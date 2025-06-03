import { homedir } from "os";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";

export interface ApiKey {
  id: string;
  service: string;
  name: string;
  key: string;
  categories?: string[];
  lastUsed?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_PATH = join(homedir(), ".raycast-api-keys", "api-keys.json");

// Fallback for crypto.randomUUID()
function generateUUID(): string {
  try {
    return crypto.randomUUID();
  } catch (e) {
    // Fallback for environments without crypto.randomUUID()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

async function ensureStorageDir(): Promise<void> {
  try {
    await mkdir(dirname(STORAGE_PATH), { recursive: true });
  } catch (error) {
    console.error("Failed to create storage directory:", error);
    throw new Error("Could not create storage directory");
  }
}

export async function getApiKeys(): Promise<ApiKey[]> {
  try {
    await ensureStorageDir();
    const data = await readFile(STORAGE_PATH, "utf-8");
    return JSON.parse(data) as ApiKey[];
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return []; // File doesn't exist yet
    }
    console.error("Error reading API keys:", err);
    throw new Error("Failed to read API keys");
  }
}

export async function saveApiKeys(keys: ApiKey[]): Promise<void> {
  try {
    await ensureStorageDir();
    await writeFile(STORAGE_PATH, JSON.stringify(keys, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving API keys:", error);
    throw new Error("Failed to save API keys");
  }
}

// Adds a new API key. Prevents duplicates for (service, name) pairs.
// API keys are stored in the user's home directory and persist across reboots.
// No key values are logged or exposed for security.
export async function addApiKey(
  service: string, 
  name: string, 
  key: string, 
  categories: string[] = [],
  notes: string = ''
): Promise<ApiKey> {
  try {
    const keys = await getApiKeys();
    // Prevent duplicate (service, name) pairs
    if (keys.some(k => k.service === service && k.name === name)) {
      throw new Error(`API key for service '${service}' with name '${name}' already exists.`);
    }
    const now = new Date().toISOString();
    const apiKey: ApiKey = {
      id: generateUUID(),
      service,
      name,
      key,
      categories,
      notes,
      createdAt: now,
      updatedAt: now,
    };
    keys.push(apiKey);
    await saveApiKeys(keys);
    return apiKey;
  } catch (error: any) {
    // Only log error messages, never log the key value
    if (error instanceof SyntaxError) {
      console.error("JSON parse error in api-keys.json. File may be corrupted.");
    } else if (error && error.message) {
      console.error("Error in addApiKey:", error.message);
    } else {
      console.error("Unknown error in addApiKey");
    }
    throw new Error(error?.message || "Failed to add API key");
  }
}

export async function updateApiKey(
  id: string, 
  updates: Partial<Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const keys = await getApiKeys();
    const idx = keys.findIndex(k => k.id === id);
    if (idx === -1) {
      throw new Error(`API key with ID ${id} not found`);
    }
    
    keys[idx] = { 
      ...keys[idx], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await saveApiKeys(keys);
  } catch (error) {
    console.error("Error in updateApiKey:", error);
    throw new Error("Failed to update API key");
  }
}

// Category management
export async function getAllCategories(): Promise<string[]> {
  const keys = await getApiKeys();
  const categories = new Set<string>();
  
  keys.forEach(key => {
    if (key.categories && key.categories.length > 0) {
      key.categories.forEach(cat => categories.add(cat));
    }
  });
  
  return Array.from(categories).sort();
}

export async function getKeysByCategory(category: string): Promise<ApiKey[]> {
  const keys = await getApiKeys();
  return keys.filter(key => 
    key.categories && key.categories.includes(category)
  );
}

export async function updateKeyLastUsed(id: string): Promise<void> {
  try {
    const keys = await getApiKeys();
    const idx = keys.findIndex(k => k.id === id);
    if (idx === -1) return;
    
    keys[idx].lastUsed = new Date().toISOString();
    await saveApiKeys(keys);
  } catch (error) {
    console.error('Error updating last used timestamp:', error);
  }
}

export async function deleteApiKey(id: string): Promise<void> {
  try {
    const keys = await getApiKeys();
    const initialLength = keys.length;
    const filtered = keys.filter(k => k.id !== id);
    
    if (filtered.length === initialLength) {
      throw new Error(`API key with ID ${id} not found`);
    }
    
    await saveApiKeys(filtered);
  } catch (error) {
    console.error("Error in deleteApiKey:", error);
    throw new Error("Failed to delete API key");
  }
}