import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useWalletScroll } from "./hooks/useWalletScroll";
import { WalletActions } from "./components/WalletActions";
import { WalletCard } from "./components/WalletCard";
import { EmptyWalletState } from "./components/EmptyWalletState";

export function SolanaWallet({ mnemonic, isDarkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const { copied, copyToClipboard } = useCopyToClipboard();
  const walletRefs = useWalletScroll(wallets.length, 100);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentIndex(currentIndex + 1);
    setWallets([
      ...wallets,
      {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Array.from(keypair.secretKey)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
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
          icon="👛"
          walletType="Solana"
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
