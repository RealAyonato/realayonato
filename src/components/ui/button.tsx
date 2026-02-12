import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled,
  ...props 
}) => {
  const base = "inline-flex items-center justify-center transition-all duration-300 rounded-md focus:outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants: Record<string, string> = {
    default: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 shadow-lg hover:shadow-xl",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    ghost: "text-gray-400 hover:text-white hover:bg-gray-800/50",
    gradient: "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-500 hover:to-orange-400"
  };
  
  const sizes: Record<string, string> = {
    default: "px-6 py-3 text-sm",
    sm: "px-4 py-2 text-xs",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };
  
  return (
    <button 
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;