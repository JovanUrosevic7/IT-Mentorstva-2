import "./style.css"
import favIcon from "../public/favicon.svg"


const name = "Jovan"
const colorText = "blue"
let template = "white"

const currentTime = new Date().getHours()
if(currentTime >= 21 || currentTime<= 7){
  template = "#1a1a1a"
  console.log(template);
} 



function App() {
  
  
  return (
  
  
    <div style={{backgroundColor: template}}>

      <p className="textRed">App</p>

      <img src={favIcon} alt="" />
  
      <p style={{color: colorText, border: "12px dotted black"}}>Pozdrav: {name}</p>

    </div>
  
  )
}

export default App