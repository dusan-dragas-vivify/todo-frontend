import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActionButton, Card } from 'react-native-material-ui';
import { MaterialDialog } from 'react-native-material-dialog';
import { TextField } from 'react-native-material-textfield';

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
            numberOfCards: this.state.numberOfCards + 1,
            openModal: true
        })
    };

    render() {

        const cards = [];
        let modal;

        if(this.state.openModal) {
            modal = <MaterialDialog
                        title="Add new stuff on TODO list"
                        visible={this.state.openModal}
                        okLabel={"ADD"}
                        onOk={() => this.setState({ openModal: false })}
                        onCancel={() => this.setState({ openModal: false })}>
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
                <Card style={styles.card} key={i}>
                    <Text>Hello world!</Text>
                </Card>
            )
        }

        return (
            <View style={styles.container}>
                {modal}
                <ActionButton onPress={this.addNewCard.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
    }
});