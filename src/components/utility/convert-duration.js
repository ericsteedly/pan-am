import dayjs from "dayjs";

export default function convertDuration(timeString) {
    const time = dayjs(timeString, "H:mm:ss")
    const formattedDuration = `${time.hour()}h ${time.minute()}m`

    return formattedDuration
}
