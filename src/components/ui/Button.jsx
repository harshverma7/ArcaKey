import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      onClick,
      type = "button",
      className = "",
      isDarkMode = true,
      animation = "scale", // "scale", "translate", "none"
      ...props
    },
    ref
  ) => {
    // Base styles that apply to all buttons
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    // Size variations
    const sizeStyles = {
      xs: "px-2 py-1 text-xs gap-1",
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2",
      xl: "px-8 py-4 text-lg gap-3",
    };

    // Animation styles
    const animationStyles = {
      scale: "transform hover:scale-102 active:scale-98",
      translate: "transform hover:translate-x-1",
      none: "",
    };

    // Variant styles based on theme
    const getVariantStyles = () => {
      const variants = {
        primary: isDarkMode
          ? "bg-white text-black hover:bg-gray-100 focus:ring-white"
          : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",

        secondary: isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500 focus:ring-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:ring-gray-500",

        danger: isDarkMode
          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
          : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",

        ghost: isDarkMode
          ? "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-700"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",

        link: isDarkMode
          ? "text-gray-400 hover:text-white underline-offset-4 hover:underline focus:ring-gray-700"
          : "text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline focus:ring-gray-500",

        minimal: isDarkMode
          ? "text-gray-400 hover:text-red-400 hover:bg-gray-800 focus:ring-gray-700"
          : "text-gray-600 hover:text-red-500 hover:bg-gray-100 focus:ring-gray-500",
      };

      return variants[variant] || variants.primary;
    };

    // Special button styles for specific use cases
    const getSpecialStyles = () => {
      if (variant === "blockchain") {
        return isDarkMode
          ? "font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg min-w-[140px] hover:shadow-2xl transform hover:scale-105 active:scale-95"
          : "font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg min-w-[140px] hover:shadow-2xl transform hover:scale-105 active:scale-95";
      }
      return "";
    };

    // Combine all styles
    const combinedStyles = [
      baseStyles,
      sizeStyles[size],
      getVariantStyles(),
      animationStyles[animation],
      getSpecialStyles(),
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Loading content
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={combinedStyles}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span className="flex-shrink-0">{children}</span>
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
