import React from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";
import {deviceStorage} from "./DeviceStorage";

export default class ApiService {

    constructor(props) {
        //axios.defaults.baseURL = 'http://todo-api.test/api';
    }

    getCards = (jwt) => {
        return axios.get(`http://todo-api.test/api/tasks`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    addCard = (jwt, title, content) => {
        return axios.post(`http://todo-api.test/api/tasks`, {
            title: title,
            content: content
        }, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => {
            response.data
        })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    deleteCard = (jwt, id) => {
        return axios.delete(`http://todo-api.test/api/tasks/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    toggleDone = (jwt, card) => {
        return axios.patch(`http://todo-api.test/api/tasks/${card.id}`, {
            'is_done': !card.is_done
        }, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    };

    togglePriority = (jwt, card, priorityLevel) => {
        return axios.patch(`http://todo-api.test/api/tasks/${card.id}`, {
            'priority': priorityLevel
        }, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    };

    login = (username, password) => {
        return axios.post(`http://todo-api.test/api/login`, {
            username: username,
            password: password
        }).then((response) => response)
            .catch((error) => error.response);
    };

    logout = (jwt) => {
        return axios.get(`http://todo-api.test/api/logout`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => {
            response.data
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    };

    getUser = (jwt) => {
        return axios.get(`http://todo-api.test/api/user`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) =>
            response
        ).catch((error) => {
            console.log(error);
            if (error.response) {
                console.log(error.response);
            }
        });
    }

}

export const apiService = new ApiService();