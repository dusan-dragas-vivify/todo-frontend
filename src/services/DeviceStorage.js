import { AsyncStorage } from 'react-native';

export default class deviceStorage{

    static async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

    static async getItem(key) {
        try{
            await AsyncStorage.getItem(key, (error, result) => {
                if(!error) {
                    return result;
                }
            });
        }catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};