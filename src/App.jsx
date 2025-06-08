import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthereumWallet } from "./EthereumWallet";
import { ParticlesBackground } from "./components/ParticlesBackground";

function App() {
  const [step, setStep] = useState("blockchain");
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleBlockchainSelect = (blockchain) => {
    setSelectedBlockchain(blockchain);
    setStep("phrase");
  };

  const handleGenerateWallet = async () => {
    if (!mnemonic) {
      const mn = await generateMnemonic();
      setMnemonic(mn);
    }
    setStep("wallets");
  };

  const handleBack = () => {
    if (step === "wallets") {
      setStep("phrase");
    } else if (step === "phrase") {
      setStep("blockchain");
      setSelectedBlockchain("");
    }
  };

  const resetWallet = () => {
    setStep("blockchain");
    setSelectedBlockchain("");
    setMnemonic("");
    setShowSeedPhrase(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <ParticlesBackground isDarkMode={isDarkMode} />

      <header className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 ${
              isDarkMode ? "bg-white" : "bg-gray-900"
            } rounded-lg flex items-center justify-center transition-colors duration-300`}
          >
            <div className="relative">
              <div
                className={`w-3 h-2.5 sm:w-4 sm:h-3 border-2 ${
                  isDarkMode ? "border-black" : "border-white"
                } rounded-sm transition-colors duration-300`}
              ></div>
              <div
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${
                  isDarkMode ? "bg-black" : "bg-white"
                } rounded-full absolute top-0.5 sm:top-1 left-1 sm:left-1.5 transition-colors duration-300`}
              ></div>
            </div>
          </div>
          <span className="text-lg sm:text-xl font-semibold">ArcaKey</span>
          <span
            className={`text-xs sm:text-sm ${
              isDarkMode
                ? "text-gray-400 bg-gray-800"
                : "text-gray-600 bg-gray-200"
            } px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors duration-300`}
          >
            v1.1
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isDarkMode ? "text-gray-400" : "text-orange-400"
            } transition-colors duration-300 text-base sm:text-lg`}
          >
            ☀
          </div>
          <button
            onClick={toggleTheme}
            className={`w-8 h-5 sm:w-10 sm:h-6 ${
              isDarkMode ? "bg-gray-700" : "bg-blue-200"
            } rounded-full relative transition-colors duration-300 cursor-pointer`}
          >
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                isDarkMode ? "translate-x-3 sm:translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </button>
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isDarkMode ? "text-indigo-400" : "text-gray-400"
            } transition-colors duration-300 text-base sm:text-lg`}
          >
            ☽
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-2xl">
        {step === "blockchain" && (
          <div className="text-center animate-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
              ArcaKey supports multiple blockchains
            </h1>
            <p
              className={`text-xl sm:text-2xl ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-12 sm:mb-16 font-medium tracking-wide px-2`}
            >
              Minimal wallet. Maximum reach.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md mx-auto px-4">
              <button
                onClick={() => handleBlockchainSelect("solana")}
                className={`w-full sm:w-auto font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg min-w-[140px] text-base sm:text-lg ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Solana
              </button>
              <button
                onClick={() => handleBlockchainSelect("ethereum")}
                className={`w-full sm:w-auto font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg border min-w-[140px] text-base sm:text-lg ${
                  isDarkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700 border-gray-600 hover:border-gray-500"
                    : "bg-white text-gray-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                }`}
              >
                Ethereum
              </button>
            </div>
          </div>
        )}

        {step === "phrase" && (
          <div className="animate-in">
            <button
              onClick={handleBack}
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } mb-4 sm:mb-6 flex items-center gap-2 transition-all duration-200 hover:translate-x-1`}
            >
              ← Back
            </button>

            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Secret Recovery Phrase
            </h1>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } text-base sm:text-lg mb-6 sm:mb-8`}
            >
              Save these words in a safe place.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <input
                type="text"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your secret phrase (or leave blank to generate)"
                className={`w-full border rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                }`}
              />

              <button
                onClick={handleGenerateWallet}
                className={`w-full font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-base transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-98 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Generate Wallet
              </button>
            </div>
          </div>
        )}

        {step === "wallets" && (
          <div className="animate-in space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } flex items-center gap-2 transition-all duration-200 hover:translate-x-1`}
              >
                ← Back
              </button>
              <button
                onClick={resetWallet}
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-red-400"
                    : "text-gray-600 hover:text-red-500"
                } text-xs sm:text-sm transition-all duration-200 hover:scale-105`}
              >
                Reset Wallet
              </button>
            </div>

            <div
              className={`${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } border rounded-lg overflow-hidden transition-colors duration-300`}
            >
              <div className="flex items-center justify-between p-4 sm:p-6">
                <button
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  className={`flex items-center gap-2 sm:gap-3 text-left ${
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                  } transition-all duration-300 flex-1 -m-4 sm:-m-6 p-4 sm:p-6 rounded-lg`}
                >
                  <span className="text-lg sm:text-xl font-semibold">
                    Your Secret Phrase
                  </span>
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } text-base sm:text-lg transition-transform duration-300 ml-auto ${
                      showSeedPhrase ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(mnemonic)}
                  className={`${
                    isDarkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  } px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-200 text-xs sm:text-sm font-medium transform hover:scale-105 active:scale-95 ml-2 sm:ml-3`}
                  title="Copy phrase"
                >
                  Copy
                </button>
              </div>

              {showSeedPhrase && (
                <div
                  className={`px-4 sm:px-6 pb-4 sm:pb-6 border-t ${
                    isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div className="mt-4 sm:mt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {mnemonic.split(" ").map((word, index) => (
                        <div
                          key={index}
                          className={`${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                              : "bg-gray-50 border-gray-200 hover:border-gray-300"
                          } rounded-lg p-2 sm:p-3 border transition-colors`}
                        >
                          <div
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            } mb-1`}
                          >
                            {index + 1}
                          </div>
                          <div
                            className={`text-xs sm:text-sm font-mono ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {word}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t gap-2 sm:gap-0 ${
                        isDarkMode ? "border-gray-800" : "border-gray-200"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 text-yellow-400 text-xs sm:text-sm ${
                          !isDarkMode && "text-orange-500"
                        }`}
                      >
                        <span className="text-base sm:text-lg">⚠️</span>
                        <span>Never share your secret phrase with anyone</span>
                      </div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {mnemonic.split(" ").length} words
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold capitalize">
                  {selectedBlockchain} Wallet
                </h2>
              </div>

              {selectedBlockchain === "solana" && (
                <SolanaWallet mnemonic={mnemonic} isDarkMode={isDarkMode} />
              )}
              {selectedBlockchain === "ethereum" && (
                <EthereumWallet mnemonic={mnemonic} isDarkMode={isDarkMode} />
              )}
            </div>
          </div>
        )}
      </main>

      {step === "blockchain" && (
        <footer className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 px-4">
          <p
            className={`${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } text-xs sm:text-sm text-center`}
          >
            Designed and Developed by{" "}
            <a
              href="https://github.com/harshverma7"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-700"
              } transition-colors`}
            >
              Harsh Verma
            </a>
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
