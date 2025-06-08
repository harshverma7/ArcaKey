import { useState } from "react";

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
          <button
            onClick={() => onCopyAddress(wallet.publicKey, "address", index)}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            } px-2 py-1 rounded transition-all duration-200 text-xs sm:text-sm transform hover:scale-105 active:scale-95`}
            title="Copy public key"
          >
            Copy
          </button>
          <button
            onClick={() => onDeleteWallet(index)}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-red-400 hover:bg-gray-800"
                : "text-gray-600 hover:text-red-500 hover:bg-gray-100"
            } px-2 py-1 rounded transition-all duration-200 text-xs sm:text-sm transform hover:scale-105 active:scale-95`}
            title="Delete wallet"
          >
            Delete
          </button>
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
          <button
            onClick={togglePrivateKey}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            } px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-200 text-xs sm:text-sm font-medium transform hover:scale-105 active:scale-95`}
            title={
              isPrivateKeyVisible ? "Hide private key" : "Show private key"
            }
          >
            {isPrivateKeyVisible ? "Hide" : "Show"}
          </button>
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
            <button
              onClick={() =>
                onCopyPrivateKey(wallet.privateKey, "privateKey", index)
              }
              className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                copied === `privateKey-${index}`
                  ? "bg-green-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
            >
              {copied === `privateKey-${index}`
                ? "✓ Copied"
                : "Copy Private Key"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
