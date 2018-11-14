import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Edit extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Edit screen for card with id: {this.props.navigation.state.params.id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});