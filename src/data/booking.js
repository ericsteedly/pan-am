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

export const retrieveBooking = async (bookingId) => {
    return await fetch(`http://localhost:8000/bookings/${bookingId}`,
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
    return await fetch(`http://localhost:8000/bookings/${roundTripId}/retrieveRoundtrip`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }
    ).then((res)=>res.json())
}


// export const retrieveBooking = (bookingId) => {
//     fetchWithResponse(`bookings/${bookingId}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${localStorage.getItem("token")}`
//         }
//     })
// } 
