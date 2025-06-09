import { STYLES, getThemeClasses } from "../../../styles/styles";
import Button from "../../ui/Button";

export function PhraseInput({
  mnemonic,
  onMnemonicChange,
  onGenerateWallet,
  onWalletAdapter,
  onBack,
  selectedBlockchain,
  isDarkMode,
}) {
  return (
    <div className={STYLES.animateIn}>
      <Button
        onClick={onBack}
        variant="ghost"
        animation="translate"
        isDarkMode={isDarkMode}
        className="mb-4 sm:mb-6"
        leftIcon="←"
      >
        Back
      </Button>

      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
        Secret Recovery Phrase
      </h1>
      <p
        className={`${getThemeClasses(
          isDarkMode,
          "text"
        )} text-base sm:text-lg mb-6 sm:mb-8`}
      >
        Save these words in a safe place.
      </p>

      <div className={STYLES.spaceY}>
        <div>
          <input
            type="text"
            value={mnemonic}
            onChange={(e) => onMnemonicChange(e.target.value)}
            placeholder="Enter your seed phrase"
            className={`${STYLES.input} ${getThemeClasses(
              isDarkMode,
              "input"
            )}`}
          />
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } mt-2`}
          >
            💡 A valid seed phrase contains 12, 15, 18, 21, or 24 words
            separated by spaces. Leave empty to auto-generate a secure 12-word
            phrase.
          </p>
        </div>

        <Button
          onClick={onGenerateWallet}
          variant="primary"
          size="lg"
          fullWidth
          isDarkMode={isDarkMode}
        >
          Generate Wallet
        </Button>

        {selectedBlockchain === "solana" && (
          <Button
            onClick={onWalletAdapter}
            variant="primary"
            size="lg"
            fullWidth
            isDarkMode={isDarkMode}
          >
            Wallet Adapter
          </Button>
        )}
      </div>
    </div>
  );
}
