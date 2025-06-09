export function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          isDarkMode ? "text-gray-400" : "text-orange-400"
        } transition-colors duration-300 text-base sm:text-lg`}
      >
        ☀
      </div>
      <button
        onClick={onToggle}
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
  );
}
