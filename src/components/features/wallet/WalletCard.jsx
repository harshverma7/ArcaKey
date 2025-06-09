import { useState } from "react";
import IconButton from "../../ui/IconButton";

export function WalletCard({
  wallet,
  index,
  onCopyAddress,
  onCopyPrivateKey,
  copied,
  walletRef,
  onDeleteWallet,
  isDarkMode,
}) {
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const togglePrivateKey = () => {
    setIsPrivateKeyVisible(!isPrivateKeyVisible);
  };

  return (
    <div
      ref={walletRef}
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border rounded-lg p-4 sm:p-6 animate-in transition-colors duration-300`}
    >
      {/* Wallet Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">
          Wallet {index + 1}
        </h3>
        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton
            onClick={() => onCopyAddress(wallet.publicKey, "address", index)}
            variant="ghost"
            size="sm"
            isDarkMode={isDarkMode}
            tooltip="Copy public key"
          >
            Copy
          </IconButton>
          <IconButton
            onClick={() => onDeleteWallet(index)}
            variant="danger"
            size="sm"
            isDarkMode={isDarkMode}
            tooltip="Delete wallet"
          >
            Delete
          </IconButton>
        </div>
      </div>

      {/* Public Key */}
      <div className="mb-4 sm:mb-6">
        <label
          className={`block text-xs sm:text-sm font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          } mb-2 sm:mb-3`}
        >
          Public Key
        </label>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } rounded-lg p-3 sm:p-4 border overflow-hidden`}
        >
          <p
            className={`text-xs sm:text-sm font-mono ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } break-all leading-relaxed overflow-wrap-anywhere word-break-break-all`}
          >
            {wallet.publicKey}
          </p>
        </div>
      </div>

      {/* Private Key */}
      <div>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <label
            className={`block text-xs sm:text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Private Key
          </label>
          <IconButton
            onClick={togglePrivateKey}
            variant="ghost"
            size="sm"
            isDarkMode={isDarkMode}
            tooltip={
              isPrivateKeyVisible ? "Hide private key" : "Show private key"
            }
          >
            {isPrivateKeyVisible ? "Hide" : "Show"}
          </IconButton>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } rounded-lg p-3 sm:p-4 border overflow-hidden`}
        >
          <p
            className={`text-xs sm:text-sm font-mono ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } break-all leading-relaxed overflow-wrap-anywhere word-break-break-all ${
              !isPrivateKeyVisible ? "tracking-tighter" : ""
            }`}
          >
            {isPrivateKeyVisible ? wallet.privateKey : "•".repeat(64)}
          </p>
        </div>

        {isPrivateKeyVisible && (
          <div className="mt-2 sm:mt-3 flex justify-end">
            <IconButton
              onClick={() =>
                onCopyPrivateKey(wallet.privateKey, "privateKey", index)
              }
              variant={copied === `privateKey-${index}` ? "success" : "primary"}
              size="sm"
              isDarkMode={isDarkMode}
              className={`text-xs ${
                copied === `privateKey-${index}`
                  ? "bg-green-600 text-white"
                  : ""
              }`}
            >
              {copied === `privateKey-${index}`
                ? "✓ Copied"
                : "Copy Private Key"}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
