import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {apiService} from "../../src/services/ApiService";
import {deviceStorage} from "../../src/services/DeviceStorage";
import AxiosClientService from "../../src/services/AxiosClientService";

class Splash extends React.Component {

    async componentDidMount() {
        const jwt = await deviceStorage.getItem('jwt_token');
        const response = await apiService.getUser(jwt);
        if (response && response.status === 200) {
            AxiosClientService.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            this.props.navigation.navigate('Dashboard');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={styles.splashContainer}>
                <Text style={styles.splashText}>Splash Screen!</Text>
            </View>
        )
    }
}

export default Splash;

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashText: {
        fontSize: 80
    }
});