import { useState } from "react";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = async (text, type, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(`${type}-${index}`);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return { copied, copyToClipboard };
}
