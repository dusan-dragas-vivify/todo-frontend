import React from 'react';
import {View} from 'react-native';
import {MaterialDialog} from "react-native-material-dialog";
import TextField from "react-native-material-textfield/src/components/field";

export default class MyModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {

        let {cardTitle} = this.props.cardTitle;
        let {cardContent} = this.props.cardContent;

        return (
            <MaterialDialog
                title="Add new stuff in TODO list"
                visible={this.props.visible}
                okLabel={"ADD"}
                onOk={this.props.modalOnOk}
                onCancel={this.props.modalOnCancel}
                colorAccent={'#3949ab'}>
                <View>
                    <TextField
                        label='Title'
                        value={cardTitle}
                        onChangeText={ (value) => this.props.onChangeModalTitle(value)}
                    />
                    <TextField
                        label='Content'
                        multiline={true}
                        value={cardContent}
                        onChangeText={ (value) => this.props.onChangeModalContent(value)}
                    />
                </View>
            </MaterialDialog>
        )
    }
}