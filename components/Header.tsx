
interface HeaderProps {
    title: string
}

export default function Header ({title}: HeaderProps) {
    return <div className="text-center text-3xl">
        {title}
    </div>
}