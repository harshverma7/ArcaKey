import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const handleSendTransaction = async (
  publicKey,
  signTransaction,
  connection,
  recipient,
  amount,
  setIsLoading,
  setRecipient,
  setAmount,
  handleGetBalance
) => {
  if (!publicKey || !signTransaction) {
    alert("Please connect your wallet first");
    return;
  }

  if (!recipient || !amount) {
    alert("Please enter recipient address and amount");
    return;
  }

  setIsLoading(true);
  try {
    const recipientPubkey = new PublicKey(recipient);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubkey,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      })
    );

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    const signed = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    alert("Transaction successful!");
    setRecipient("");
    setAmount("");
    handleGetBalance();
  } catch (error) {
    alert("Transaction failed: " + error.message);
  }
  setIsLoading(false);
};
