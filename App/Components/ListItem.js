import React from 'react';
import {StyleSheet} from 'react-native';
import Card from "react-native-material-cards/Card";
import CardTitle from "react-native-material-cards/CardTitle";
import CardContent from "react-native-material-cards/CardContent";
import CardAction from "react-native-material-cards/CardAction";
import CardButton from "react-native-material-cards/CardButton";

const ListItem = ({...props}) => {

    return (
        <Card
            style={[props.card.is_done ? styles.cardDone : styles.card]}>
            <CardTitle
                title={props.card.title}
            />
            <CardContent text={props.card.content} style={styles.cardContent}/>
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => props.onEditEvent(props.card.id)}
                    title="Edit"
                    color="#3949ab"
                />
                <CardButton
                    onPress={() => props.onDeleteEvent(props.card.id)}
                    title="Delete"
                    color="red"
                />
                <CardButton
                    onPress={() => props.toggleDone(props.card)}
                    title="Done"
                    color="green"
                />
                <CardButton
                    onPress={() => props.togglePriority(props.card, 0)}
                    title="none"
                    color={[props.card.priority === 0 ? '#fff' : '#E50000']}
                    style={[props.card.priority === 0 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => props.togglePriority(props.card, 1)}
                    title="!"
                    color={[props.card.priority === 1 ? '#fff' : '#E50000']}
                    style={[props.card.priority === 1 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => props.togglePriority(props.card, 2)}
                    title="!!"
                    color={[props.card.priority === 2 ? '#fff' : '#E50000']}
                    style={[props.card.priority === 2 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
                />
                <CardButton
                    onPress={() => props.togglePriority(props.card, 3)}
                    title="!!!"
                    color={[props.card.priority === 3 ? '#fff' : '#E50000']}
                    style={[props.card.priority === 3 ? styles.cardButtonPrioritySelected : styles.cardButtonPriority]}
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