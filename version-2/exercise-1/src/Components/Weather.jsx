import { useState } from "react"

function Weather() {
  
    let [city, setCity] = useState("")
    let [country, setCountry] = useState("")
    let [temperature, setTemperature] = useState("")
    let [datas, setDatas] = useState([])


    function addDatas() {

        

        if(city === "" || country === "" || temperature === "") return

        const newDatas = {
            city: city,
            country: country,
            temperature: temperature
        }


        setDatas((currentCities) => [...currentCities, newDatas])

        console.log(city, country, temperature);
        
    }


    return (
        <div>

            <div className="flex">

            <form action="" className="flex flex-col gap-[10px] w-[300px] items-start">

                <input type="text" name="" id="" placeholder="Unesi ime grada"    className="border p-[4px]"   onInput={(e) => setCity(e.currentTarget.value)} />
                <input type="text" name="" id="" placeholder="Unesi ime drzave"   className="border p-[4px]"   onInput={(e) => setCountry(e.currentTarget.value)} />
                <input type="number" name="" id="" placeholder="Unesi temperaturu"  className="border p-[4px]" onInput={(e) => setTemperature(e.currentTarget.value)} />

                <button type="button" className="border px-[30px] bg-blue-400 py-[5px] rounded-md" onClick={addDatas}>Unesi</button>
            </form>

            <div>
            <h3 className="text-3xl mb-[10px]">Podaci:</h3>

            <div>

                {datas.map((item, index) => (
                    <div key={index}>
                        <div className="flex gap-[10px]">
                            <p>Grad: </p>
                            <p>{item.city}</p>
                        </div>

                        <div className="flex gap-[10px]">
                            <p>Drzava: </p>
                            <p>{item.country}</p>
                        </div>

                        <div className="flex gap-[10px]">
                            <p>Temperatura: </p>
                            <p>{item.temperature}</p>
                        </div>
                    </div>

                ))}

                

            </div>
            </div>


        </div>


        </div>
    )
}

export default Weather