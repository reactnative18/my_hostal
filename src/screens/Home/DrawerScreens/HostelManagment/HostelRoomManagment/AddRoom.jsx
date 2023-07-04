import { Pressable, SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import React, { useMemo, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import RadioGroup from 'react-native-radio-buttons-group';
const AddRoom = ({ navigation }) => {
    const [RoomNumber, setRoomNumber] = useState('')
    const [roomType, setroomType] = useState('')
    const [availableSeat, setAvailableSeat] = useState('')
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: '1 Seater Room',
            value: '1'
        },
        {
            id: '2',
            label: '2 Seater Room',
            value: '2'

        },

        {
            id: '3',
            label: '3 Seater Room',
            value: '3'

        },
        {
            id: '4',
            label: '4 Seater Room',
            value: '4'

        },
        {
            id: '5',
            label: '5 Seater Room',
            value: '5'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

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
                    placeholder="Room Number"
                    value={RoomNumber}
                    onChangeText={text => setRoomNumber(text)}
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
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    containerStyle={{
                        alignSelf: 'flex-start', left: horizScale(25),

                    }}

                />
                <Spacer height={20} />
                <Pressable onPress={() => { alert('Cooming Soon') }} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddRoom

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