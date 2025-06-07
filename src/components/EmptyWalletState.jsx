export function EmptyWalletState({ icon, walletType, isDarkMode }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
        No wallets created yet
      </p>
      <p
        className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-sm`}
      >
        Click "Add Wallet" to create your first {walletType} wallet
      </p>
    </div>
  );
}
