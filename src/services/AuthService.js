import React from 'react';
import {apiService} from "./ApiService";
import {deviceStorage} from "./DeviceStorage";
import AxiosClientService from "./AxiosClientService";

export default class AuthService {

    logout = async (navigation) => {
        await apiService.logout();
        await deviceStorage.removeItem('jwt_token');
        AxiosClientService.defaults.headers.common['Authorization'] = null;
        navigation.navigate('Login');
    };

    login = async (username, password, navigation) => {
        // TODO Whole login logic here
        const response = await apiService.login(username, password);
        if (response.status === 200) {
            deviceStorage.saveItem("jwt_token", response.data.token);
            AxiosClientService.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            navigation.navigate('Dashboard');
        }
        return response;
    }

}

export const authService = new AuthService();