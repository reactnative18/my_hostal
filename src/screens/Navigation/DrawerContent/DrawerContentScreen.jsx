import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ToastAndroid
} from 'react-native';
import { DrawerContentScrollView, DrawerItem, getDrawerStatusFromState } from '@react-navigation/drawer';
import CustomImage from '../../../util/Images';
import { horizScale, vertScale } from '../../../util/Layout';
import { fontSize } from '../../../util/Fonts';
import { Colors } from '../../../util/Colors';
import ShowAlert from '../../../util/Alert';
export default function DrawerContentScreen(props) {
    const [state, setState] = useState({
        profile: Image.resolveAssetSource(CustomImage.profileuser).uri,
    })
    return (

        <ImageBackground
            style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
            }}
            source={CustomImage.backDrawer}>

            <DrawerContentScrollView {...props}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: horizScale(15),
                        marginTop: vertScale(40),
                        marginBottom: vertScale(10),
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        alert('Coming Soon')
                    }}>

                    <Image
                        style={{
                            height: horizScale(60),
                            width: horizScale(60),
                            borderRadius: horizScale(35),
                            resizeMode: 'cover',
                            tintColor: Colors.white,
                            backgroundColor: Colors.black
                        }}
                        source={CustomImage.profileuser} />
                    <View style={{ marginLeft: horizScale(20) }}>
                        <Text style={{ color: Colors.white, }}>
                            Mr. Rohit Jaat
                        </Text>
                        <Text style={{ color: Colors.white, fontSize: fontSize.small }}>
                            +91 8959402332
                        </Text>
                    </View>
                </TouchableOpacity>
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="My Hostel"
                    icon={() => <Image style={styles.image} source={CustomImage.home} />}
                    onPress={() => props.navigation.navigate('HostelManagmentScreen')}
                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Expenses"
                    icon={() => <Image style={styles.image} source={CustomImage.expenses} />}
                    onPress={() => props.navigation.navigate('Expenses')}

                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Report a Complaint"
                    icon={() => <Image style={styles.image} source={CustomImage.complain} />}
                    onPress={() => { props.navigation.navigate('ReportComplain') }}

                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Feedback & Suggestions"
                    icon={() => <Image style={styles.image} source={CustomImage.feedback} />}
                    onPress={() => { props.navigation.navigate('Feedback') }}
                />

                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Help Center"
                    icon={() => <Image style={styles.image} source={CustomImage.help} />}
                    onPress={() => props.navigation.navigate('Help')}
                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Logout"
                    icon={() => <Image style={styles.image} source={CustomImage.logout} />}
                    onPress={() => {
                        Alert.alert("Logout", "Are you sure to Logout from our HOSTEL ?", [{
                            text: 'YES',
                            onPress: () => { ToastAndroid.showWithGravity('Coming soon', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }, {
                            text: 'No',
                            onPress: () => { ToastAndroid.showWithGravity('Thank you :)', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }
                        ])
                    }}
                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Delete Account"
                    icon={() => <Image style={styles.image} source={CustomImage.deleteAcount} />}
                    onPress={async () => {
                        const response = await ShowAlert({
                            title: "Delete Account",
                            message: "Are you sure to delete your account from our HOSTEL ?"
                        })
                        if (response) {
                            ToastAndroid.showWithGravity('Coming soon', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                        } else {

                            ToastAndroid.showWithGravity('Thank you :)', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                        }
                    }}
                />
            </DrawerContentScrollView>

        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    image: {
        width: horizScale(20),
        height: vertScale(20),
        resizeMode: 'contain',
        tintColor: Colors.white
    },
    labelStyle: {
        color: Colors.white,
        fontSize: fontSize.small,
    },
})