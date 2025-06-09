import { useState, useMemo } from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import { ParticlesBackground } from "./components/common/ParticlesBackground";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BlockchainSelection } from "./components/features/onboarding/BlockchainSelection";
import { PhraseInput } from "./components/features/onboarding/PhraseInput";
import { WalletDisplay } from "./components/features/onboarding/WalletDisplay";
import { AdapterView } from "./components/features/onboarding/AdapterView";
import { STYLES, getThemeClasses } from "./styles/styles";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

function App() {
  const [step, setStep] = useState("blockchain");
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Solana wallet setup
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  const handleBlockchainSelect = (blockchain) => {
    setSelectedBlockchain(blockchain);
    setStep("phrase");
  };

  const handleGenerateWallet = async () => {
    if (!mnemonic) {
      const mn = await generateMnemonic();
      setMnemonic(mn);
    } else {
      // Validate the entered mnemonic
      if (!validateMnemonic(mnemonic)) {
        alert(
          "Invalid seed phrase! Please enter a valid 12-24 word BIP39 mnemonic phrase, or leave blank to generate one automatically."
        );
        return;
      }
    }
    setStep("wallets");
  };

  const handleWalletAdapter = () => {
    setStep("adapter");
  };

  const handleBack = () => {
    if (step === "wallets") {
      setStep("phrase");
    } else if (step === "phrase") {
      setStep("blockchain");
      setSelectedBlockchain("");
    } else if (step === "adapter") {
      setStep("phrase");
    }
  };

  const resetWallet = () => {
    setStep("blockchain");
    setSelectedBlockchain("");
    setMnemonic("");
    setShowSeedPhrase(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSeedPhrase = () => {
    setShowSeedPhrase(!showSeedPhrase);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <div
          className={`${STYLES.container} ${getThemeClasses(
            isDarkMode,
            "container"
          )}`}
        >
          <ParticlesBackground isDarkMode={isDarkMode} />
          <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

          <main className={STYLES.main}>
            {step === "blockchain" && (
              <BlockchainSelection
                onBlockchainSelect={handleBlockchainSelect}
                isDarkMode={isDarkMode}
              />
            )}

            {step === "phrase" && (
              <PhraseInput
                mnemonic={mnemonic}
                onMnemonicChange={setMnemonic}
                onGenerateWallet={handleGenerateWallet}
                onWalletAdapter={handleWalletAdapter}
                onBack={handleBack}
                selectedBlockchain={selectedBlockchain}
                isDarkMode={isDarkMode}
              />
            )}

            {step === "wallets" && (
              <WalletDisplay
                mnemonic={mnemonic}
                selectedBlockchain={selectedBlockchain}
                showSeedPhrase={showSeedPhrase}
                onToggleSeedPhrase={toggleSeedPhrase}
                onBack={handleBack}
                onReset={resetWallet}
                isDarkMode={isDarkMode}
              />
            )}

            {step === "adapter" && (
              <AdapterView onBack={handleBack} isDarkMode={isDarkMode} />
            )}
          </main>

          {step === "blockchain" && <Footer isDarkMode={isDarkMode} />}
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
