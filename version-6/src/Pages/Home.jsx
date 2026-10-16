import {useForm} from "react-hook-form"


function Home() {

    const validateCities = ["Beograd","Subotica","Novi Sad", "Zagreb", "Sarajevo"]

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const isValidateCityName = (name) => validateCities.includes(name)

    const onFormSubmit = (data) => console.log(data);
    

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