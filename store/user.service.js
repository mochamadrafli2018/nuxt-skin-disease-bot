import axios from 'axios';

const config = ({
    apiURL: `https://localhost:5000/api/`,
})

export const userService = {
    login,
    logout,
};

function login(username, password) {
    return axios.post(`${config.apiUrl}/login`, {
        headers: { 'Content-Type': 'application/json' },
        body: ({ username, password })
    }).then(handleResponse).then(response => {
        // login successful if there's a jwt token in the response
        if (response.data.user && response.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', response.data.user);
            localStorget.setItem('token', response.data.token);
            this.$router.push('/');
        }
        return user;
    })
}

function logout() {
    // remove user from local storage
    localStorage.removeItem('user');
}
