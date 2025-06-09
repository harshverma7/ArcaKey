import Button from "../../ui/Button";

export function WalletActions({
  onAddWallet,
  onClearWallets,
  walletsCount,
  isDarkMode,
}) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onAddWallet}
        variant="primary"
        size="md"
        isDarkMode={isDarkMode}
      >
        Add Wallet
      </Button>
      {walletsCount > 0 && (
        <Button
          onClick={onClearWallets}
          variant="danger"
          size="md"
          isDarkMode={isDarkMode}
        >
          Clear Wallets
        </Button>
      )}
    </div>
  );
}
