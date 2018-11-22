import React from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";
import {deviceStorage} from "./DeviceStorage";
import AxiosClientService from "./AxiosClientService";

export default class ApiService {

    getCards = () => {
        return AxiosClientService.get(`/tasks`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    getCard = (id) => {
        return AxiosClientService.get(`/tasks/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    addCard = (title, content) => {
        return AxiosClientService.post(`/tasks`, {
            title: title,
            content: content
        })
            .then((response) => {
                response.data
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    deleteCard = (id) => {
        return AxiosClientService.delete(`/tasks/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    updateCard = (id, title, content) => {
        return AxiosClientService.patch(`/tasks/${id}`, {
            title: title,
            content: content
        })
            .then((response) => response)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    toggleDone = (card) => {
        return AxiosClientService.patch(`/tasks/${card.id}`, {
            'is_done': !card.is_done
        })
            .then((response) => response.data).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    togglePriority = (card, priorityLevel) => {
        return AxiosClientService.patch(`/tasks/${card.id}`, {
            'priority': priorityLevel
        })
            .then((response) => response.data).catch((error) => {
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

    logout = () => {
        return AxiosClientService.get(`/logout`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    };

    getUser = (jwt) => {
        return AxiosClientService.get(`/user`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

}

export const apiService = new ApiService();