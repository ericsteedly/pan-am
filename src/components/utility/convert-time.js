import dayjs from "dayjs"

export default function convertTime(timeString) {
    const time = dayjs(timeString, 'HH:mm:ss')
    const formattedTime = time.format('h:mm A')
    
    return formattedTime
}
