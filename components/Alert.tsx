interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    className?: string;
  }
  
  export const Alert = ({ type, message, className = '' }: AlertProps) => {
    const types = {
      success: 'bg-green-500/10 border-green-500/30 text-green-400',
      error: 'bg-red-500/10 border-red-500/30 text-red-400',
      warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      info: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    };
  
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
  
    return (
      <div className={`p-4 rounded-xl border backdrop-blur-sm ${types[type]} ${className}`}>
        <div className="flex items-center gap-2">
          <span>{icons[type]}</span>
          <span>{message}</span>
        </div>
      </div>
    );
  };