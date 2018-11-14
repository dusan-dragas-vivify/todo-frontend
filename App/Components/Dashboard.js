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
            openModal: false
        }
    }

    addNewCard = () => {
        this.setState({
            openModal: true
        })
    };

    modalClickOk = () => {
        this.setState({
            openModal: false,
            numberOfCards: this.state.numberOfCards + 1
        });
    };

    modalClickCancel = () => {
        this.setState({ openModal: false });
    };

    render() {

        const cards = [];
        let modal;

        if(this.state.openModal) {
            modal = <MaterialDialog
                        title="Add new stuff on TODO list"
                        visible={this.state.openModal}
                        okLabel={"ADD"}
                        onOk={this.modalClickOk.bind(this)}
                        onCancel={this.modalClickCancel.bind(this)}>
                    <View>
                        <TextField
                            label='Title'
                        />
                        <TextField
                            label='Content'
                            multiline={true}
                        />
                    </View>
                    </MaterialDialog>;
        }

        for(let i = 0; i < this.state.numberOfCards; i++){
            cards.push(
                <Card key={i} style={styles.card}>
                    <CardTitle
                        title="This is a title"
                    />
                    <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {}}
                            title="Edit"
                            color="blue"
                        />
                        <CardButton
                            onPress={() => {}}
                            title="Delete"
                            color="red"
                        />
                    </CardAction>
                </Card>
            )
        }

        return (
            <View style={styles.container}>
                {cards}
                {modal}
                <ActionButton onPress={this.addNewCard.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        flex: 0.4
    }
});