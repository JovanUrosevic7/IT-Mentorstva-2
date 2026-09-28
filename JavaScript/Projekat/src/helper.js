export function formatedDate(days){

    const today = new Date()
    const futureDate = new Date()

    futureDate.setDate(today.getDate() + days)
    const formatedDate = futureDate.toISOString().split("T")[0]

    return formatedDate
}