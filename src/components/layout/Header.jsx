import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { STYLES } from "../../styles/styles";

export function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header className={STYLES.header}>
      <Logo isDarkMode={isDarkMode} />
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
    </header>
  );
}
