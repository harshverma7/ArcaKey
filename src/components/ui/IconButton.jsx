import { forwardRef } from "react";

const IconButton = forwardRef(
  (
    {
      children,
      icon,
      variant = "ghost",
      size = "sm",
      disabled = false,
      onClick,
      type = "button",
      className = "",
      isDarkMode = true,
      tooltip,
      ...props
    },
    ref
  ) => {
    // Base styles for icon buttons
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 active:scale-95";

    // Size variations for icon buttons
    const sizeStyles = {
      xs: "p-1 text-xs",
      sm: "px-2 py-1 text-xs gap-1",
      md: "px-3 py-1.5 text-sm gap-1.5",
      lg: "px-4 py-2 text-base gap-2",
    };

    // Variant styles based on theme
    const getVariantStyles = () => {
      const variants = {
        ghost: isDarkMode
          ? "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-700"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",

        danger: isDarkMode
          ? "text-gray-400 hover:text-red-400 hover:bg-gray-800 focus:ring-red-600"
          : "text-gray-600 hover:text-red-500 hover:bg-gray-100 focus:ring-red-500",

        primary: isDarkMode
          ? "text-gray-400 hover:text-white hover:bg-gray-700 focus:ring-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 focus:ring-gray-500",

        success: isDarkMode
          ? "text-gray-400 hover:text-green-400 hover:bg-gray-800 focus:ring-green-600"
          : "text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:ring-green-500",
      };

      return variants[variant] || variants.ghost;
    };

    // Combine all styles
    const combinedStyles = [
      baseStyles,
      sizeStyles[size],
      getVariantStyles(),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={combinedStyles}
        title={tooltip}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children && <span className="flex-shrink-0">{children}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
