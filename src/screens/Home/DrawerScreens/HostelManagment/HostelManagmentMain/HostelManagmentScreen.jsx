import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'

const HostelManagmentScreen = ({ navigation }) => {
    const data = [
        { icon: CustomImage.logo, name: 'Ap boys hostel', address: 'bholaram ustad near by bhawarkuaa indore mp' },
        { icon: CustomImage.logo, name: 'Ap boys hostel', address: 'bholaram ustad near by bhawarkuaa indore mp' },
        { icon: CustomImage.logo, name: 'Ap boys hostel', address: 'bholaram ustad near by bhawarkuaa indore mp' },
        { icon: CustomImage.logo, name: 'Ap boys hostel', address: 'bholaram ustad near by bhawarkuaa indore mp' },

    ]
    const renderItem = ({ item, index }) => {
        return <Pressable style={styles.hostelContainer} onPress={() => navigation.navigate('HostelFloorManagment')}>
            <View style={{ flex: 0.2, alignItems: 'center' }}>

                <Image source={item.icon} style={styles.hostelImage} />
            </View>
            <View style={styles.hostelContainer2}>
                <Text style={styles.hostelName}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.hostelAddress}>{item.address}</Text>
            </View>
            <Pressable style={styles.deleteButton}>

                <Image source={CustomImage.bin} style={styles.deleteIcon} />
            </Pressable>
        </Pressable>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"My Hostels"} />
                <Pressable style={styles.buttonView} onPress={() => {
                    navigation.navigate('AddHostel')
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

export default HostelManagmentScreen

const styles = StyleSheet.create({
    hostelName: {
        color: Colors.black,
        fontSize: fontSize.input,
        fontFamily: fontFamily.bold
    },
    hostelAddress: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular
    },
    hostelContainer: {
        flexDirection: 'row',
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