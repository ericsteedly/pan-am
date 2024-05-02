const API_URL = "http://localhost:8000";

// const checkError = (res) => {
//   if (!res.ok) {
//     if (res.status === 204) {
//       return
//     }
//     throw Error(res.status);
//   }
//   return res
// }

// const checkErrorJson = async(res) => {
//   if (res.status === 200 || res.status === 201) {
//     await res.json().then((data) => {
//       debugger
//       return data
//     })
//   } else {
//     throw Error(res.status);
//   }
// }

// const catchError = (err) => {
//   if (err.message === "401") {
//     window.location.href = "/login";
//   }
//   if (err.message === "404") {
//     throw Error(err.message)
//   }
//   if (err.message === '400') {
//     return; 
//   }
//   throw err;
// }

export const fetchWithResponse = async (resource, options) => {
  const data = await fetch(`${API_URL}/${resource}`, options)
  return data.json()

  // .then(checkErrorJson)
  // .catch(catchError)
}

export const fetchWithoutResponse = (resource, options) => {
  fetch(`${API_URL}/${resource}`, options)
  .then(checkError)
  .catch(catchError)
}

