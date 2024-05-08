import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export const getPayments = async () => {
    return fetchWithResponse("payments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    })
}

export const newPayment = async (paymentObj) => {
    return fetchWithResponse("payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(paymentObj)
    })
}