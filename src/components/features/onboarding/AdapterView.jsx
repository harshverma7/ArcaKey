import { STYLES, getThemeClasses } from "../../../styles/styles";
import WalletAdapter from "../../../pages/WalletAdapter";
import Button from "../../ui/Button";

export function AdapterView({ onBack, isDarkMode }) {
  return (
    <div className={STYLES.animateIn}>
      <Button
        onClick={onBack}
        variant="ghost"
        animation="translate"
        isDarkMode={isDarkMode}
        className="mb-4 sm:mb-6"
        leftIcon="←"
      >
        Back
      </Button>
      <WalletAdapter isDarkMode={isDarkMode} />
    </div>
  );
}
