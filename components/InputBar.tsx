
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputBar = ({ label, error, icon, className = '', ...props }: InputProps) => {
  return (
    <div className={`${label || error ? 'space-y-2' : ''} w-full`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${className} ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <span className="w-4 h-4">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};