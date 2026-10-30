
async function WeatherDayInAWeek({ params }) {

    const resoldevParams = await params
    const dayInAWeek = resoldevParams.dayInAWeek
    const day = dayInAWeek ? dayInAWeek.toLowerCase() : []
    const allowedDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    if (!allowedDays.includes(day)) {
        return <p>You didnt enter the correct day in week</p>
    }
    return (
        <div>
            <h1>Hello you are looking at the weather for: {dayInAWeek}</h1>
        </div>
    )
}

export default WeatherDayInAWeek