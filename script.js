
let automobiliDiv = document.querySelector("#automobili")

const automobili = [
  {
    id: 1,
    ime: "Zastava 101",
    cena: 1200,
    slika: "image_agent_tag_4401098535013670719"
  },
  {
    id: 2,
    ime: "Peugeot 206",
    cena: 2500,
    slika: "image_agent_tag_4401098535013668598"
  },
  {
    id: 3,
    ime: "Opel Corsa",
    cena: 3200,
    slika: "image_agent_tag_4401098535013667891"
  },
  {
    id: 4,
    ime: "Volkswagen Golf 7",
    cena: 9800,
    slika: "image_agent_tag_4401098535013670012"
  },
  {
    id: 5,
    ime: "BMW E46",
    cena: 4100,
    slika: "image_agent_tag_4401098535013669305"
  }
];


// for(let i = 0; i < automobili.length; i++){
//     automobiliDiv.innerHTML += 
//     `
//         <img src=${automobili[i].slika}>
//         <p>${automobili[i].ime}</p>
//         <p>${automobili[i].cena}</p>

//     `
// }



let cities = [
    "Beograd",
    "Kragujevac",
    "Nis"
]

let selectDiv = document.querySelector("#selectCity")

for(let city of cities){
    
    let optionElement = document.createElement("option")
    optionElement.innerHTML = city

    selectDiv.appendChild(optionElement)
    

}

selectDiv.addEventListener("change", (event) => {
    console.log(event.target.value);
    
})


