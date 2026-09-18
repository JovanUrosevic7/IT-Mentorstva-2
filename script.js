let clickPoints = []

let canvasElement = document.getElementById("drawArea")
let ctx = canvasElement.getContext("2d")

let paragraphElement = document.querySelector("#numberOfLine")

let drawCounter = 0

canvasElement.addEventListener("click", function (e) {

  let rect = canvasElement.getBoundingClientRect()

  let x = e.clientX - rect.left
  let y = e.clientY - rect.top

  clickPoints.push({ x: x, y: y })



})

const drawLines = () =>{

  ctx.beginPath()
  ctx.moveTo(clickPoints[0].x, clickPoints[0].y)

  for (let i = 1; i < clickPoints.length; i++) {
    ctx.lineTo(clickPoints[i].x, clickPoints[i].y)
  }

  drawCounter++

  let randomColor = Math.floor(Math.random() * 16777215).toString(16)
  ctx.strokeStyle = "#"+randomColor

  ctx.stroke()

  clickPoints = []

  paragraphElement.innerHTML += `Nacrtana ${drawCounter} linija  #${randomColor}`

}

const reset = () => {

  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

}





















