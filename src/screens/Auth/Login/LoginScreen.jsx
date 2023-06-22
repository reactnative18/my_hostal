import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        navigation.replace('HomeTab')
        if (email === '') {
            setError('Please enter your email');
            return;
        }
        if (password === '') {
            setError('Please enter your password');
            return;
        }

        // Implement your login logic here
        // Clear the input fields and error state after successful login
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <ImageBackground
            source={CustomImage.loginbackground}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.grey}
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={Colors.grey}
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay to make the text more readable
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: 'white', // Add a background color for the input fields
        // opacity: 0.8,
        borderRadius: 15,
        color: Colors.black// Adjust the opacity to make the input fields semi-transparent
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
