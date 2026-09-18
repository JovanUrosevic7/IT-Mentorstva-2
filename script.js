let clickPoints = []

let canvasElement = document.getElementById("drawArea")
let ctx = canvasElement.getContext("2d")



canvasElement.addEventListener("click", function(e) {
  
  let rect = canvasElement.getBoundingClientRect()

  let x = e.clientX - rect.left
  let y = e.clientY - rect.top

  clickPoints.push({x: x, y: y})  
  
  if(clickPoints.length >= 2){

    ctx.beginPath()
    ctx.moveTo(clickPoints[0].x, clickPoints[0].y)
    ctx.lineTo(clickPoints[1].x, clickPoints[1].y)
    ctx.stroke()

    clickPoints = []

  }
  

})





















