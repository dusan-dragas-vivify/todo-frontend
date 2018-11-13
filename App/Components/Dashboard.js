import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActionButton } from 'react-native-material-ui';

export default class Dashboard extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is a dashboard page for our ToDo App!</Text>
                <ActionButton/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});