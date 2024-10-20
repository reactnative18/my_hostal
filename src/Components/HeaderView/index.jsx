import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../util/Colors';
import CustomImage from '../../util/Images';
import { fontFamily, fontSize } from '../../util/Fonts';
import { horizScale, vertScale } from '../../util/Layout';

const HeaderView = (props) => {
    return (
        <SafeAreaView style={styles.headerView}>
            <Pressable style={styles.drawerTouch} onPress={() => { props.navigation.openDrawer(); }}>

                <Image source={CustomImage.menu} style={styles.drawerIcon} />
            </Pressable>
            {/* <Text style={styles.appName}>Annapurna</Text> */}
            <Image source={CustomImage.annapurna} style={styles.annapurna} />
            <View style={styles.headerSecondView}>
                <Pressable style={styles.drawerTouch2}>

                    <Image source={CustomImage.profileuser} style={styles.drawerIcon2} />
                </Pressable>
                <Pressable
                    onPress={() => {
                        props.navigation.navigate("Notification")
                    }}
                    style={styles.drawerTouch3}>
                    <Image source={CustomImage.notification} style={styles.drawerIcon3} />
                </Pressable>

            </View>

        </SafeAreaView>
    )
}

export default HeaderView

const styles = StyleSheet.create({

    appName: {
        color: "#ffd96d",// Colors.white,//"#ffd96d" #cbb268
        fontSize: fontSize.h6,
        fontFamily: fontFamily.bold,
        right: horizScale(25),
        letterSpacing: horizScale(1)
    },
    headerSecondView: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-around'
    },
    drawerTouch: {
        // backgroundColor: Colors.white,
        padding: horizScale(7),
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
        height: horizScale(19),
        width: horizScale(19),
        tintColor: Colors.white
    },
    annapurna: {
        height: horizScale(25),
        width: horizScale(120),
        marginRight: horizScale(60)
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