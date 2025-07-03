
interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header ({title, subtitle}: HeaderProps) {
    return <div className="text-center mb-8">
      <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-300 text-md">{subtitle}</p>
      )}
    </div>
}