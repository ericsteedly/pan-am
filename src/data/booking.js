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

export const deleteBooking = (bookingId) => {
    return fetchWithoutResponse("bookings", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify (bookingId)
    })
}

export const editBooking = (paymentObj, bookingId) => {
    return fetchWithoutResponse(`bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify (paymentObj)
    })
}

export const listBookings = () => {
    return fetchWithResponse("bookings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    })
}


export const retrieveBooking = async (bookingId) => {
    return await fetch(`https://hammerhead-app-qgvud.ondigitalocean.app/bookings/${bookingId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }
    ).then((res)=>res.json())
}

export const retrieveRoundTrip = async (roundTripId) => {
    return await fetch(`https://hammerhead-app-qgvud.ondigitalocean.app/bookings/${roundTripId}/retrieveRoundtrip`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }
    ).then((res)=>res.json())
}

export const deleteRoundtrip = (roundtripObj) => {
    return fetchWithoutResponse("bookings/roundtrip", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify (roundtripObj)
    })
}

