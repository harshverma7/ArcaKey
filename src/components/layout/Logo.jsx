export function Logo({ isDarkMode }) {
  return (
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
          isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-600 bg-gray-200"
        } px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors duration-300`}
      >
        v1.1
      </span>
    </div>
  );
}
