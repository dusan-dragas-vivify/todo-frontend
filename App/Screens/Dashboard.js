import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import {apiService} from "../../src/services/ApiService";
import {deviceStorage} from "../../src/services/DeviceStorage";
import MyModal from "../Components/MyModal";
import TodoList from "../Components/TodoList";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jwt: '',
            cards: [],
            openModal: false,
            cardTitle: '',
            cardContent: ''
        }
    }

    componentDidMount() {
        deviceStorage.getItem('jwt_token').then((jwt) => {
            this.setState({jwt: jwt});
            apiService.getCards(jwt).then((response) => {
                this.setState({
                    cards: response
                })
            });
        });
    }

    modalOnOk = () => {
        apiService.addCard(this.state.jwt, this.state.cardTitle, this.state.cardContent).then((resp) => {
            let a = 1;
            apiService.getCards(this.state.jwt).then((response) => {
                this.setState({
                    cards: response
                });
                this.setState({openModal: false});
            });
        })
    };

    modalOnCancel = () => {
        this.setState({openModal: false})
    };

    onDeleteEvent = (id) => {
        apiService.deleteCard(this.state.jwt, id).then(() => {
            apiService.getCards(this.state.jwt).then((response) => {
                this.setState({
                    cards: response
                });
            });
        })
    };

    onEditEvent = (id) => {
        this.props.navigation.navigate('Edit', {
            id: id,
            jwt: this.state.jwt,
            reload: () => {this.componentDidMount()}
        });
    };

    toggleDone = (card) => {
        apiService.toggleDone(this.state.jwt, card).then(() => {
            apiService.getCards(this.state.jwt).then((response) => {
                this.setState({
                    cards: response
                });
            });
        });
    };

    togglePriority = (card, priorityLevel) => {
        apiService.togglePriority(this.state.jwt, card, priorityLevel).then(() => {
            apiService.getCards(this.state.jwt).then((response) => {
                this.setState({
                    cards: response
                });
            });
        });
    };

    updateModalTitle = (val) => {
        this.setState({cardTitle: val})
    };

    updateModalContent = (val) => {
        this.setState({cardContent: val})
    };

    render() {

        return (
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <TodoList
                    cards={this.state.cards}
                    onEditEvent={this.onEditEvent}
                    onDeleteEvent={this.onDeleteEvent}
                    toggleDone={this.toggleDone}
                    togglePriority={this.togglePriority}
                />
                <MyModal
                    visible={this.state.openModal}
                    cardTitle={this.state.cardTitle}
                    cardContent={this.state.cardContent}
                    modalOnOk={this.modalOnOk}
                    modalOnCancel={this.modalOnCancel}
                    onChangeModalContent={this.updateModalContent}
                    onChangeModalTitle={this.updateModalTitle}
                />
                <ActionButton style={styles.plusButton} onPress={() => {
                    this.setState({openModal: true});
                }}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});