import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class Login extends React.Component {

    loginRequest() {
        this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login screen</Text>
                <Button
                    onPress={this.loginRequest.bind(this)}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});