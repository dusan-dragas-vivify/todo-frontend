import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import {apiService} from "../../src/services/ApiService";
import {deviceStorage} from "../../src/services/DeviceStorage";
import MyModal from "../Components/MyModal";
import TodoList from "../Components/TodoList";
import {authService} from "../../src/services/AuthService";

class Dashboard extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Dashboard',
            headerLeft: null,
            headerRight: <Button onPress={() => {
                authService.logout(navigation)
            }} title={'Logout'}></Button>
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            openModal: false,
            cardTitle: '',
            cardContent: ''
        }
    }

    componentDidMount = async () => {
        const response = await apiService.getCards();
        this.setState({
            cards: response
        })
    };

    modalOnOk = async () => {
        try {
            await apiService.addCard(this.state.cardTitle, this.state.cardContent);
            const response = await apiService.getCards();
            this.setState({
                cards: response
            });
            this.setState({openModal: false});
        } catch (e) {
            console.log(e);
        }
    };

    modalOnCancel = () => {
        this.setState({openModal: false})
    };

    onDeleteEvent = async (id) => {
        await apiService.deleteCard(id);
        const response = await apiService.getCards();
        this.setState({
            cards: response
        });
    };

    onEditEvent = (id) => {
        this.props.navigation.navigate('Edit', {
            id: id,
            reload: () => {
                this.componentDidMount()
            }
        });
    };

    toggleDone = async (card) => {
        await apiService.toggleDone(card);
        const response = await apiService.getCards();
        this.setState({
            cards: response
        });
    };

    togglePriority = async (card, priorityLevel) => {
        await apiService.togglePriority(card, priorityLevel);
        const response = await apiService.getCards();
        this.setState({
            cards: response
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

export default Dashboard;

const styles = StyleSheet.create({
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});