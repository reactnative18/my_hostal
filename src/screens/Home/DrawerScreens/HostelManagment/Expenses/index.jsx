import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../../util/Colors'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import CustomImage from '../../../../../util/Images'

const Expenses = ({ navigation }) => {
    const [hostel, setHostel] = useState('')
    const hostelList = [{ label: 'AP1', value: 'AP 1' },
    { label: 'AP 2', value: 'AP 2' }]
    const [selectedType, setSelectedType] = useState(1)
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Back'} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <Spacer height={15} />
                <Text style={styles.headingText}>All Hostels Expenses</Text>
                <Spacer height={10} />
                <View style={styles.rowItem}>
                    <View style={styles.box}>
                        <Text style={{ ...styles.headingText2, color: Colors.blue }}>Totel Income</Text>
                        <Text style={styles.normalText}>₹ 350000/-</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={{ ...styles.headingText2, color: Colors.red }}>Totel Expense</Text>
                        <Text style={styles.normalText}>₹ 280000/-</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={{ ...styles.headingText2, color: Colors.green }}>Saving</Text>
                        <Text style={styles.normalText}>₹ 70000/-</Text>
                    </View>
                </View>
                <Spacer height={15} />
                <Text style={styles.headingText}>Select Hostel</Text>
                <Spacer height={15} />
                <InputFilled
                    type="Dropdown"
                    placeholder="Select a hostel..."
                    data={hostelList}
                    value={hostel}
                    onChangeText={text => setHostel(text)}
                    icon={CustomImage.hostel}
                />
                <Spacer height={20} />
                <Text style={styles.headingText}>Select Expenses Type</Text>
                <Spacer height={25} />
                <View style={styles.rowItem}>
                    <Pressable onPress={() => {
                        setSelectedType(1)
                    }} style={styles.box}>
                        {selectedType == 1 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.food} style={styles.category} />
                        <Text style={styles.normalText}>grocery</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedType(2)
                    }} style={styles.box}>
                        {selectedType == 2 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.maintenence} style={styles.category} />
                        <Text style={styles.normalText}>Maintenance</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedType(3)
                    }} style={styles.box}>
                        {selectedType == 3 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.salary} style={styles.category} />
                        <Text style={styles.normalText}>Staff Salary</Text>
                    </Pressable>

                </View>
                <Spacer height={20} />
                <View style={styles.rowItem}>
                    <Pressable onPress={() => {
                        setSelectedType(4)
                    }} style={styles.box}>
                        {selectedType == 4 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.fuel} style={styles.category} />
                        <Text style={styles.normalText}>Fuel</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedType(5)
                    }} style={styles.box}>
                        {selectedType == 5 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.gascylinder} style={styles.category} />
                        <Text style={styles.normalText}>Cylinder</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedType(6)
                    }} style={styles.box}>
                        {selectedType == 6 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.fixexpenses} style={styles.category} />
                        <Text style={styles.normalText}>Fixed Expenses</Text>
                    </Pressable>
                </View>
                <Spacer height={20} />
                <View style={styles.rowItem2}>
                    <Pressable onPress={() => {
                        setSelectedType(7)
                    }} style={styles.box}>
                        {selectedType == 7 && <Image source={CustomImage.verify} style={styles.selectedImage} />}
                        <Image source={CustomImage.onetime} style={styles.category} />
                        <Text style={styles.normalText}>One Time Expense</Text>
                    </Pressable>
                </View>
                <Spacer height={20} />
                <Pressable onPress={() => {
                    navigation.navigate('ExpensesEntry', {
                        staff: selectedType == 3 ? true : false
                    })
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <Spacer height={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Expenses

const styles = StyleSheet.create({
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
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    selectedImage: {
        position: 'absolute',
        right: horizScale(-5),
        top: horizScale(-5),
        tintColor: Colors.green,
        height: horizScale(18),
        width: horizScale(18),
        backgroundColor: Colors.white

    },
    category: {
        height: horizScale(30),
        width: horizScale(30),
        resizeMode: 'contain'
    },
    box: {
        borderWidth: horizScale(0.7),
        borderColor: Colors.black,
        borderRadius: horizScale(10),
        padding: horizScale(10),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: horizScale(90)
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    rowItem2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: horizScale(15)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headingText: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.input,
        color: Colors.black,
        paddingHorizontal: horizScale(15)
    },
    headingText2: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular,
        color: Colors.black,
    },
    normalText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.medium,
        color: Colors.black,
    }
})