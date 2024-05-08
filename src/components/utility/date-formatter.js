export default function formatDate(dateString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthName = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();

    return `${dayOfWeek}, ${monthName} ${dayOfMonth}`;

}
