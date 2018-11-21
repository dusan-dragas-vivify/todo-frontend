import React from 'react';
import {StyleSheet} from 'react-native';
import Card from "react-native-material-cards/Card";
import CardTitle from "react-native-material-cards/CardTitle";
import CardContent from "react-native-material-cards/CardContent";
import CardAction from "react-native-material-cards/CardAction";
import CardButton from "react-native-material-cards/CardButton";

export default class ListItem extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Card
                  style={[this.props.cards[this.props.i].is_done ? styles.cardDone : styles.card]}>
                <CardTitle
                    title={this.props.cards[this.props.i].title}
                />
                <CardContent text={this.props.cards[this.props.i].content} style={styles.cardContent}/>
                <CardAction
                    separator={true}
                    inColumn={false}>
                    <CardButton
                        onPress={() => this.props.onEditEvent(this.props.cards[this.props.i].id)}
                        title="Edit"
                        color="#3949ab"
                    />
                    <CardButton
                        onPress={() => this.props.onDeleteEvent(this.props.cards[this.props.i].id)}
                        title="Delete"
                        color="red"
                    />
                    <CardButton
                        onPress={() => this.props.toggleDone(this.props.cards[this.props.i])}
                        title="Done"
                        color="green"
                    />
                    <CardButton
                        onPress={() => this.props.togglePriority(this.props.cards[this.props.i], 0)}
                        title="none"
                        color={[this.props.cards[this.props.i].priority === 0 ? '#fff' : '#E50000']}
                        style={[this.props.cards[this.props.i].priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                    />
                    <CardButton
                        onPress={() => this.props.togglePriority(this.props.cards[this.props.i], 1)}
                        title="!"
                        color={[this.props.cards[this.props.i].priority === 1 ? '#fff' : '#E50000']}
                        style={[this.props.cards[this.props.i].priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                    />
                    <CardButton
                        onPress={() => this.props.togglePriority(this.props.cards[this.props.i], 2)}
                        title="!!"
                        color={[this.props.cards[this.props.i].priority === 2 ? '#fff' : '#E50000']}
                        style={[this.props.cards[this.props.i].priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                    />
                    <CardButton
                        onPress={() => this.props.togglePriority(this.props.cards[this.props.i], 3)}
                        title="!!!"
                        color={[this.props.cards[this.props.i].priority === 3 ? '#fff' : '#E50000']}
                        style={[this.props.cards[this.props.i].priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                    />
                </CardAction>
            </Card>
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