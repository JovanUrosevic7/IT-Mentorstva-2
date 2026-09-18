let clickPoints = []

let canvasElement = document.getElementById("drawArea")
let ctx = canvasElement.getContext("2d")

// let drawButton = document.querySelector("#drawBtn")

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
  ctx.stroke()

  clickPoints = []



}

const reset = () => {

  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

}





















