import { useReducer, useState } from "react";
import USERS from "../data/users.json"
import { initialUserData, userReducer } from "../Reducers/Users";


function Login() {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [userState, userDispatch] = useReducer(userReducer, initialUserData)
  console.log(userState);
  

  const userCredentials = () => {
    if(username === null || password === null || username.trim() === "" || password.trim() === "") {
      setLoginError("Niste uneli korisnicko ime ili sifru")
      return
    }

    let foundUser = false
    USERS.forEach((user, index) => {
      if(user.username === username && user.password === password){
        foundUser = true
        userDispatch({type:"SET_USERNAME", payload: username})
        userDispatch({type:"SET_IS_LOGGED_IN", payload: true})        

      }
    })

    if(!foundUser){
      setLoginError("Nismo nasli korisnika sa tim podacima")
    }

    

  }

  return (
    <div>

      <form action="">

        <p>{loginError}</p>
        <input type="text" placeholder="Username" onInput={(e) => setUsername(e.currentTarget.value)} />
        <input type="text" placeholder="Password" onInput={(e) => setPassword(e.currentTarget.value)} />
        <button type="button" onClick={userCredentials}>Login</button>
      </form>


    </div>
  )
}

export default Login