import AsyncStorage from '@react-native-async-storage/async-storage'

class Auth {
    static setAuth = async (auth) => {
        try {
            await AsyncStorage.setItem('auth', JSON.stringify(auth));
        } catch (error) {
            console.error(error)
        }
    }

    static getAuth = async () => {
        try {
            const auth = await AsyncStorage.getItem('auth');
            console.log("called==>", auth)
            if (!auth) {
                return null;
            }
            return JSON.parse(auth);
        } catch (error) {
            console.error(error)
        }
    }

    static removeAuth = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error(error)
        }
    }
    static setToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error(error)
        }
    }

    static getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return null;
            }
            return token;
        } catch (error) {
            console.error(error)
        }
    }

    static removeToken = async () => {
        try {
            console.log("clear token");
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error(error)
        }
    }



}


export default Auth
