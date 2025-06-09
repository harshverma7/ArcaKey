export const handleSignMessage = async (
  publicKey,
  signMessage,
  message,
  setMessage,
  onSignatureReceived
) => {
  if (!publicKey || !signMessage) {
    alert("Please connect your wallet first");
    return;
  }

  if (!message) {
    alert("Please enter a message to sign");
    return;
  }

  try {
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    // Convert signature to hex string for easier copying
    const signatureHex = Array.from(signature)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const signatureArray = Array.from(signature).join(",");

    const signedMessageData = {
      originalMessage: message,
      signature: signatureHex,
      signatureArray: signatureArray,
      timestamp: new Date().toISOString(),
      publicKey: publicKey.toString(),
    };

    // Call the callback to update the UI
    if (onSignatureReceived) {
      onSignatureReceived(signedMessageData);
    }

    setMessage("");
    return signedMessageData;
  } catch (error) {
    alert("Message signing failed: " + error.message);
    throw error;
  }
};
