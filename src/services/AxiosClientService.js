import React from 'react';
import axios from "axios";


    const defaultOptions = {
        baseURL: 'http://todo-api.test/api'
    };

    let AxiosClientService = axios.create(defaultOptions);

export default AxiosClientService;

