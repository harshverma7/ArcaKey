// Style constants
export const STYLES = {
  // Common classes
  container: "min-h-screen transition-colors duration-300",
  main: "container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-2xl",
  header: "flex items-center justify-between p-4 sm:p-6",

  // Button styles
  primaryButton:
    "w-full font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-98",
  blockchainButton:
    "w-full sm:w-auto font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg min-w-[140px] text-base sm:text-lg",
  backButton:
    "mb-4 sm:mb-6 flex items-center gap-2 transition-all duration-200 hover:translate-x-1",
  resetButton: "text-xs sm:text-sm transition-all duration-200 hover:scale-105",

  // Input styles
  input:
    "w-full border rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:border-transparent",
  textarea:
    "w-full border rounded-lg px-3 py-3 text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:border-transparent resize-none",

  // Card styles
  card: "border rounded-lg p-6 transition-colors duration-300",
  cardTitle: "text-xl font-semibold mb-4",

  // Modal styles
  modalOverlay:
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
  modalContent: "rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto",

  // Grid styles
  actionGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",

  // Status styles
  statusIndicator: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
  networkStatus: "flex items-center gap-2 mb-6 sm:mb-8",

  // Layout styles
  animateIn: "animate-in",
  spaceY: "space-y-4 sm:space-y-6",
  spaceY6: "space-y-6",
};

export const getThemeClasses = (isDarkMode, variant = "default") => {
  const themes = {
    container: isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900",
    primaryButton: isDarkMode
      ? "bg-white text-black hover:bg-gray-100"
      : "bg-gray-900 text-white hover:bg-gray-800",
    secondaryButton: isDarkMode
      ? "bg-gray-800 text-white hover:bg-gray-700 border-gray-600 hover:border-gray-500"
      : "bg-white text-gray-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400",
    backButton: isDarkMode
      ? "text-gray-400 hover:text-white"
      : "text-gray-600 hover:text-gray-900",
    resetButton: isDarkMode
      ? "text-gray-400 hover:text-red-400"
      : "text-gray-600 hover:text-red-500",
    input: isDarkMode
      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500",
    textarea: isDarkMode
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500",
    card: isDarkMode
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200",
    modal: isDarkMode ? "bg-gray-800" : "bg-white",
    text: isDarkMode ? "text-gray-400" : "text-gray-600",
    textSecondary: isDarkMode ? "text-gray-500" : "text-gray-500",
    subtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
    networkStatus: isDarkMode ? "text-green-400" : "text-green-500",
    walletListItem: isDarkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-900",
  };
  return themes[variant] || themes.default;
};
