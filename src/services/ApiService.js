import React from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";
import {deviceStorage} from "./DeviceStorage";

export default class ApiService {

    constructor(props) {
        this.axiosInstance = axios.create({
            baseURL: 'http://todo-api.test/api',
        });
    }

    getCards = (jwt) => {
        return this.axiosInstance.get(`/tasks`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    getCard = (jwt, id) => {
        return this.axiosInstance.get(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    addCard = (jwt, title, content) => {
        return this.axiosInstance.post(`/tasks`, {
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
        return this.axiosInstance.delete(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    updateCard = (jwt, id, title, content) => {
        return this.axiosInstance.patch(`/tasks/${id}`, {
            title: title,
            content: content
        }, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response)
            .catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    };

    toggleDone = (jwt, card) => {
        return this.axiosInstance.patch(`/tasks/${card.id}`, {
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
        return this.axiosInstance.patch(`/tasks/${card.id}`, {
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
        return this.axiosInstance.post(`/login`, {
            username: username,
            password: password
        }).then((response) => response)
            .catch((error) => error.response);
    };

    logout = (jwt) => {
        return this.axiosInstance.get(`/logout`, {
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
        return this.axiosInstance.get(`/user`, {
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