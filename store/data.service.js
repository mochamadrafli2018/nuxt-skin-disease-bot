import axios from 'axios';

const config = ({
    apiURL: `https://crud-books-api.herokuapp.com/`,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
})

function authHeader() {
    // return authorization header with jwt token
    let user = localStorage.getItem('user');
    // check if token exist and not expired
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export const userService = {
    logout,
    getAllData,
    getDataById,
    updateDataById,
    deleteDataById
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function logout() {
    // remove user from local storage
    localStorage.removeItem('user');
}

function getAllData() {
    return axios.get(`${config.apiUrl}/api`, {
        headers: authHeader()
    }).then(handleResponse);
}

function getDataById(id) {
    return axios.get(`${config.apiUrl}/api/${id}`, {
        headers: authHeader()
    }).then(handleResponse);
}

function updateDataById(user) {
    return axios.put(`${config.apiUrl}/api/${user.id}`, {
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    }).then(handleResponse);
}

function deleteDataById(id) {
    return axios.delete(`${config.apiUrl}/api/${id}`, {
        headers: authHeader()
    }).then(handleResponse);
}