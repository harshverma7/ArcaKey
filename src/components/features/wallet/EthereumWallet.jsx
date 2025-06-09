import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useWalletManager } from "../../../hooks/useWalletManager";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import { useWalletScroll } from "../../../hooks/useWalletScroll";
import { WalletCard } from "./WalletCard";
import { WalletActions } from "./WalletActions";
import { EmptyWalletState } from "./EmptyWalletState";

export function EthereumWallet({ mnemonic, isDarkMode }) {
  const { wallets, addWallet, clearWallets, deleteWallet } = useWalletManager();
  const { copied, copyToClipboard } = useCopyToClipboard();
  const { walletRefs } = useWalletScroll(wallets.length);

  const generateWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${wallets.length}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    const walletData = {
      publicKey: wallet.address,
      privateKey: privateKey,
    };

    addWallet(walletData);
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
          icon="🦊"
          walletType="Ethereum"
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
