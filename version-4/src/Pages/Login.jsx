import { useContext, useEffect, useReducer, useState } from "react";
import USERS from "../data/users.json"
import { getUserInitialData, initialUserData, userReducer } from "../Reducers/User";
import { UserContext } from "../App";


function Login() {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [loginError, setLoginError] = useState(null)

  const {userState, userDispatch} = useContext(UserContext)
  console.log(userState);
  

  const userCredentials = () => {
    if (username === null || password === null || username.trim() === "" || password.trim() === "") {
      setLoginError("Niste uneli korisnicko ime ili sifru")
      return
    }

    let foundUser = false
    let date = new Date()
    let loginTime = `${date.getHours()} : ${date.getMinutes()}`

    USERS.forEach((user, index) => {
      if (user.username === username && user.password === password) {
        foundUser = true
        userDispatch({ type: "SET_USERNAME", payload: username })
        userDispatch({ type: "SET_IS_LOGGED_IN", payload: true })
        userDispatch({ type: "SET_LOGIN_TIME", payload: loginTime })

      }
    })

    if (!foundUser) {
      setLoginError("Nismo nasli korisnika sa tim podacima")
    }

    console.log();


  }

  const logOut = () => {
    localStorage.removeItem("userData")
  }


  useEffect(() => {
    if (userState.isLoggedIn) {
      localStorage.setItem("userData", JSON.stringify(userState))
    }

  }, [userState])

  return (
    <div>

      {!userState.isLoggedIn ? (
        <h1>Login</h1>
      ) : (
        <a href="" onClick={logOut}>
          <button>Log out</button>
        </a>
      )}

      {!userState.isLoggedIn && (
        <form action="">

          <p>{loginError}</p>
          <input type="text" placeholder="Username" onInput={(e) => setUsername(e.currentTarget.value)} />
          <input type="text" placeholder="Password" onInput={(e) => setPassword(e.currentTarget.value)} />
          <button type="button" onClick={userCredentials}>Login</button>
        </form>
      )}


    </div>
  )
}

export default Login