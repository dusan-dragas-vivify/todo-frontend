import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { RaisedTextButton } from 'react-native-material-buttons';
import axios from "axios";
import {apiService} from "../../src/services/ApiService";

export default class Edit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content : ''
        }
    }


    componentDidMount() {
        this.getCard(this.props.navigation.state.params.id);
    }

    componentWillUnmount() {
        const {params} = this.props.navigation.state;
        apiService.getCards(params.jwt);
    }

    getCard = (id) => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.get(`http://todo-api.test/api/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 200) {
                        this.setState({
                            title: response.data.title,
                            content: response.data.content
                        });
                    }
                    console.log(response.data);
                }).catch((error) => {
                    if(error.response){
                        console.log(error.response);
                    }
                });

            }else{
                console.log(error);
            }
        });
    };

    updateCard = (id) => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.patch(`http://todo-api.test/api/tasks/${id}`,{
                    title: this.state.title,
                    content: this.state.content
                }, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 200) {
                        this.props.navigation.navigate('Dashboard');
                    }
                }).catch((error) => {
                    if(error.response){
                        console.log(error.response);
                    }
                });

            }else{
                console.log(error);
            }
        });
    };

    render(){
        return(
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
                    onPress={() => {this.updateCard(this.props.navigation.state.params.id)}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});