import { useState } from "react";

export function useWalletManager() {
  const [wallets, setWallets] = useState([]);

  const addWallet = (walletData) => {
    setWallets((prevWallets) => [...prevWallets, walletData]);
  };

  const clearWallets = () => {
    setWallets([]);
  };

  const deleteWallet = (indexToDelete) => {
    setWallets((prevWallets) =>
      prevWallets.filter((_, index) => index !== indexToDelete)
    );
  };

  return {
    wallets,
    addWallet,
    clearWallets,
    deleteWallet,
  };
}
