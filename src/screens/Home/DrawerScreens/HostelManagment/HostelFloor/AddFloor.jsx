import { Pressable, SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'

const AddFloor = ({ navigation }) => {
    const [floorNumber, setFloorNumber] = useState('')
    const [totelRoom, setTotelRoom] = useState('')
    const [totelSeat, setTotelSeat] = useState('')
    const [availableSeat, setAvailableSeat] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Add Floor to Ap3"} />
            </View>
            <Spacer height={30} />
            <View style={styles.container}>

                <InputFilled
                    type="Mobile"
                    placeholder="Floor Number"
                    value={floorNumber}
                    onChangeText={text => setFloorNumber(text)}
                    icon={CustomImage.logo}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Email"
                    placeholder="Totel Room"
                    value={totelRoom}
                    onChangeText={text => setTotelRoom(text)}
                    icon={CustomImage.logo}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Email"
                    placeholder="Totel Seat"
                    value={totelSeat}
                    onChangeText={text => setTotelSeat(text)}
                    icon={CustomImage.logo}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Email"
                    placeholder="Available Seat"
                    value={availableSeat}
                    onChangeText={text => setAvailableSeat(text)}
                    icon={CustomImage.logo}
                />

                <Spacer height={20} />
                <Pressable onPress={() => { alert('Cooming Soon') }} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddFloor

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

})