import React, { useState } from 'react';
import {
    ToastAndroid, Text, StyleSheet,
    StatusBar, Pressable,
    ScrollView, SafeAreaView, Image
} from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import InputFilled from '../../../Components/InputFilled/InputFilled';
import { apiService } from '../../../API_Services';
import { useDispatch } from 'react-redux';
import { loaderAction, userInfoAction } from '../../../redux/Actions/UserAction';

const SignupScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (name === '') {
            setError('Please enter your name');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (email === '') {
            setError('Please enter your email');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (password === '') {
            setError('Please enter your password');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (confirmPassword !== password) {
            setError('Passwords do not match');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (phoneNumber === '') {
            setError('Please enter your phone number');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        let data = {
            name, email, password, mobileNo: phoneNumber
        }
        dispatch(loaderAction(true))
        const response = await apiService.signup(data)
        if (response.success) {
            console.log(response.data)
            await dispatch(userInfoAction(response?.data))
            dispatch(loaderAction(false))
            navigation.replace('LoginScreen')
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhoneNumber('');
            setError('');
        } else {
            if (response.message) {
                ToastAndroid.showWithGravity(response.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            dispatch(loaderAction(false))
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle='dark-content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={CustomImage.signup} style={styles.topImage} />
                <Text style={styles.loginText}>Sign Up</Text>

                <Spacer height={10} />
                <InputFilled
                    type="Email"
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    icon={CustomImage.user}
                />
                <Spacer height={10} />
                <InputFilled
                    type="Email"
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    icon={CustomImage.phone}
                />
                <Spacer height={10} />
                <InputFilled
                    type="Email"
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    icon={CustomImage.email}
                />
                <Spacer height={10} />
                <InputFilled
                    type="Password"
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    icon={CustomImage.padlock}
                />
                <Spacer height={10} />
                <InputFilled
                    type="Password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    icon={CustomImage.padlock}
                />
                <Spacer height={5} />
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                <Spacer height={15} />
                <Text style={styles.termsConditionText}>By signing up, you're agree to our <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Terms & Condition</Text> and <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Privacy Policy.</Text></Text>
                <Spacer height={8} />
                <Pressable onPress={handleSignup} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <Spacer height={15} />
                <Pressable onPress={() => { navigation.navigate('LoginScreen') }} >
                    <Text style={styles.loginButtonText}>Already have an account? <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Login</Text></Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
        zIndex: 1,
        flexDirection: 'row'
    },
    appText: {
        color: Colors.black,
        fontSize: fontSize.h5,
        marginLeft: normScale(8),
        fontFamily: fontFamily.blackItalic
    },
    forgetText: {
        fontSize: fontSize.medium,
        color: Colors.black,
        fontFamily: fontFamily.black
    },
    forgetButton: {
        right: 20,
        alignSelf: 'flex-end'
    },
    button: {
        backgroundColor: Colors.black,
        borderRadius: normScale(60),
        // height: vertScale(60),
        width: '80%',
        // width: fullWidth - horizScale(80),/
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: vertScale(10)
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    tegLine: {
        color: Colors.black,
        padding: vertScale(15),
        fontSize: fontSize.h4,
        textAlign: 'center',
        fontFamily: fontFamily.black
    },
    secondTegLine: {
        color: Colors.grey,
        fontSize: fontSize.medium,
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        paddingHorizontal: horizScale(20)
    },
    loginButtonText: {
        color: Colors.grey,
        fontSize: fontSize.medium,
        textAlign: 'center',
        fontFamily: fontFamily.regular

    },
    termsConditionText: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular,
        marginHorizontal: horizScale(22)

    },

    smallLogo: {
        width: horizScale(25),
        height: horizScale(25),
        resizeMode: 'contain',
    },
    logo: {
        width: horizScale(50),
        height: horizScale(50),
        resizeMode: 'contain',
    },
    loginText: {
        color: Colors.theme,
        fontSize: fontSize.h4,
        marginLeft: normScale(20),
        fontFamily: fontFamily.black,
        letterSpacing: horizScale(1)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topImage: {
        width: '100%',
        alignSelf: 'center',
        height: vertScale(150),
        borderBottomLeftRadius: normScale(20),
        borderBottomRightRadius: normScale(20),
        resizeMode: 'contain'
    },
    errorText: {
        color: Colors.red,
        fontSize: fontSize.das,
        marginLeft: horizScale(20)
    },
});

export default SignupScreen;
