import { useRecoilValue } from "recoil"
import { useUserStore } from "../States/userState"

function UserData() {

    const userData = useUserStore((state) => state.userState)
    console.log(userData);
    
    return(
        <p>{userData.loggedIn}</p>
    )
}

export default UserData