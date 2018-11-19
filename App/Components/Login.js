import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';
import axios from 'axios';
import DeviceStorage from '../../src/services/DeviceStorage';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    loginRequest = () => {

        axios.post(`http://todo-api.test/api/login`, {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            if(response.status == 200) {
                this.setState({
                    errorMessage: '',
                    username: '',
                    password: ''
                });
                DeviceStorage.saveItem("jwt_token", response.data.token);
                this.props.navigation.navigate('Dashboard');
            }
                console.log(response);
        }).catch((error) => {
            if(error.response){
                this.setState({
                    errorMessage: error.response.data.error
                })
            }
        });
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
                    onFocus = { () => this.setState({ errorMessage: '' })}
                    onChangeText={ (username) => this.setState({username})}
                />
                <TextField
                    style={styles.textField}
                    label='Password'
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    value={this.state.password}
                    onFocus = { () => this.setState({ errorMessage: '' })}
                    onChangeText={ (password) => this.setState({password})}
                />
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <RaisedTextButton
                    style={styles.loginButton}
                    title='Login'
                    titleColor={'#fff'}
                    color='#3949ab'
                    onPress={this.loginRequest.bind(this)}
                />
            </View>
        );
    }
}

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