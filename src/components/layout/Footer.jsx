import { getThemeClasses } from "../../styles/styles";

export function Footer({ isDarkMode }) {
  return (
    <footer className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 px-4">
      <p
        className={`${getThemeClasses(
          isDarkMode,
          "text"
        )} text-xs sm:text-sm text-center`}
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
  );
}
