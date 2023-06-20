import React from 'react'
import {
    Text, View,
    Pressable,
    Image, Linking
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../util/Colors'
import CustomImage from '../util/Images'
import { horizScale } from '../util/Layout'
import styles from '../util/Styles'
import { useSelector } from 'react-redux'
const UserInfo = ({ navigation }) => {
    const { info } = useSelector(state => state.userInfo)
    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.goBack()
                }}
                style={styles.backView} >
                <Image source={CustomImage.back} style={styles.smallIcon} />
                <Text style={styles.backText}>Back</Text>
            </Pressable>
            <View style={styles.infoView}>
                <Text style={styles.name}>{info.name}</Text>
                <Text style={styles.username}>{info.username}</Text>
                <Text style={styles.email}>{info.email}</Text>
                <View style={styles.rowCenter}>
                    <Text>{info.phone}</Text>
                    <Pressable
                        onPress={() => {
                            Linking.openURL(`tel:${info.phone}`)
                        }} >
                        <Image source={CustomImage.call} style={{ ...styles.smallIcon, tintColor: Colors.white }} />
                    </Pressable>
                </View>
            </View>

            <View style={[styles.rowCenter, styles.addressHeading]}>
                <Text style={styles.email}>Address</Text>
                <Pressable
                    onPress={() => {
                        var latitude = info?.address?.geo?.lat
                        var longitude = info?.address?.geo?.lng
                        Linking.openURL(`geo://?q=${latitude},${longitude}`);
                    }}
                >
                    <Image source={CustomImage.location} style={{ ...styles.smallIcon, tintColor: Colors.white }} />
                </Pressable>
            </View>
            <Text style={{ ...styles.testUnderline, marginTop: horizScale(20) }}>{info?.address?.suite}</Text>
            <Text style={styles.testUnderline}>{info?.address?.street}</Text>
            <Text style={styles.testUnderline}>{info?.address?.city}</Text>
            <Text style={styles.testUnderline}>{info?.address?.zipcode}</Text>
            <View style={[styles.rowCenter, styles.addressHeading, { marginVertical: horizScale(10) }]}>
                <Text style={styles.email}>Website</Text>
                <Text style={styles.name}>{info.website}</Text>
            </View>
            <View style={{ ...styles.infoView, backgroundColor: Colors.blue2 }}>
                <Text style={styles.name}>{info?.company.name}</Text>
                <Text style={styles.username}>{info?.company?.catchPhrase}</Text>
                <Text style={styles.email}>{info.company.bs}</Text>
            </View>
        </SafeAreaView>
    )
}
export default UserInfo