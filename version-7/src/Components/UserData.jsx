import { useUserStore } from "../States/userState"

function UserData() {

    const userData = useUserStore((state) => state.userState)
    // console.log(userData);
    
    return(
        <div className="">
            <p>{userData.loggedIn}</p>
            <p className="underline ">{userData.email}</p>
        </div>
    )
}

export default UserData