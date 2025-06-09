import { STYLES, getThemeClasses } from "../../../styles/styles";
import Button from "../../ui/Button";

export function BlockchainSelection({ onBlockchainSelect, isDarkMode }) {
  return (
    <div className={`text-center ${STYLES.animateIn}`}>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
        ArcaKey supports multiple blockchains
      </h1>
      <p
        className={`text-xl sm:text-2xl ${getThemeClasses(
          isDarkMode,
          "subtitle"
        )} mb-12 sm:mb-16 font-medium tracking-wide px-2`}
      >
        Minimal wallet. Maximum reach.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md mx-auto px-4">
        <Button
          onClick={() => onBlockchainSelect("solana")}
          variant="blockchain"
          isDarkMode={isDarkMode}
          className="w-full sm:w-auto"
        >
          Solana
        </Button>
        <Button
          onClick={() => onBlockchainSelect("ethereum")}
          variant="secondary"
          isDarkMode={isDarkMode}
          className="w-full sm:w-auto font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg min-w-[140px] hover:shadow-2xl border"
          animation="scale"
        >
          Ethereum
        </Button>
      </div>
    </div>
  );
}
