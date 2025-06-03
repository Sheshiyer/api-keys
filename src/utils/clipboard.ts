import { Clipboard, showToast, Toast } from "@raycast/api";

const DEFAULT_CLEAR_DELAY = 30 * 1000; // 30 seconds

let clearTimer: NodeJS.Timeout | null = null;

export async function copyToClipboardWithClear(
  text: string, 
  clearDelay: number = DEFAULT_CLEAR_DELAY
): Promise<void> {
  try {
    // Clear any existing timer
    if (clearTimer) {
      clearTimeout(clearTimer);
      clearTimer = null;
    }

    // Copy the text to clipboard
    await Clipboard.copy(text);
    
    // Show success toast
    await showToast({
      style: Toast.Style.Success,
      title: "Copied to clipboard",
      message: "The key will be cleared after 30 seconds",
    });

    // Set timer to clear clipboard
    clearTimer = setTimeout(async () => {
      try {
        const currentText = await Clipboard.readText();
        if (currentText === text) {
          await Clipboard.clear();
          await showToast({
            style: Toast.Style.Success,
            title: "Clipboard cleared",
            message: "The key has been removed from clipboard",
          });
        }
      } catch (error) {
        console.error("Failed to clear clipboard:", error);
      } finally {
        clearTimer = null;
      }
    }, clearDelay);

  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to copy to clipboard",
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export function cancelClipboardClear(): void {
  if (clearTimer) {
    clearTimeout(clearTimer);
    clearTimer = null;
  }
}
