import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return (token && token.length)
        ? { 'Authorization': `Bearer ${token}` }
        : {};
};

const requester = {
    get: (endpoint, callback) => {
        return axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Accept: 'application/json',
                ...getAuthHeader(),
            },
        })
        .then(response => callback(response))
        .catch(handleError);
    },

    post: (endpoint, data, callback) => {
        return axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        })
        .then(response => callback(response))
        .catch(handleError);
    },

    put: (endpoint, data, callback) => {
        return axios.put(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        })
        .then(response => callback(response))
        .catch(handleError);
    },

    delete: (endpoint, data, callback) => {
        return axios.delete(`${BASE_URL}${endpoint}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            data,
        })
        .then(response => callback(response))
        .catch(handleError);
    },

    update: (data) => {
        return axios.put(`${BASE_URL}/users/update`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        })
        .then(() => console.log('updated!!!'))
        .catch(handleError);
    },

    addPhoto: (endpoint, data, callback) => {
        return axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                ...getAuthHeader(),
            },
        })
        .then(response => callback(response))
        .catch(handleError);
    },
};

function handleError(error) {
    if (error.response) {
        const { status, data } = error.response;

        if (status === 403 && error.response.config.url === `${BASE_URL}/login`) {
            throw new Error('Incorrect credentials!');
        } else if (status === 403 && error.response.type === 'cors') {
            throw new Error('Your JWT token is expired. Please log in!');
        } else if (status === 400) {
            throw new Error('Error: Bad request');
        } else {
            throw new Error(data.message || error.message || 'Unknown error');
        }
    } else {
        throw new Error(error.message || 'Unknown error');
    }
}

export default requester;
