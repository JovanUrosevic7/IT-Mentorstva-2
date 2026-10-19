import { RecoilRoot } from "recoil"
import Login from "./Components/Login"
import UserData from "./Components/UserData"

function App() {



  return (
    <div>

      {/* <RecoilRoot> */}
        <UserData />
        <Login />
      {/* </RecoilRoot> */}


    </div>
  )
}

export default App
