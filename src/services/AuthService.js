import React from 'react';
import {apiService} from "./ApiService";
import {deviceStorage} from "./DeviceStorage";

export default class AuthService {

    constructor(props){}

    logout = (navigation) => {
        deviceStorage.getItem('jwt_token').then((jwt) => {
            apiService.logout(jwt).then((response) => {
                deviceStorage.removeItem('jwt_token').then(() => {
                    navigation.navigate('Login');
                });
            });
        });
    }
}

export const authService = new AuthService();