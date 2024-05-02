import { fetchWithResponse } from "./fetcher";

export const getAirports = () => {
    return fetchWithResponse("airports", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    })
}

