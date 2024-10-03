import {
    FlatList, Image,
    Pressable, SafeAreaView, StyleSheet, Text, View
} from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import { useDispatch, useSelector } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import { firebase_addDataToTable } from '../../../../../firebase_database'
import tableNames from '../../../../../firebase_database/constrains'

const AddHostel = ({ navigation }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)

    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [mapLink, setMapLink] = useState('')
    const addHostel = async () => {
        dispatch(loaderAction(true))
        const data = {
            userId: userInfo.id,
            hostelName: name,
            hostelAddress: address,
            mapLink
        }
        try {
            const response = await firebase_addDataToTable(tableNames.hostel, data)
            if (response) {
                navigation.goBack()
            } else {
                // may be network issue
            }
        } catch (error) {
console.log(error)
        }
        finally {
            console.log('sethostel=>', data, "\nuser data=>", userInfo)
            dispatch(loaderAction(false))
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Add Hostel"} />
            </View>
            <Spacer height={30} />
            <View style={styles.container}>

                <InputFilled
                    type="Email"
                    placeholder="Name here"
                    value={name}
                    onChangeText={text => setName(text)}
                    icon={CustomImage.user}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Email"
                    placeholder="Address"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    icon={CustomImage.location}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Email"
                    placeholder="Map Link"
                    value={mapLink}
                    onChangeText={text => setMapLink(text)}
                    icon={CustomImage.map}
                />
                <Spacer height={20} />
                <Pressable onPress={() => { addHostel() }} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddHostel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
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
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    appText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        marginLeft: normScale(8),
        fontFamily: fontFamily.regular
    },
    smallLogo: {
        width: horizScale(12),
        height: horizScale(12),
        resizeMode: 'contain',
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: horizScale(30),
        borderWidth: horizScale(0.8),
        borderColor: Colors.black,
        paddingHorizontal: horizScale(8),
        right: horizScale(20),
        marginTop: vertScale(5)
    }
})