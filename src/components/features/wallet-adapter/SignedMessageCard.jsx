import { useState } from "react";
import IconButton from "../../ui/IconButton";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";

export function SignedMessageCard({ signedMessage, isDarkMode }) {
  const [showFullSignature, setShowFullSignature] = useState(false);
  const { copied, copyToClipboard } = useCopyToClipboard();

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  const truncateSignature = (sig, length = 16) => {
    if (sig.length <= length * 2) return sig;
    return `${sig.slice(0, length)}...${sig.slice(-length)}`;
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border rounded-lg p-4 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-green-600">
          ✅ Message Signed
        </h4>
        <span
          className={`text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {formatDate(signedMessage.timestamp)}
        </span>
      </div>

      {/* Original Message */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label
            className={`text-xs font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Original Message
          </label>
          <IconButton
            onClick={() =>
              copyToClipboard(signedMessage.originalMessage, "message")
            }
            variant="ghost"
            size="sm"
            isDarkMode={isDarkMode}
            tooltip="Copy message"
          >
            {copied === "message" ? "✓ Copied" : "Copy"}
          </IconButton>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } rounded-lg p-3 border`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } break-words`}
          >
            {signedMessage.originalMessage}
          </p>
        </div>
      </div>

      {/* Signature */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label
            className={`text-xs font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Signature (Hex)
          </label>
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => setShowFullSignature(!showFullSignature)}
              variant="ghost"
              size="sm"
              isDarkMode={isDarkMode}
              tooltip={showFullSignature ? "Show less" : "Show full signature"}
            >
              {showFullSignature ? "Hide" : "Show"}
            </IconButton>
            <IconButton
              onClick={() =>
                copyToClipboard(signedMessage.signature, "signature")
              }
              variant="primary"
              size="sm"
              isDarkMode={isDarkMode}
              tooltip="Copy signature"
            >
              {copied === "signature" ? "✓ Copied" : "Copy"}
            </IconButton>
          </div>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } rounded-lg p-3 border`}
        >
          <p
            className={`text-xs font-mono ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } break-all leading-relaxed`}
          >
            {showFullSignature
              ? signedMessage.signature
              : truncateSignature(signedMessage.signature)}
          </p>
        </div>
      </div>

      {/* Signer Public Key */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            className={`text-xs font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Signer Public Key
          </label>
          <IconButton
            onClick={() =>
              copyToClipboard(signedMessage.publicKey, "publicKey")
            }
            variant="ghost"
            size="sm"
            isDarkMode={isDarkMode}
            tooltip="Copy public key"
          >
            {copied === "publicKey" ? "✓ Copied" : "Copy"}
          </IconButton>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } rounded-lg p-3 border`}
        >
          <p
            className={`text-xs font-mono ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } break-all leading-relaxed`}
          >
            {signedMessage.publicKey}
          </p>
        </div>
      </div>
    </div>
  );
}
