import { STYLES, getThemeClasses } from "../../../styles/styles";
import { SeedPhraseCard } from "./SeedPhraseCard";
import { SolanaWallet } from "../wallet/SolanaWallet";
import { EthereumWallet } from "../wallet/EthereumWallet";
import Button from "../../ui/Button";

export function WalletDisplay({
  mnemonic,
  selectedBlockchain,
  showSeedPhrase,
  onToggleSeedPhrase,
  onBack,
  onReset,
  isDarkMode,
}) {
  return (
    <div className={`${STYLES.animateIn} ${STYLES.spaceY}`}>
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          animation="translate"
          isDarkMode={isDarkMode}
          leftIcon="←"
        >
          Back
        </Button>
        <Button
          onClick={onReset}
          variant="minimal"
          size="sm"
          isDarkMode={isDarkMode}
        >
          Reset Wallet
        </Button>
      </div>

      <SeedPhraseCard
        mnemonic={mnemonic}
        isDarkMode={isDarkMode}
        showSeedPhrase={showSeedPhrase}
        onToggleVisibility={onToggleSeedPhrase}
      />

      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold capitalize">
            {selectedBlockchain} Wallet
          </h2>
        </div>

        {selectedBlockchain === "solana" && (
          <SolanaWallet mnemonic={mnemonic} isDarkMode={isDarkMode} />
        )}
        {selectedBlockchain === "ethereum" && (
          <EthereumWallet mnemonic={mnemonic} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
}
