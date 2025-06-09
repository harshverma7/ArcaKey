import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const handleAirdrop = async (
  publicKey,
  connection,
  setIsLoading,
  handleGetBalance
) => {
  if (!publicKey) {
    alert("Please connect your wallet first");
    return;
  }

  setIsLoading(true);
  try {
    const signature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
    alert("Airdrop successful! 1 SOL has been added to your wallet.");
    handleGetBalance(); // Refresh balance
  } catch (error) {
    alert("Airdrop failed: " + error.message);
  }
  setIsLoading(false);
};
