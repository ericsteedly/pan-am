import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export const editTickets = (editTicketObj) => {
    return fetchWithoutResponse("tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify (editTicketObj)
    })
}

export const deleteTickets = (bookingId) => {
    return fetchWithResponse(`tickets/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    })
}