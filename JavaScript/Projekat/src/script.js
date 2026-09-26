import axios from "axios"

const apiKey = "d51a7e98b95f4b2ba00124737262609"

let location = localStorage.getItem("location") || "";

while (location.trim() == ""){
    location = prompt("Unesite Vas grad")
}    

localStorage.setItem("location", location)


document.querySelector("#changeLocationBtn").addEventListener("click", () => {
    
    location = ""

    while (location.trim() == ""){
        location = prompt("Unesite Vas grad")
    }    

    localStorage.setItem("location", location)

})





try{
    const response = await axios.get("https://api.weatherapi.com/v1/current.json",{
        params:{
            key: apiKey,
            q: location,
            aqi: "no"
        }
    })

    console.log(response.data);

    if(response.data.current.is_day){
        console.log("Day");
        
    } else{
        document.querySelector("body").style.backgroundColor = "black"
        console.log("Night");
        
    }

} catch(error){
    console.error("Doslo je do greske ", error);
    
}






