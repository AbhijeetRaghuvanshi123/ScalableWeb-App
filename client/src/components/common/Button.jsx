import Loader from './Loader';

const Button = ({ children, variant = 'primary', isLoading, className = "", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} 
      disabled={isLoading || props.disabled} 
      {...props}
    >
      {isLoading && <Loader className="mr-2" />}
      {children}
    </button>
  );
};
export default Button;
