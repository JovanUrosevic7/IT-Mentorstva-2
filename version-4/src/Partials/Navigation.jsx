import { useContext } from "react"
import { UserContext } from "../App"

function Navigation() {

    const {userState} = useContext(UserContext)

    const logOut = () => {
        localStorage.removeItem("userData")
        window.location.reload()
    }
    

    return (
        <div>

            <p>Test</p>

            {!userState.isLoggedIn ? (
                <a href="">Login</a>
            ) : (
                <a href="" onClick={logOut}>Logout</a>
            )}

        </div>
    )
}

export default Navigation