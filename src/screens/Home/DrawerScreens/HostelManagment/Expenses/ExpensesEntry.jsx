import { Alert, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../../util/Colors'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import CustomImage from '../../../../../util/Images'
import tableNames from '../../../../../firebase_database/constrains'
import { firebase_addDataToTable, firebase_getAllDataFromTableById } from '../../../../../firebase_database'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import ToastMessage from '../../../../../Components/ToastMessage'

const ExpensesEntry = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { staff, category, hostel } = route.params;
    const [enterExpense, setEnterExpense] = useState('')
    const [Description, setDescription] = useState('')
    const [staffList, setStaffList] = useState([
        // { id: 1, name: 'Anuj', due: 1, ammount: 3000, month: '22/07' },
    ])
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getAllDataFromTableById(tableNames.staff, "hostelId", hostel.id)
            if (response) {
                setStaffList(response)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const isFocus = useIsFocused()
    useEffect(() => {
        staff && getData()
    }, [isFocus])
    const addExpenses = async () => {
        try {
            dispatch(loaderAction(true))
            const data = {
                hostelId: hostel?.id ?? null,
                categoryId:category.id,
                categoryType: category.type,
                description: Description,
                expenseAmount: enterExpense,
                date: new Date().toISOString()
            }
            console.log(tableNames.expenses, data)
            // const response = await firebase_addDataToTable(tableNames.expenses, data)
            // if (response) {
            //     navigation.goBack()
            // }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }

    }
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

                {!staff&& false &&
                    <>
                        <Spacer height={15} />
                        <Text style={styles.headingText}>This month Expenses</Text>
                        <Spacer height={10} />
                        <View style={styles.rowItem}>
                            <View style={styles.box}>
                                <Text style={{ ...styles.headingText2, color: Colors.blue }}>{category.type}</Text>
                                <Text style={styles.normalText}>₹ 350000/-</Text>
                            </View>
                        </View>
                    </>}

                <Spacer height={20} />
                <Text style={styles.headingText}>{staff ? "Staff Salary" : "Add more"}</Text>
                <Spacer height={25} />
                {!staff ? <>

                    <InputFilled
                        type="Mobile"
                        placeholder="Enter amount"
                        value={enterExpense}
                        onChangeText={text => setEnterExpense(text)}
                        icon={CustomImage.expenses}
                    />
                    <Spacer height={20} />
                    <InputFilled
                        type="Description"
                        placeholder="Enter Description..."
                        value={Description}
                        onChangeText={text => setDescription(text)}
                        icon={CustomImage.add}
                        multiline={true}
                    />
                </> :
                    <FlatList
                        data={staffList}
                        renderItem={renderItem}
                        ListEmptyComponent={() => {
                            return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={CustomImage.no} style={{
                                    height: horizScale(120),
                                    width: horizScale(120),
                                }} />
                                <Text>No Staff member available...</Text>
                            </View>)
                        }}
                    />
                }
                {!staff && <>
                    <Spacer height={20} />
                    <Pressable onPress={() => {
                        if (enterExpense) {
                            addExpenses()
                        } else {
                            ToastMessage.WarningShowToast("Please enter amount...")
                        }
                    }} style={styles.button}>
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
        minWidth: horizScale(90),
        flexGrow: 1,
        margin: horizScale(10)
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