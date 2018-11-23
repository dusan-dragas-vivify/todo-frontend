import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {RaisedTextButton} from 'react-native-material-buttons';
import {apiService} from "../../src/services/ApiService";
import {authService} from "../../src/services/AuthService";

class Edit extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Edit',
            headerRight: <Button onPress={() => {
                authService.logout(navigation)
            }} title={'Logout'}></Button>
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidMount = async () => {
        const response = await apiService.getCard(this.props.navigation.state.params.id);
        this.setState({
            title: response.title,
            content: response.content
        })
    };

    componentWillUnmount() {
        const {params} = this.props.navigation.state;
        params.reload();
    };

    updateCard = async (id) => {
        try {
            const response = await apiService.updateCard(id, this.state.title, this.state.content);
            this.props.navigation.navigate('Dashboard');
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Edit screen for card with id: {this.props.navigation.state.params.id}</Text>
                <TextField
                    label='Title'
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title})}
                />
                <TextField
                    label='Content'
                    multiline={true}
                    value={this.state.content}
                    onChangeText={(content) => this.setState({content})}
                />
                <RaisedTextButton
                    style={styles.loginButton}
                    title='Update'
                    titleColor={'#fff'}
                    color='#3949ab'
                    onPress={() => {
                        this.updateCard(this.props.navigation.state.params.id)
                    }}
                />
            </View>
        )
    }
}

export default Edit;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});