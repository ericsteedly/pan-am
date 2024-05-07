import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export const createBooking = (flights) => {
    return fetchWithResponse("bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(flights)
    })
}

export const retrieveBooking = (bookingId) => {
    fetchWithResponse(`bookings/${bookingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    })
} 

export const createRoundTrip = (roundTripObj) => {
    return fetchWithResponse("bookings/roundtrip", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(roundTripObj)
    })
}
