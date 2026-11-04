/**
 * Robust clipboard copy utility with fallback for mobile devices and iframes
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Modern navigator.clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed, attempting fallback...', err);
    }
  }

  // Fallback using temporary textarea element for iOS / older browsers / permission edge cases
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Prevent zooming on iOS
    textArea.style.fontSize = '16px';
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (fallbackErr) {
    console.error('Clipboard fallback also failed:', fallbackErr);
    return false;
  }
}
