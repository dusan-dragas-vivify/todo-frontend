import React from 'react';
import {StyleSheet} from 'react-native';
import Card from "react-native-material-cards/Card";
import CardTitle from "react-native-material-cards/CardTitle";
import CardContent from "react-native-material-cards/CardContent";
import CardAction from "react-native-material-cards/CardAction";
import CardButton from "react-native-material-cards/CardButton";

export default class TodoList extends React.Component {

    constructor(props){
        super(props)
    }

    render(){

        const todoList = [];

        for (let i = 0; i < this.props.cards.length; i++) {
            todoList.push(
                <Card key={this.props.cards[i].id} number={this.props.cards[i].id}
                      style={[this.props.cards[i].is_done ? styles.cardDone : styles.card]}>
                    <CardTitle
                        title={this.props.cards[i].title}
                    />
                    <CardContent text={this.props.cards[i].content} style={styles.cardContent}/>
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => {
                                this.onEditEvent(this.state.jwt, this.props.cards[i].id)
                            }}
                            title="Edit"
                            color="#3949ab"
                        />
                        <CardButton
                            onPress={() => {
                                this.onDeleteEvent(this.state.jwt, this.props.cards[i].id)
                            }}
                            title="Delete"
                            color="red"
                        />
                        <CardButton
                            onPress={() => {
                                this.toggleDone(this.props.cards[i])
                            }}
                            title="Done"
                            color="green"
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.props.cards[i], 0)
                            }}
                            title="none"
                            color={[this.props.cards[i].priority === 0 ? '#fff' : '#E50000']}
                            style={[this.props.cards[i].priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.props.cards[i], 1)
                            }}
                            title="!"
                            color={[this.props.cards[i].priority === 1 ? '#fff' : '#E50000']}
                            style={[this.props.cards[i].priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.props.cards[i], 2)
                            }}
                            title="!!"
                            color={[this.props.cards[i].priority === 2 ? '#fff' : '#E50000']}
                            style={[this.props.cards[i].priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                        <CardButton
                            onPress={() => {
                                this.togglePriority(this.props.cards[i], 3)
                            }}
                            title="!!!"
                            color={[this.props.cards[i].priority === 3 ? '#fff' : '#E50000']}
                            style={[this.props.cards[i].priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                        />
                    </CardAction>
                </Card>
            )
        }

        return(
            todoList
        )
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
    },
    cardButtonPrioritySelected: {
        borderColor: '#E50000',
        backgroundColor: '#E50000',
    },
    cardContent: {
        overflow: 'hidden',
    }
});