import { Alert, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../../util/Colors'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import CustomImage from '../../../../../util/Images'
import tableNames from '../../../../../firebase_database/constrains'
import { firebase_addDataToTable, firebase_getAllDataFromTableById, firebase_updateBedData } from '../../../../../firebase_database'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import ToastMessage from '../../../../../Components/ToastMessage'
import Modal from "react-native-modal";
const ExpensesEntry = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const { staff, category, hostel } = route.params;
    const [enterExpense, setEnterExpense] = useState('')
    const [Description, setDescription] = useState('')
    const [staffList, setStaffList] = useState([ ])
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getAllDataFromTableById(tableNames.staff, "hostelId", hostel.id)
            if (response) {
                console.log("setStaffList==>", response);

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
                categoryId: category.id,
                categoryType: category.type,
                description: Description,
                expenseAmount: enterExpense,
                createdAt: new Date().toISOString()
            }
            console.log(tableNames.expenses, data)
            const response = await firebase_addDataToTable(tableNames.expenses, data)
            if (response) {
                navigation.goBack()
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }

    }
    const [selectedStaff, setSelectedStaff] = useState({})
    const [updateModalVisible, setUpdateModalVisible] = useState(false)
    const renderItem = ({ item, index }) => {
        return (<View style={{ ...styles.staffList, backgroundColor: item.due == 0 ? '#ecf9ec' : '#ffebe6' }}>
            <Image source={CustomImage.profileuser} style={{
                width: horizScale(55),
                height: horizScale(55),
            }} />
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text numberOfLines={2} style={styles.normalText}>{item.name} | {item.dateOfJoining}</Text>
                <Text style={styles.normalText}>Monthly Salary : {item.monthlySalary}</Text>
                <Text style={styles.normalText}>Remain Salary : {item.remainSalary}</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
                <Pressable onPress={() => { navigation.navigate('TenantProfileScreen', { isStaff: true, staff: item }) }}
                    style={styles.smallButton}>
                    <Text style={styles.buttonText2}>Update</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedStaff(item)
                    setUpdateModalVisible(true)
                }}
                    style={{ ...styles.smallButton, backgroundColor: Colors.green }}>
                    <Text style={styles.buttonText2}>Pay</Text>
                </Pressable>
            </View>

        </View>)
    }
    const addTransectionEnrty = async () => {
        try {
            const data = {
                hostelId: hostel.id,
                expenseAmount: enterExpense,
                createdAt: new Date().toISOString(),
                staffId:selectedStaff.id,
                userId: userInfo.id
            }
            const response = await firebase_addDataToTable(tableNames.transectionStaff, data)
            if (response) {
                navigation.goBack()
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }

    }
    const updateStaffProfile = async () => {
        if (enterExpense == '') {
            ToastMessage.WarningShowToast("Please enter amount...")
            setUpdateModalVisible(false)
            return
        }
        try {
            dispatch(loaderAction(true))
            const data = {
                remainSalary: Number(selectedStaff.remainSalary) - Number(enterExpense),
            }
            await firebase_updateBedData(tableNames.staff, selectedStaff.id, data)
          await  addTransectionEnrty()
        } catch (error) {

        }
        finally {
            setUpdateModalVisible(false)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                isVisible={updateModalVisible}
                onBackButtonPress={() => setUpdateModalVisible(false)}
                onBackdropPress={() => setUpdateModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <InputFilled
                            type="Mobile"
                            placeholder={"Enter Pay Amount"}
                            value={enterExpense}
                            onChangeText={text => setEnterExpense(text)}
                            icon={CustomImage.rent}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderRadius: horizScale(10),
                                paddingVertical: horizScale(5),
                                paddingHorizontal: horizScale(15),
                                backgroundColor: Colors.red
                            }} onPress={() => {
                                setUpdateModalVisible(false)
                            }}>
                                <Text style={[styles.cardInfo, { color: Colors.white }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderRadius: horizScale(10),
                                paddingVertical: horizScale(5),
                                paddingHorizontal: horizScale(15),
                                backgroundColor: Colors.green
                            }} onPress={() => {
                                updateStaffProfile()
                            }}>
                                <Image source={CustomImage.verify} style={{
                                    height: horizScale(18), width: horizScale(18), tintColor: Colors.white, marginRight: horizScale(5)

                                }} />
                                <Text style={[styles.cardInfo, { color: Colors.white }]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Back'} />
            <ScrollView showsVerticalScrollIndicator={false}>

                {!staff && false &&
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
                        scrollEnabled={false}
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
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        color: Colors.black
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        minHeight: 170,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: Colors.black,
        borderRadius: normScale(60),
        width: '80%',
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
    smallButton: {
        backgroundColor: Colors.yellow,
        borderRadius: normScale(60),
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText2: {
        color: Colors.white,
        fontSize: fontSize.das,
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