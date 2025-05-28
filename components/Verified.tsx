import Header from "./Header"
import SetPassword from "./SetPassword"


export const Verified = () => {
    return <div>
        <Header title="Set Password" />
        <div className="">
        <SetPassword />
        </div>
    </div>
}