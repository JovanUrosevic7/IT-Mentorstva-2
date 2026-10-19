import { RecoilRoot } from "recoil"
import Login from "./Components/Login"
import UserData from "./Components/UserData"
import Tasks from "./Components/Tasks"

function App() {



  return (
    <div>

      {/* <RecoilRoot> */}
        <Tasks />
        <UserData />
        <Login />
      {/* </RecoilRoot> */}


    </div>
  )
}

export default App
