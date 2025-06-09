import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import { useWalletManager } from "../../../hooks/useWalletManager";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import { useWalletScroll } from "../../../hooks/useWalletScroll";
import { WalletCard } from "./WalletCard";
import { WalletActions } from "./WalletActions";
import { EmptyWalletState } from "./EmptyWalletState";

export function SolanaWallet({ mnemonic, isDarkMode }) {
  const { wallets, addWallet, clearWallets, deleteWallet } = useWalletManager();
  const { copied, copyToClipboard } = useCopyToClipboard();
  const { walletRefs } = useWalletScroll(wallets.length);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${wallets.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = derivedSeed.slice(0, 32);
    const keypair = Keypair.fromSeed(secret);

    const wallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(keypair.secretKey).toString("hex"),
    };

    addWallet(wallet);
  };

  const handleAddWallet = () => {
    generateWallet();
  };

  return (
    <div className="space-y-4">
      <WalletActions
        onAddWallet={handleAddWallet}
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
