import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const handleGetBalance = async (
  publicKey,
  connection,
  setIsLoading,
  setBalance
) => {
  if (!publicKey) {
    alert("Please connect your wallet first");
    return;
  }

  setIsLoading(true);
  try {
    const balance = await connection.getBalance(publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  } catch (error) {
    alert("Failed to get balance: " + error.message);
  }
  setIsLoading(false);
};
