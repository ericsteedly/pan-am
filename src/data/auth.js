import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function login(user) {
  return fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function register(user) {
  return fetchWithResponse("register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function getUserAccount() {
  return fetchWithResponse("account", {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function editUserAccount(userId, userObj) {
    // Retrieve the CSRF token from the Django server
    fetch('http://localhost:8000/csrf', {
      credentials: 'include', // Include cookies in the request
    })
      .then(response => response.json())
      .then(data => {
        const csrfToken = data.csrfToken;

        // Make the request to update the User object
        fetch(`http://localhost:8000/account/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userObj),
          credentials: 'include', 
        })
        .then(response => {
        })
        .catch(error => {
        });
      })
      .catch(error => {
  });
}