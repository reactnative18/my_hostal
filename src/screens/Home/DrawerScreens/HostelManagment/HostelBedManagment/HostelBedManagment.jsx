import { FlatList, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'

const HostelBedManagment = ({ navigation }) => {
    const data = [
        { icon: CustomImage.logo, monthDate: '01/07', name: 'Rohit jaat', remainingDue: 0, mobile: '8959402332' },
        { icon: CustomImage.logo, monthDate: '12/07', name: 'Raja', remainingDue: 700, mobile: '8959402332' },
        { icon: CustomImage.logo, monthDate: '23/07', name: 'Anuj', remainingDue: 100, mobile: '8959402332' },
        { icon: CustomImage.logo, monthDate: '18/07', name: 'Ashu', remainingDue: 1400, mobile: '8959402332' },

    ]
    const renderItem = ({ item, index }) => {
        return <Pressable style={styles.roomContainer} onPress={() => { navigation.navigate('TenantProfileScreen') }}>
            <View style={styles.hostelContainer}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Image source={item.icon} style={styles.hostelImage} />
                </View>
                <View style={styles.hostelContainer2}>
                    <Text style={styles.hostelName}>{item.name}</Text>
                    <Text numberOfLines={2} style={styles.hostelAddress}>Due Date {item.monthDate} </Text>
                </View>
                <Pressable style={styles.deleteButton}>
                    <Image source={CustomImage.bin} style={styles.deleteIcon} />
                </Pressable>
            </View>
            <View style={styles.hostelContainer}>
                <Text style={styles.normText}>Due Rent {item.remainingDue}</Text>
                <Pressable style={styles.deleteButton} onPress={() => {
                    Linking.openURL(`tel:${item.mobile}`)
                }}>
                    <Image source={CustomImage.call} style={styles.deleteIcon} />
                </Pressable>
            </View>
        </Pressable>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Ap3 201"} />
                <Pressable style={styles.buttonView} onPress={() => {
                    navigation.navigate('TenantProfileScreen')
                }}>
                    <Image source={CustomImage.plus} style={styles.smallLogo} />
                    <Text style={styles.appText}>Add</Text>
                </Pressable>
            </View>
            <Spacer height={30} />

            <FlatList
                data={data}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default HostelBedManagment

const styles = StyleSheet.create({
    hostelName: {
        color: Colors.black,
        fontSize: fontSize.input,
        fontFamily: fontFamily.bold
    },
    normText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular,
        flex: 0.9,
        left: horizScale(70)
    },
    hostelAddress: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular
    },
    hostelContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    roomContainer: {

        alignItems: 'center',
        paddingVertical: vertScale(10),
        borderBottomWidth: horizScale(0.5),
    },
    hostelContainer2: {
        flex: 0.7,
        paddingHorizontal: horizScale(5)
    },
    deleteButton: {
        flex: 0.1,
        paddingHorizontal: horizScale(5)
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: horizScale(30),
        borderWidth: horizScale(0.8),
        borderColor: Colors.black,
        paddingHorizontal: horizScale(8),
        right: horizScale(20)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    smallLogo: {
        width: horizScale(12),
        height: horizScale(12),
        resizeMode: 'contain',
    },
    deleteIcon: {
        width: horizScale(18),
        height: horizScale(18),
        resizeMode: 'contain',
    },
    hostelImage: {
        width: horizScale(45),
        height: horizScale(45),
        resizeMode: 'contain',
    },
    appText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        marginLeft: normScale(8),
        fontFamily: fontFamily.regular
    },
})