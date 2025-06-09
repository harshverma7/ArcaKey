import IconButton from "../../ui/IconButton";

export function SeedPhraseCard({
  mnemonic,
  isDarkMode,
  showSeedPhrase,
  onToggleVisibility,
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border rounded-lg overflow-hidden transition-colors duration-300`}
    >
      <div className="flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onToggleVisibility}
          className={`flex items-center gap-2 sm:gap-3 text-left ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
          } transition-all duration-300 flex-1 -m-4 sm:-m-6 p-4 sm:p-6 rounded-lg`}
        >
          <span className="text-lg sm:text-xl font-semibold">
            Your Secret Phrase
          </span>
          <span
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } text-base sm:text-lg transition-transform duration-300 ml-auto ${
              showSeedPhrase ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>
        <IconButton
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          isDarkMode={isDarkMode}
          tooltip="Copy phrase"
          className="ml-2 sm:ml-3"
        >
          Copy
        </IconButton>
      </div>

      {showSeedPhrase && (
        <div
          className={`px-4 sm:px-6 pb-4 sm:pb-6 border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="mt-4 sm:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className={`${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  } border rounded-lg p-2 sm:p-3 transition-colors duration-200 cursor-pointer hover:shadow-sm`}
                >
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } mb-1`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-mono ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {word}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`text-center text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Keep this phrase secure and never share it with anyone
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
