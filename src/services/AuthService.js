import React from 'react';
import {apiService} from "./ApiService";
import {deviceStorage} from "./DeviceStorage";
import AxiosClientService from "./AxiosClientService";

export default class AuthService {

    async logout(navigation) {
        await apiService.logout();
        await deviceStorage.removeItem('jwt_token');
        AxiosClientService.defaults.headers.common['Authorization'] = null;
        navigation.navigate('Login');
    };

    login = () => {
        // TODO Whole login logic here
    };
}

export const authService = new AuthService();