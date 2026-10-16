import {useForm} from "react-hook-form"


function Home() {


    const getAddress = () => console.log("We got the address");
    const addressForbidden = () => console.log("We got reject");

    if(navigator.geolocation){
        console.log(navigator.geolocation.getCurrentPosition(getAddress, addressForbidden));
    } else{
        console.log("Doesnt work");
        
    }

   
    

    const validateCities = ["Beograd","Subotica","Novi Sad", "Zagreb", "Sarajevo"]

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const isValidateCityName = (name: string) => validateCities.includes(name)

    const onFormSubmit = (data: string) => console.log(data);
    

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