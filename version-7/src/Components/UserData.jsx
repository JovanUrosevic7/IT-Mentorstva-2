import { useUserStore } from "../States/userState"

function UserData() {

    const userData = useUserStore((state) => state.userState)
    // console.log(userData);
    
    return(
        <div>
            <p>{userData.loggedIn}</p>
            <p>{userData.email}</p>
        </div>
    )
}

export default UserData