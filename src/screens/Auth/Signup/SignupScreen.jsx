import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import CustomImage from '../../../util/Images';

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        if (name === '') {
            setError('Please enter your name');
            return;
        }
        if (email === '') {
            setError('Please enter your email');
            return;
        }
        if (password === '') {
            setError('Please enter your password');
            return;
        }
        if (confirmPassword !== password) {
            setError('Passwords do not match');
            return;
        }
        if (phoneNumber === '') {
            setError('Please enter your phone number');
            return;
        }

        // Implement your signup logic here
        // Clear the input fields and error state after successful signup
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setError('');
    };

    return (
        <ImageBackground
            source={CustomImage.logo}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={text => setName(text)}

                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                />
                <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                />
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                <Button title="Sign Up" onPress={handleSignup} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',


    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default SignupScreen;
