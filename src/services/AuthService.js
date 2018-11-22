import React from 'react';
import {apiService} from "./ApiService";
import {deviceStorage} from "./DeviceStorage";
import AxiosClientService from "./AxiosClientService";

export default class AuthService {

    logout = (navigation) => {
        apiService.logout().then((response) => {
            deviceStorage.removeItem('jwt_token').then(() => {
                AxiosClientService.defaults.headers.common['Authorization'] = null;
                navigation.navigate('Login');
            });
        });
    };

    login = () => {
        // TODO Whole login logic here
    };
}

export const authService = new AuthService();