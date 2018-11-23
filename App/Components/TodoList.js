import React from 'react';
import ListItem from "./ListItem";

const TodoList = ({...props}) => {

    return props.cards.map((prop, key) => {
        return <ListItem
            key={key}
            number={key}
            card={prop}
            i={key}
            onEditEvent={props.onEditEvent}
            onDeleteEvent={props.onDeleteEvent}
            toggleDone={props.toggleDone}
            togglePriority={props.togglePriority}
        />
    });
};

export default TodoList;