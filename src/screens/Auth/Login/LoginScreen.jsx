import React, { useState } from 'react';
import { Text, StyleSheet, StatusBar, Pressable, ScrollView, SafeAreaView, Image, ToastAndroid } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import { fontFamily, fontSize } from '../../../util/Fonts';
import InputFilled from '../../../Components/InputFilled/InputFilled';
import { apiService } from '../../../API_Services';
import { loaderAction, userInfoAction } from '../../../redux/Actions/UserAction';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {

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
        dispatch(loaderAction(true))
        const response = await apiService.login({ email, password })
        console.log("login==>", response)
        if (response && response != undefined && response.success) {
            await dispatch(userInfoAction(response?.data))
            dispatch(loaderAction(false))
            console.log("Api Response data at login===>", response)
            navigation.replace('HomeDrawer')
            setEmail('')
            setPassword('')
        }
        else {
            dispatch(loaderAction(false))
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle='dark-content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={CustomImage.login} style={styles.topImage} />
                <Text style={styles.loginText}>Login</Text>
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
                <Spacer height={5} />
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                <Spacer height={10} />
                <Pressable onPress={() => { alert('Cooming soon') }} style={styles.forgetButton}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
                <Spacer height={8} />
                <Pressable onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Spacer height={15} />
                <Pressable onPress={() => { navigation.navigate('TermsConditionScreen') }} >
                    <Text style={styles.loginButtonText}>New to Annapurna ? <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Register</Text></Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
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
    headerView: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: StatusBar.currentHeight,
        zIndex: 1,
        flexDirection: 'row'
    },
    smallLogo: {
        width: horizScale(25),
        height: horizScale(25),
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
        height: vertScale(280),
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

export default LoginScreen;
