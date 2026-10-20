import Login from "./Components/Login"
import UserData from "./Components/UserData"
import Tasks from "./Components/Tasks"

function App() {



  return (
    <div className="p-[10px]">

        <div style={{"display": "flex", "alignItems": "center", "gap":"10px"}} className="flex item-center mb-[20px]">
          <UserData />
          <Login />
        </div>

        <Tasks />


    </div>
  )
}

export default App
