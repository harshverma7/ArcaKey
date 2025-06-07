import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useWalletScroll } from "./hooks/useWalletScroll";
import { WalletActions } from "./components/WalletActions";
import { WalletCard } from "./components/WalletCard";
import { EmptyWalletState } from "./components/EmptyWalletState";

export function EthereumWallet({ mnemonic, isDarkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const { copied, copyToClipboard } = useCopyToClipboard();
  const walletRefs = useWalletScroll(wallets.length, 300);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setCurrentIndex(currentIndex + 1);
    setWallets([
      ...wallets,
      {
        publicKey: wallet.address,
        privateKey: privateKey,
      },
    ]);
  };

  const clearWallets = () => {
    setWallets([]);
    setCurrentIndex(0);
  };

  const deleteWallet = (indexToDelete) => {
    const updatedWallets = wallets.filter(
      (_, index) => index !== indexToDelete
    );
    setWallets(updatedWallets);
  };

  return (
    <div className="space-y-4">
      <WalletActions
        onAddWallet={addWallet}
        onClearWallets={clearWallets}
        walletsCount={wallets.length}
        isDarkMode={isDarkMode}
      />

      <div className="space-y-4">
        {wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
            index={index}
            onCopyAddress={copyToClipboard}
            onCopyPrivateKey={copyToClipboard}
            copied={copied}
            walletRef={(el) => (walletRefs.current[index] = el)}
            onDeleteWallet={() => deleteWallet(index)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {wallets.length === 0 && (
        <EmptyWalletState
          icon="🦊"
          walletType="Ethereum"
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
