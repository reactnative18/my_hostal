import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../../util/Colors'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import CustomImage from '../../../../../util/Images'

const ExpensesEntry = ({ navigation, route }) => {
    const { staff = false } = route.params;
    const [enterExpense, setEnterExpense] = useState('')
    const [Description, setDescription] = useState('')
    const [Currentexpense, setCurrentexpense] = useState('200')
    const [staffList, setStaffList] = useState([
        { id: 1, name: 'Anuj', due: 1, ammount: 3000, month: '22/07' },
        { id: 1, name: 'Ram', due: 0, ammount: 0, month: '22/07' },
        { id: 1, name: 'Babu', due: 1, ammount: 3500, month: '22/07' },
        { id: 1, name: 'Depu', due: 1, ammount: 1000, month: '22/07' },
        { id: 1, name: 'Rohit', due: 1, ammount: 3000, month: '22/07' }
    ])
    const renderItem = ({ item, index }) => {
        return (<Pressable
            onPress={() => { navigation.navigate('TenantProfileScreen', { isStaff: true }) }}
            style={{ ...styles.staffList, backgroundColor: item.due == 0 ? '#ecf9ec' : '#ffebe6' }}>
            <Image source={CustomImage.profileuser} style={{
                width: horizScale(55),
                height: horizScale(55),
            }} />
            <View>
                <Text numberOfLines={2} style={styles.normalText2}>{item.name}</Text>
                <Text style={styles.normalText2}>{item.month}</Text>
            </View>
            <View>
                <Text style={styles.normalText}>Due : {item.due == 1 ? "Yes" : "No"}</Text>
                <Text style={styles.normalText}>Amount : {item.ammount}</Text>
            </View>
            <Image source={CustomImage.arrow} style={{
                width: horizScale(18),
                height: horizScale(18)
            }} />
        </Pressable>)
    }
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Back'} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <Spacer height={15} />
                <Text style={styles.headingText}>Maintenance Expenses</Text>
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

                <Spacer height={20} />
                <Text style={styles.headingText}>{!staff ? "Add more" : "Staff Salary"}</Text>
                <Spacer height={25} />
                {!staff ? <>
                    <InputFilled
                        type="Email"
                        placeholder="Current expense"
                        value={Currentexpense}
                        onChangeText={text => setCurrentexpense(text)}
                        icon={CustomImage.all}
                        editable={false}

                    />
                    <Spacer height={20} />
                    <InputFilled
                        type="Email"
                        placeholder="Enter Description..."
                        value={Description}
                        onChangeText={text => setDescription(text)}
                        icon={CustomImage.add}
                    />
                    <Spacer height={20} />
                    <InputFilled
                        type="Mobile"
                        placeholder="Enter Ammount..."
                        value={enterExpense}
                        onChangeText={text => setEnterExpense(text)}
                        icon={CustomImage.expenses}
                    />
                </> :
                    <FlatList
                        data={staffList}
                        renderItem={renderItem}
                    />
                }
                {!staff && <>
                    <Spacer height={20} />
                    <Pressable onPress={() => { alert('Coming soon') }} style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </Pressable>
                </>}
                <Spacer height={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ExpensesEntry

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
    staffList: {
        borderWidth: horizScale(0.7),
        borderColor: Colors.black,
        borderRadius: horizScale(10),
        padding: horizScale(10),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: horizScale(90),
        flexDirection: 'row',
        margin: horizScale(7)
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
    },
    normalText2: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.medium,
        color: Colors.black,
        textAlign: 'center',
        width: horizScale(120)
    }
})