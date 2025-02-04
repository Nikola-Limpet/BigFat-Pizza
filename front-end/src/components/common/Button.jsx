export const Button = ({
  children,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    default: "bg-[#C41E3A] text-white hover:bg-[#A3172D]",
    outline: "border border-gray-300 hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};