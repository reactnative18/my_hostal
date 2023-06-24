import React from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { fontFamily, fontSize } from '../../../util/Fonts'
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../util/Colors'
import { fullWidth, horizScale, normScale, vertScale } from '../../../util/Layout'
import CustomImage from '../../../util/Images'

const AuthMainScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar hidden transulent />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.headerView}>
                    <Image source={CustomImage.logo} style={styles.smallLogo} />
                    <Text style={styles.appText}>Annapurna</Text>
                </View>
                <Image source={CustomImage.splash_1} style={styles.topImage} />
                <View style={styles.mainView}>

                    <Text style={styles.tegLine}>A home away from home, at our hostel</Text>
                    <Text style={styles.secondTegLine}>The No. 1 App for searching and finding the most suitable hostel with you</Text>
                    <Pressable onPress={() => { navigation.navigate('TermsConditionScreen') }} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('LoginScreen') }} >

                        <Text style={styles.loginButtonText}>Already have an account ? <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Log in</Text></Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AuthMainScreen

const styles = StyleSheet.create({
    mainView: {
        width: fullWidth,
        borderTopRightRadius: normScale(20),
        borderTopLeftRadius: normScale(20),
        backgroundColor: Colors.white,
        marginTop: vertScale(-30),
        zIndex: 1
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
        paddingHorizontal: horizScale(20),
        paddingBottom: vertScale(10)
    },
    loginButtonText: {
        color: Colors.grey,
        fontSize: fontSize.medium,
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        paddingVertical: vertScale(10)
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
    appText: {
        color: Colors.white,
        fontSize: fontSize.medium,
        marginLeft: normScale(8),
        fontFamily: fontFamily.blackItalic
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topImage: {
        width: '100%',
        alignSelf: 'center',
        height: vertScale(450),
        resizeMode: 'contain',
        borderBottomLeftRadius: normScale(20),
        borderBottomRightRadius: normScale(20),
    },

})