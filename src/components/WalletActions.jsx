export function WalletActions({
  onAddWallet,
  onClearWallets,
  walletsCount,
  isDarkMode,
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onAddWallet}
        className={`font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
          isDarkMode
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        Add Wallet
      </button>
      {walletsCount > 0 && (
        <button
          onClick={onClearWallets}
          className={`font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
            isDarkMode
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Clear Wallets
        </button>
      )}
    </div>
  );
}
