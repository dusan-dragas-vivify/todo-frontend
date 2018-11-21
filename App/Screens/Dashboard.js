import React from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, Button} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import {MaterialDialog} from 'react-native-material-dialog';
import {TextField} from 'react-native-material-textfield';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards'
import axios from "axios";
import {apiService} from "../../src/services/ApiService";
import {deviceStorage} from "../../src/services/DeviceStorage";

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
        apiService.addCard(this.state.jwt, this.state.cardTitle, this.state.cardContent).then(() => {
            apiService.getCards(this.state.jwt).then((response) => {
                this.setState({
                    cards: response
                });
                this.setState({openModal: false});
            });
        })
    };

    onDeleteEvent = (jwt, id) => {
        apiService.deleteCard(jwt, id).then(() => {
            apiService.getCards(jwt).then((response) => {
                this.setState({
                    cards: response
                });
            });
        })
    };

    onEditEvent = (jwt, id) => {
        this.props.navigation.navigate('Edit', {
            id: id,
            jwt: jwt
        });
    };

    logout = (navigation) => {
        apiService.logout(this.state.jwt).then((response) => {
            deviceStorage.removeItem('jwt_token').then(() => {
                this.setState({ jwt: '' });
                navigation.navigate('Login');
            });
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

    render() {

        const cardsToShow = [];
        let modal;

        let {cardTitle} = this.state.cardTitle;
        let {cardContent} = this.state.cardContent;

        if (this.state.openModal) {
            modal = <MaterialDialog
                title="Add new stuff in TODO list"
                visible={this.state.openModal}
                okLabel={"ADD"}
                onOk={() => {
                    this.modalOnOk()
                }}
                onCancel={() => {
                    this.setState({openModal: false});
                }}
                colorAccent={'#3949ab'}>
                <View>
                    <TextField
                        label='Title'
                        value={cardTitle}
                        onChangeText={(cardTitle) => this.setState({cardTitle})}
                    />
                    <TextField
                        label='Content'
                        multiline={true}
                        value={cardContent}
                        onChangeText={(cardContent) => this.setState({cardContent})}
                    />
                </View>
            </MaterialDialog>;
        }

        for (let i = 0; i < this.state.cards.length; i++) {
            cardsToShow.push(
                <Card key={this.state.cards[i].id} number={this.state.cards[i].id}
                      style={[this.state.cards[i].is_done ? styles.cardDone : styles.card]}>
                    <CardTitle
                        title={this.state.cards[i].title}
                    />
                    <CardContent text={this.state.cards[i].content} style={styles.cardContent}/>
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {
                                this.onEditEvent(this.state.jwt, this.state.cards[i].id)
                            }}
                            title="Edit"
                            color="#3949ab"
                        />
                        <CardButton
                            onPress={() => {
                                this.onDeleteEvent(this.state.jwt, this.state.cards[i].id)
                            }}
                            title="Delete"
                            color="red"
                        />
                        <CardButton
                            onPress={() => {
                                this.toggleDone(this.state.cards[i])
                            }}
                            title="Done"
                            color="green"
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.state.cards[i], 0)
                            }}
                            title="none"
                            color={[this.state.cards[i].priority === 0 ? '#fff' : '#E50000']}
                            style={[this.state.cards[i].priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.state.cards[i], 1)
                            }}
                            title="!"
                            color={[this.state.cards[i].priority === 1 ? '#fff' : '#E50000']}
                            style={[this.state.cards[i].priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.state.cards[i], 2)
                            }}
                            title="!!"
                            color={[this.state.cards[i].priority === 2 ? '#fff' : '#E50000']}
                            style={[this.state.cards[i].priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.state.cards[i], 3)
                            }}
                            title="!!!"
                            color={[this.state.cards[i].priority === 3 ? '#fff' : '#E50000']}
                            style={[this.state.cards[i].priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
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
                <ActionButton style={styles.plusButton} onPress={() => {
                    this.setState({openModal: true})
                }}/>
            </ScrollView>
        );
    }
}

export const dashboard = new Dashboard();

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
    },
    cardButtonPrioritySelected: {
        borderColor: '#E50000',
        backgroundColor: '#E50000',
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