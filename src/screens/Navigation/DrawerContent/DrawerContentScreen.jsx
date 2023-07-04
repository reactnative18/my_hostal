import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { DrawerContentScrollView, DrawerItem, getDrawerStatusFromState } from '@react-navigation/drawer';
import CustomImage from '../../../util/Images';
import { horizScale, vertScale } from '../../../util/Layout';
import { fontSize } from '../../../util/Fonts';
import { Colors } from '../../../util/Colors';
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
                            height: horizScale(70),
                            width: horizScale(70),
                            borderRadius: horizScale(35),
                            resizeMode: 'cover',
                            tintColor: Colors.white
                        }}
                        source={{ uri: state.profile }} />
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
                    label="Report a Complaint"
                    icon={() => <Image style={styles.image} source={CustomImage.noun_new_1408303} />}
                    onPress={() => alert('Coming Soon')}

                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Expenses"
                    icon={() => <Image style={styles.image} source={CustomImage.report_icon} />}
                    onPress={() => alert('Coming Soon')}

                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Feedback & Suggestions"
                    icon={() => <Image style={styles.image} source={CustomImage.message27} />}
                    onPress={() => alert('Coming Soon')}
                />

                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Help Center"
                    icon={() => <Image style={styles.image} source={CustomImage.help} />}
                    onPress={() => alert('Coming Soon')}
                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Logout"
                    icon={() => <Image style={styles.image} source={CustomImage.logout} />}
                    onPress={() => alert('Coming Soon')}
                />
                <DrawerItem
                    labelStyle={styles.labelStyle}
                    label="Delete Account"
                    icon={() => <Image style={styles.image} source={CustomImage.settings} />}
                    onPress={() => alert('Coming Soon')}

                />
            </DrawerContentScrollView>

        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    image: {
        width: horizScale(24),
        height: vertScale(25),
        resizeMode: 'contain',
        tintColor: Colors.white
    },
    labelStyle: {
        color: Colors.white,
        fontSize: fontSize.small,
    },
})