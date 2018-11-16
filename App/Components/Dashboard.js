import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { MaterialDialog } from 'react-native-material-dialog';
import { TextField } from 'react-native-material-textfield';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfCards: 0,
            cards: [],
            openModal: false,
            cardTitle: '',
            cardContent: ''
        }
    }

    addNewCard = () => {
        this.setState({
            openModal: true
        })
    };

    modalClickAdd = () => {
        this.setState({
            openModal: false,
            numberOfCards: this.state.numberOfCards + 1,
            cards: [...this.state.cards, {
                id: this.state.numberOfCards + 1,
                title: this.state.cardTitle,
                content: this.state.cardContent
            }]
        });
    };

    modalClickCancel = () => {
        this.setState({ openModal: false });
    };

    deleteCard = (id) => {
        let cardToRemove = this.state.cards.findIndex( obj => obj.id === id);
        let newObj = this.state.cards.splice(cardToRemove, 1);
        this.setState({
            numberOfCards: this.state.numberOfCards - 1,
        })
    };

    editCard = (id) => {
        this.props.navigation.navigate('Edit', { id: id });
    };

    static logout = () => {
        alert("logged out!")
    };

    render() {

        const cardsToShow = [];
        let modal;

        let {cardTitle} = '';
        let {cardContent} = '';

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
                <Card key={i} number={i} style={styles.card}>
                    <CardTitle
                        title={this.state.cards[i].title}
                    />
                    <CardContent text={this.state.cards[i].content} style={styles.cardContent} />
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={this.editCard.bind(this, this.state.cards[i].id)}
                            title="Edit"
                            color="#3949ab"
                        />
                        <CardButton
                            onPress={this.deleteCard.bind(this, this.state.cards[i].id)}
                            title="Delete"
                            color="red"
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
                {cardsToShow}
                {modal}
                <ActionButton style={styles.plusButton} onPress={this.addNewCard.bind(this)}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0.1
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