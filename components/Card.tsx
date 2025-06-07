
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 ${className}`}>
      {children}
    </div>
  );
};
