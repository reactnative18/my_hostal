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
import { apiService } from '../../../../../API_Services'
import { useDispatch } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
const AddRoom = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { floor } = route.params
    const [RoomNumber, setRoomNumber] = useState('')
    const addRoom = async () => {
        dispatch(loaderAction(true))
        const data = {
            userId: floor.userId,
            hostelId: floor.hostelId,
            floorId: floor._id,
            roomName: RoomNumber
        }
        const response = await apiService.addRoom(data)
        if (response) {
            dispatch(loaderAction(false))
            navigation.goBack()
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Add Room on " + floor.floorName} />
            </View>
            <Spacer height={30} />
            <View style={styles.container}>

                <InputFilled
                    type="Email"
                    placeholder="Room Number/Name"
                    value={RoomNumber}
                    onChangeText={text => setRoomNumber(text)}
                    icon={CustomImage.logo}
                />

                <Spacer height={20} />
                <Pressable onPress={() => { addRoom() }} style={styles.button}>
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