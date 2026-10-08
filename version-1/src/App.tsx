import "./style.css"
import favIcon from "../public/favicon.svg"
import Products from "./Components/Products"

const name = "Jovan"
const colorText = "blue"
let template = "white"

const currentTime = new Date().getHours()
if(currentTime >= 21 || currentTime<= 7){
  template = "#1a1a1a"
  console.log(template);
} 

let nameBtn = "Marko"

function inputElement (e) {
  console.log(e.target.value);
}

const btnElement = () => {
  console.log("works");
  
}

function App() {
  
  
  return (
  
  
    <div style={{backgroundColor: template}}>

      <p className="textRed">App</p>

      <img src={favIcon} alt="" />
  
      <p style={{color: colorText, border: "12px dotted black"}}>Pozdrav: {name}</p>

      <Products tax={20}/>

      <button onClick={btnElement}>{nameBtn}</button>

      <input type="text" name="" id="" onChange={inputElement} />


    </div>
  
  )
}

export default App