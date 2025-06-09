import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { handleAirdrop } from "../services/solana/airdrop.js";
import { handleGetBalance } from "../services/solana/balance.js";
import { handleSendTransaction } from "../services/solana/transaction.js";
import { handleSignMessage } from "../services/solana/signMessage.js";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { SignedMessageCard } from "../components/features/wallet-adapter/SignedMessageCard";
import { STYLES, getThemeClasses } from "../styles/styles";

function WalletAdapter({ isDarkMode }) {
  const {
    publicKey,
    signTransaction,
    signMessage,
    select,
    wallets,
    disconnect,
  } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [signedMessages, setSignedMessages] = useState([]);

  const onAirdrop = () =>
    handleAirdrop(publicKey, connection, setIsLoading, onGetBalance);
  const onGetBalance = () =>
    handleGetBalance(publicKey, connection, setIsLoading, setBalance);
  const onSendTransaction = () =>
    handleSendTransaction(
      publicKey,
      signTransaction,
      connection,
      recipient,
      amount,
      setIsLoading,
      setRecipient,
      setAmount,
      onGetBalance
    );

  const handleSignatureReceived = (signedMessageData) => {
    setSignedMessages((prev) => [signedMessageData, ...prev]);
  };

  const onSignMessage = () =>
    handleSignMessage(
      publicKey,
      signMessage,
      message,
      setMessage,
      handleSignatureReceived
    );

  return (
    <div className={STYLES.spaceY6}>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Wallet Adapter
        </h1>
        <p
          className={`${getThemeClasses(
            isDarkMode,
            "text"
          )} text-base sm:text-lg mb-4`}
        >
          Connect and interact with your Solana wallet
        </p>
        <div className={STYLES.networkStatus}>
          <div className={STYLES.statusIndicator}></div>
          <span
            className={`text-sm font-medium ${getThemeClasses(
              isDarkMode,
              "networkStatus"
            )}`}
          >
            Connected to Solana Devnet
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <div
          className={`${STYLES.card} ${getThemeClasses(isDarkMode, "card")}`}
        >
          <h3 className={STYLES.cardTitle}>Connect Wallet</h3>

          {!publicKey ? (
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              size="lg"
              fullWidth
              isDarkMode={isDarkMode}
            >
              Select Wallet
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <p
                  className={`text-sm flex-1 ${getThemeClasses(
                    isDarkMode,
                    "text"
                  )}`}
                >
                  Connected: {publicKey.toString()}
                </p>
                <IconButton
                  onClick={disconnect}
                  variant="danger"
                  size="sm"
                  isDarkMode={isDarkMode}
                >
                  Disconnect
                </IconButton>
              </div>
              {balance !== null && (
                <p className={`text-sm ${getThemeClasses(isDarkMode, "text")}`}>
                  Balance: {balance} SOL
                </p>
              )}
            </div>
          )}
        </div>

        {showModal && (
          <div className={STYLES.modalOverlay}>
            <div
              className={`${STYLES.modalContent} ${getThemeClasses(
                isDarkMode,
                "modal"
              )}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Select Wallet</h2>
                <IconButton
                  onClick={() => setShowModal(false)}
                  variant="ghost"
                  size="md"
                  isDarkMode={isDarkMode}
                  className="text-2xl"
                >
                  ×
                </IconButton>
              </div>

              <div className="space-y-3">
                {wallets
                  .filter((wallet) => wallet.readyState === "Installed")
                  .map((wallet) => (
                    <Button
                      key={wallet.adapter.name}
                      onClick={() => {
                        select(wallet.adapter.name);
                        setShowModal(false);
                      }}
                      variant="secondary"
                      size="lg"
                      fullWidth
                      isDarkMode={isDarkMode}
                      className="justify-start gap-3 p-4"
                      animation="scale"
                      leftIcon={
                        <img
                          src={wallet.adapter.icon}
                          alt={wallet.adapter.name}
                          className="w-8 h-8"
                        />
                      }
                    >
                      {wallet.adapter.name}
                    </Button>
                  ))}

                {wallets.filter((wallet) => wallet.readyState !== "Installed")
                  .length > 0 && (
                  <>
                    <div
                      className={`text-center py-2 text-sm ${getThemeClasses(
                        isDarkMode,
                        "text"
                      )}`}
                    >
                      Available Wallets
                    </div>
                    {wallets
                      .filter((wallet) => wallet.readyState !== "Installed")
                      .map((wallet) => (
                        <Button
                          key={wallet.adapter.name}
                          onClick={() => {
                            window.open(wallet.adapter.url, "_blank");
                          }}
                          variant="secondary"
                          size="lg"
                          fullWidth
                          isDarkMode={isDarkMode}
                          className="justify-start gap-3 p-4 opacity-60"
                          animation="scale"
                          leftIcon={
                            <img
                              src={wallet.adapter.icon}
                              alt={wallet.adapter.name}
                              className="w-8 h-8"
                            />
                          }
                          rightIcon={<span className="text-xs">Install</span>}
                        >
                          {wallet.adapter.name}
                        </Button>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          className={`${STYLES.card} ${getThemeClasses(isDarkMode, "card")}`}
        >
          <h3 className={STYLES.cardTitle}>Wallet Actions</h3>
          <div className={STYLES.actionGrid}>
            <Button
              onClick={onAirdrop}
              disabled={isLoading || !publicKey}
              variant="primary"
              size="lg"
              isDarkMode={isDarkMode}
              loading={isLoading}
            >
              Request Airdrop
            </Button>
            <Button
              onClick={onGetBalance}
              disabled={isLoading || !publicKey}
              variant="primary"
              size="lg"
              isDarkMode={isDarkMode}
              loading={isLoading}
            >
              Show Balance
            </Button>
            <Button
              onClick={onSendTransaction}
              disabled={isLoading || !publicKey}
              variant="primary"
              size="lg"
              isDarkMode={isDarkMode}
              loading={isLoading}
            >
              Send Transaction
            </Button>
            <Button
              onClick={onSignMessage}
              disabled={isLoading || !publicKey}
              variant="primary"
              size="lg"
              isDarkMode={isDarkMode}
              loading={isLoading}
            >
              Sign Message
            </Button>
          </div>
        </div>

        {publicKey && (
          <div
            className={`${STYLES.card} ${getThemeClasses(isDarkMode, "card")}`}
          >
            <h3 className={STYLES.cardTitle}>Send Transaction</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className={`${STYLES.input} ${getThemeClasses(
                  isDarkMode,
                  "input"
                )}`}
              />
              <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.001"
                min="0"
                className={`${STYLES.input} ${getThemeClasses(
                  isDarkMode,
                  "input"
                )}`}
              />
            </div>
          </div>
        )}

        {publicKey && (
          <div
            className={`${STYLES.card} ${getThemeClasses(isDarkMode, "card")}`}
          >
            <h3 className={STYLES.cardTitle}>Sign Message</h3>
            <textarea
              placeholder="Enter message to sign"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={`${STYLES.textarea} ${getThemeClasses(
                isDarkMode,
                "textarea"
              )}`}
            />
          </div>
        )}

        {/* Signed Messages Display */}
        {signedMessages.length > 0 && (
          <div
            className={`${STYLES.card} ${getThemeClasses(isDarkMode, "card")}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={STYLES.cardTitle}>
                Signed Messages ({signedMessages.length})
              </h3>
              <Button
                onClick={() => setSignedMessages([])}
                variant="danger"
                size="sm"
                isDarkMode={isDarkMode}
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {signedMessages.map((signedMessage, index) => (
                <SignedMessageCard
                  key={`${signedMessage.timestamp}-${index}`}
                  signedMessage={signedMessage}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletAdapter;
