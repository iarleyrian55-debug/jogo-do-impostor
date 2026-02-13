import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-bold rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg";
  
  const variants = {
    // Primary is now RED
    primary: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 border border-red-500/50",
    // Secondary is Dark Neutral
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 shadow-neutral-900/50 border border-neutral-700",
    // Danger is slightly brighter red or orange
    danger: "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30",
    // Success remains Green for contrast
    success: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30",
    // Outline
    outline: "border-2 border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-8 py-6 text-xl"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};