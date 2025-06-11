"use client"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline-solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', isLoading = false, children, className = '', disabled, ...props}: ButtonProps) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white backdrop-blur-xs',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-xs'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        (disabled || isLoading) ? 'opacity-50 cursor-not-allowed transform-none' : ''
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};