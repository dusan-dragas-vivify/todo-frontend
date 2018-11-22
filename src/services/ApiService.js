import React from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";
import {deviceStorage} from "./DeviceStorage";
import AxiosClientService from "./AxiosClientService";

export default class ApiService {

    getCards = (jwt) => {
        return AxiosClientService.get(`/tasks`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    getCard = (jwt, id) => {
        return AxiosClientService.get(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    addCard = (jwt, title, content) => {
        return AxiosClientService.post(`/tasks`, {
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
        return AxiosClientService.delete(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        }).then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    updateCard = (jwt, id, title, content) => {
        return AxiosClientService.patch(`/tasks/${id}`, {
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
        return AxiosClientService.patch(`/tasks/${card.id}`, {
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
        return AxiosClientService.patch(`/tasks/${card.id}`, {
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
        return AxiosClientService.post(`/login`, {
            username: username,
            password: password
        }).then((response) =>
            response
        ).catch((error) =>
            error.response
        );
    };

    logout = (jwt) => {
        return AxiosClientService.get(`/logout`, {
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
        return AxiosClientService.get(`/user`, {
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