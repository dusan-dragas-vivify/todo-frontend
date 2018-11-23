import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {RaisedTextButton} from 'react-native-material-buttons';
import {deviceStorage} from "../../src/services/DeviceStorage";
import {apiService} from "../../src/services/ApiService";
import AxiosClientService from "../../src/services/AxiosClientService";
import AuthService, {authService} from "../../src/services/AuthService";

class Login extends React.Component {

    static navigationOptions = () => {
        return {
            title: 'Home',
            headerLeft: null,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    loginRequest = async () => {

        try {
            const response = await authService.login(this.state.username, this.state.password, this.props.navigation);
            if (response.status === 200) {
                this.setState({
                    errorMessage: '',
                    username: '',
                    password: ''
                });
            } else {
                if (response.data.error) {
                    this.setState({
                        errorMessage: response.data.error
                    })
                } else {
                    this.setState({
                        errorMessage: `Status ${response.status}`
                    })
                }
            }
        } catch (e) {
            if (e.response) {
                this.setState({
                    errorMessage: e.response.data.error
                })
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Please login</Text>
                <TextField
                    style={styles.textField}
                    label='Username'
                    autoCapitalize={'none'}
                    value={this.state.username}
                    onFocus={() => this.setState({errorMessage: ''})}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextField
                    style={styles.textField}
                    label='Password'
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    value={this.state.password}
                    onFocus={() => this.setState({errorMessage: ''})}
                    onChangeText={(password) => this.setState({password})}
                />
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <RaisedTextButton
                    style={styles.loginButton}
                    title='Login'
                    titleColor={'#fff'}
                    color='#3949ab'
                    onPress={() => {
                        this.loginRequest()
                    }}
                />
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: 200,
        paddingLeft: 30,
        paddingRight: 30
    },
    text: {
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    loginButton: {
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50
    },
    textField: {
        marginLeft: 100,
        marginRight: 100
    },
    errorMessage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'red'
    }
});