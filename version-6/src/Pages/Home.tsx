import axios from "axios";
import { useEffect } from "react";
import {useForm} from "react-hook-form"

// https://nominatim.openstreetmap.org/reverse?lat=44.010208&lon=20.918261&format=json

function Home() {


    useEffect(() => {
        const getAddress = (location: GeolocationPosition) => {
            // console.log(location.coords);
            const lat: number = location.coords.latitude;
            const long: number = location.coords.longitude;

            // Ispravljeno: iskorišćene promenljive lat i long umesto hardkodovanih brojeva
            axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
                .then(response => console.log(response.data))
                .catch(error => console.error("Greška pri dohvatanju adrese:", error));
        };

        const addressForbidden = () => console.log("We got reject");

        if (navigator.geolocation) {            
            navigator.geolocation.getCurrentPosition(getAddress, addressForbidden);
        } else {
            console.log("Doesnt work");
        }
    }, []);

   
    

    const validateCities = ["Beograd","Subotica","Novi Sad", "Zagreb", "Sarajevo"]

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const isValidateCityName = (name: string) => validateCities.includes(name)

    const onFormSubmit = (data: any) => console.log(data);
    

    return (
        <div>
            
            Home

            <form action="" onSubmit={handleSubmit(onFormSubmit)}>
                <input 
                    type="text" 
                    placeholder="Enter the name of the city" 
                    {...register("cityName",{
                        validate: isValidateCityName
                    })}
                />
            </form>


        </div>
    )
}

export default Home