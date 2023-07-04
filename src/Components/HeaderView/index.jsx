import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../util/Colors';
import CustomImage from '../../util/Images';
import { fontFamily, fontSize } from '../../util/Fonts';
import { horizScale, vertScale } from '../../util/Layout';
import FocusStatusBar from '../FocusStatusBar/FocusStatusBar';

const HeaderView = (props) => {
    return (
        <SafeAreaView style={styles.headerView}>
            <FocusStatusBar backgroundColor={Colors.theme} barStyle={'light-content'} />

            <Pressable style={styles.drawerTouch} onPress={() => { props.navigation.openDrawer(); }}>

                <Image source={CustomImage.menu} style={styles.drawerIcon} />
            </Pressable>
            <Text style={styles.appName}>Annapurna</Text>
            <View style={styles.headerSecondView}>
                <Pressable style={styles.drawerTouch2}>

                    <Image source={CustomImage.profileuser} style={styles.drawerIcon2} />
                </Pressable>
                <Pressable style={styles.drawerTouch3}>
                    <Image source={CustomImage.notification} style={styles.drawerIcon3} />
                </Pressable>

            </View>

        </SafeAreaView>
    )
}

export default HeaderView

const styles = StyleSheet.create({

    appName: {
        color: Colors.white,
        fontSize: fontSize.h5,
        fontFamily: fontFamily.black,
        right: horizScale(25)
    },
    headerSecondView: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-around'
    },
    drawerTouch: {
        backgroundColor: Colors.white,
        padding: horizScale(5),
        borderRadius: horizScale(20)
    },
    drawerTouch2: {
        backgroundColor: Colors.theme,
        padding: horizScale(2),
        borderRadius: horizScale(30),
        borderWidth: 1,
        borderColor: Colors.white
    },
    drawerTouch3: {
        backgroundColor: Colors.theme,
        padding: horizScale(8),
        borderRadius: horizScale(30),
        borderWidth: 1,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerIcon: {
        height: horizScale(20),
        width: horizScale(20),
    },
    drawerIcon2: {
        height: horizScale(30),
        width: horizScale(30),
        tintColor: Colors.white
    },
    drawerIcon3: {
        height: horizScale(16),
        width: horizScale(16),
        tintColor: Colors.white
    },
    container: {
        height: vertScale(50)
    },
    headerView: {
        backgroundColor: Colors.theme,
        height: vertScale(60),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: horizScale(15)
    }
})