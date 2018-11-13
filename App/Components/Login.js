import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';

export default class Login extends React.Component {

    loginRequest() {
        this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Please login</Text>
                <TextField
                    label='Username'
                />
                <TextField
                    label='Password'
                    secureTextEntry={true}
                />
                <RaisedTextButton
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
        paddingBottom: 200
    },
    text: {
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
    }

});