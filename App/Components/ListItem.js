import React from 'react';
import {StyleSheet} from 'react-native';
import Card from "react-native-material-cards/Card";
import CardTitle from "react-native-material-cards/CardTitle";
import CardContent from "react-native-material-cards/CardContent";
import CardAction from "react-native-material-cards/CardAction";
import CardButton from "react-native-material-cards/CardButton";

const ListItem = ({card, onEditEvent, onDeleteEvent, toggleDone, togglePriority}) => {

    return (
        <Card
            style={[card.is_done ? styles.cardDone : styles.card]}>
            <CardTitle
                title={card.title}
            />
            <CardContent text={card.content} style={styles.cardContent}/>
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => onEditEvent(card.id)}
                    title="Edit"
                    color="#3949ab"
                />
                <CardButton
                    onPress={() => onDeleteEvent(card.id)}
                    title="Delete"
                    color="red"
                />
                <CardButton
                    onPress={() => toggleDone(card)}
                    title="Done"
                    color="green"
                />
                <CardButton
                    onPress={() => togglePriority(card, 0)}
                    title="none"
                    color={[card.priority === 0 ? '#fff' : '#E50000']}
                    style={[card.priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => togglePriority(card, 1)}
                    title="!"
                    color={[card.priority === 1 ? '#fff' : '#E50000']}
                    style={[card.priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => togglePriority(card, 2)}
                    title="!!"
                    color={[card.priority === 2 ? '#fff' : '#E50000']}
                    style={[card.priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => togglePriority(card, 3)}
                    title="!!!"
                    color={[card.priority === 3 ? '#fff' : '#E50000']}
                    style={[card.priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
            </CardAction>
        </Card>
    )
};

export default ListItem;

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