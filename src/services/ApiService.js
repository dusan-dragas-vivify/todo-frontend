import React from 'react';
import AxiosClientService from "./AxiosClientService";

export default class ApiService {

    getCards = async () => {
        try {
            const response = await AxiosClientService.get(`/tasks`);
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    getCard = async (id) => {
        try {
            const response = await AxiosClientService.get(`/tasks/${id}`);
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response
            } else {
                return e;
            }
        }
    };

    addCard = async (title, content) => {
        try {
            const response = await AxiosClientService.post(`/tasks`, {
                title: title,
                content: content
            });
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    deleteCard = async (id) => {
        try {
            const response = await AxiosClientService.delete(`/tasks/${id}`);
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }

    };

    updateCard = async (id, title, content) => {
        try {
            const response = await AxiosClientService.patch(`/tasks/${id}`, {
                title: title,
                content: content
            });
            return response;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    toggleDone = async (card) => {
        try {
            const response = await AxiosClientService.patch(`/tasks/${card.id}`, {
                'is_done': !card.is_done
            });
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    togglePriority = async (card, priorityLevel) => {
        try {
            const response = await AxiosClientService.patch(`/tasks/${card.id}`, {
                'priority': priorityLevel
            });
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    login = async (username, password) => {
        try {
            const response = await AxiosClientService.post(`/login`, {
                username: username,
                password: password
            });
            return response;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

    logout = async () => {
        try {
            const response = await AxiosClientService.get(`/logout`);
            return response.data;
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }

    };

    getUser = async (jwt) => {
        try {
            const response = await AxiosClientService.get(`/user`, {
                headers: {Authorization: `Bearer ${jwt}`}
            });
            return response
        } catch (e) {
            if (e.response) {
                return e.response;
            } else {
                return e;
            }
        }
    };

}

export const apiService = new ApiService();