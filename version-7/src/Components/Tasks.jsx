import { useUserStore } from "../States/userState"

function Tasks() {

    const userData = useUserStore((state) => state.userState)

    return (
        <div>
            {userData.loggedIn && (
                <div>Tasks</div>
            )}
        </div>
    )
}

export default Tasks