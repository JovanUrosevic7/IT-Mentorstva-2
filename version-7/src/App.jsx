import Login from "./Components/Login"
import UserData from "./Components/UserData"
import Tasks from "./Components/Tasks"

function App() {



  return (
    <div>

        <div style={{"display": "flex", "alignItems": "center", "gap":"10px"}}>
          <UserData />
          <Login />
        </div>

        <Tasks />


    </div>
  )
}

export default App
