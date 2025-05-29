import Header from "./Header"
import SetPassword from "./SetPassword"


export const Verified = ({token}: {token: string}) => {
    return <div className="mt-32">
        <Header title="Set Password" />        
        <SetPassword token={token} />
    </div>
}