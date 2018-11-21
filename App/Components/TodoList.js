import React from 'react';
import ListItem from "./ListItem";

export default class TodoList extends React.Component {

    constructor(props){
        super(props)
    }

    render(){

        let todoList = [];

        todoList = this.props.cards.map((prop, key) => {
            return <ListItem
                key={key}
                number={key}
                cards={this.props.cards}
                i={key}
                onEditEvent={this.props.onEditEvent}
                onDeleteEvent={this.props.onDeleteEvent}
                toggleDone={this.props.toggleDone}
                togglePriority={this.props.togglePriority}
            />
        });

        return(
            todoList
        )
    }

}