import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { MaterialDialog } from 'react-native-material-dialog';
import { TextField } from 'react-native-material-textfield';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import axios from "axios";

export default class Dashboard extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Dashboard',
            headerLeft: null,
            headerRight: <Button onPress={() => { Dashboard.logout(navigation) } } title={'Logout'}></Button>
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
    componentDidMount() {
        this.getCards();
    }

    getCards = () => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.get(`http://todo-api.test/api/tasks`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 200) {
                        this.setState({
                            cards: response.data,
                        });
                        console.log(this.state.cards);
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

    addNewCard = () => {
        this.setState({
            openModal: true
        })
    };

    modalClickAdd = () => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;

                axios.post(`http://todo-api.test/api/tasks`, {
                   title: this.state.cardTitle,
                   content: this.state.cardContent
                }, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 201) {
                        this.getCards();
                        this.setState({ openModal: false });
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

    modalClickCancel = () => {
        this.setState({ openModal: false });
    };

    deleteCard = (id) => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.delete(`http://todo-api.test/api/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 200) {
                        this.getCards();
                        this.setState({ openModal: false });
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

    editCard = (id) => {
        this.props.navigation.navigate('Edit', { id: id, getCards: () => {this.getCards()} });
    };

    static logout = (navigation) => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.get(`http://todo-api.test/api/logout`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    if(response.status == 200) {

                        AsyncStorage.removeItem('jwt_token');
                        navigation.navigate('Login');

                    }
                    console.log(response);
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

    toggleDone = (card) => {
        const isDone = () => {
            if(card.is_done){
                return false;
            }else if(!card.is_done){
                return true;
            }
        };
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.patch(`http://todo-api.test/api/tasks/${card.id}`,{
                    'is_done': isDone()
                }, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    this.getCards();
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

    togglePriority = (card, priorityLevel) => {
        AsyncStorage.getItem("jwt_token", (error, result) => {
            if(!error) {
                const jwt = result;
                axios.patch(`http://todo-api.test/api/tasks/${card.id}`,{
                    'priority': priorityLevel
                }, {
                    headers: { Authorization: `Bearer ${jwt}` },
                }).then((response) => {
                    this.getCards();
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

    render() {

        const cardsToShow = [];
        let modal;

        let {cardTitle} = this.state.cardTitle;
        let {cardContent} = this.state.cardContent;

        if(this.state.openModal) {
            modal = <MaterialDialog
                        title="Add new stuff in TODO list"
                        visible={this.state.openModal}
                        okLabel={"ADD"}
                        onOk={this.modalClickAdd.bind(this)}
                        onCancel={this.modalClickCancel.bind(this)}
                        colorAccent={'#3949ab'}>
                    <View>
                        <TextField
                            label='Title'
                            value={cardTitle}
                            onChangeText={ (cardTitle) => this.setState({cardTitle})}
                        />
                        <TextField
                            label='Content'
                            multiline={true}
                            value={cardContent}
                            onChangeText={ (cardContent) => this.setState({cardContent})}
                        />
                    </View>
                    </MaterialDialog>;
        }

        for(let i = 0; i < this.state.cards.length ; i++){
            cardsToShow.push(
                <Card key={this.state.cards[i].id} number={this.state.cards[i].id} style={[this.state.cards[i].is_done ? styles.cardDone : styles.card]}>
                    <CardTitle
                        title={this.state.cards[i].title}
                    />
                    <CardContent text={this.state.cards[i].content} style={styles.cardContent} />
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {this.editCard(this.state.cards[i].id)}}
                            title="Edit"
                            color="#3949ab"
                        />
                        <CardButton
                            onPress={() => {this.deleteCard(this.state.cards[i].id)}}
                            title="Delete"
                            color="red"
                        />
                        <CardButton
                            onPress={() => {this.toggleDone(this.state.cards[i])}}
                            title="Done"
                            color="green"
                        />
                        <CardButton
                            onPress={() => {this.togglePriority(this.state.cards[i], 0)}}
                            title="none"
                            color={[this.state.cards[i].priority === 0 ? '#fff' : '#E50000']}
                            style = {[this.state.cards[i].priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority ]}
                        />
                        <CardButton
                            onPress={() => {this.togglePriority(this.state.cards[i], 1)}}
                            title="!"
                            color={[this.state.cards[i].priority === 1 ? '#fff' : '#E50000']}
                            style = {[this.state.cards[i].priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority ]}
                        />
                        <CardButton
                            onPress={() => {this.togglePriority(this.state.cards[i], 2)}}
                            title="!!"
                            color={[this.state.cards[i].priority === 2 ? '#fff' : '#E50000']}
                            style = {[this.state.cards[i].priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority ]}
                        />
                        <CardButton
                            onPress={() => {this.togglePriority(this.state.cards[i], 3)}}
                            title="!!!"
                            color={[this.state.cards[i].priority === 3 ? '#fff' : '#E50000']}
                            style = {[this.state.cards[i].priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority ]}
                        />
                    </CardAction>
                </Card>
            )
        }

        return (
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                {cardsToShow.reverse()}
                {modal}
                <ActionButton style={styles.plusButton} onPress={() => {this.addNewCard()}}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0.1
    },
    cardDone: {
        flex: 0.1,
        backgroundColor: '#989898',
        opacity: 0.7
    },
    cardButtonPriority: {
        borderColor: '#E50000',
        backgroundColor: '#fff',
        color: '#E50000'
    },
    cardButtonPrioritySelected: {
        borderColor: '#E50000',
        backgroundColor: '#E50000',
        color: '#fff'
    },
    cardContent: {
        overflow: 'hidden',
    },
    plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});