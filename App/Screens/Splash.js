import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {apiService} from "../../src/services/ApiService";
import {deviceStorage} from "../../src/services/DeviceStorage";

export default class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        deviceStorage.getItem('jwt_token').then((jwt) => {
            apiService.getUser(jwt).then((response) => {
                if (response.status === 200) {
                    this.props.navigation.navigate('Dashboard');
                } else {
                    this.props.navigation.navigate('Login');
                }
            }).catch((error) => {
                this.props.navigation.navigate('Login');
            });
        }).catch((error) => {
            this.props.navigation.navigate('Login');
        });
    }

    render() {
        return (
            <View>
                <Text>Splash Screen!</Text>
            </View>
        )
    }
}