import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../../util/Colors'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import CustomImage from '../../../../../util/Images'
import { getAllHostelData } from '../../../../../firebase_database'
import { useDispatch, useSelector } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import { useIsFocused } from '@react-navigation/native'
import ToastMessage from '../../../../../Components/ToastMessage'

const Expenses = ({ navigation }) => {
    const dispatch = useDispatch()
    const [hostel, setHostel] = useState(null)
    const [selectedType, setSelectedType] = useState(1)
    const { userInfo } = useSelector(state => state.userInfo)
    const [hostels, setHostels] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(null)
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await getAllHostelData(userInfo.id)
            if (response?.length > 0) {
                console.log(response)
                setHostels(response)
                let totalExpenses = await calculateTotals(response)
                setTotalExpenses(totalExpenses)
            }
        } catch (error) {

        }
        finally {

            dispatch(loaderAction(false))
        }

    }
    function calculateTotals(hostels) {
        return hostels.reduce(
            (totals, hostel) => {
                totals.totalDueRent += Number(hostel.totalDueRent);
                totals.totalPaidRent += Number(hostel.totalPaidRent);
                return totals;
            },
            { totalDueRent: 0, totalPaidRent: 0 }
        );
    }
    const { loading } = useSelector(state => state.loader)
    const focus = useIsFocused()
    useEffect(() => {
        getData()
    }, [focus])
    const Category = [
        {
            id: 0,
            type: "Grocery",
            image: CustomImage.food,
            isHostelRequied: true
        },
        {
            id: 1,
            type: "Maintenance",
            image: CustomImage.maintenence,
            isHostelRequied: true
        },
        {
            id: 2,
            type: "Staff Salary",
            image: CustomImage.salary,
            isHostelRequied: true
        },
        {
            id: 3,
            type: "Cylinder",
            image: CustomImage.gascylinder,
            isHostelRequied: true
        },
        {
            id: 4,
            type: "Fuel",
            image: CustomImage.fuel,
            isHostelRequied: false
        },
        {
            id: 5,
            type: "Fixed Expenses",
            image: CustomImage.fixexpenses,
            isHostelRequied: false
        },
        {
            id: 6,
            type: "One Time Expense",
            image: CustomImage.onetime,
            isHostelRequied: false
        },
    ]
    const renderCategory = ({ item, index }) => {
        return (
            <Pressable key={"renderCategory_" + index} onPress={() => {
                if (item.isHostelRequied && hostel == null) {
                    ToastMessage.WarningShowToast('Please select hostel first...')
                } else {
                    // if (item.id == 2) {
                    //     ToastMessage.WarningShowToast("Coming Soon")
                    //     return
                    // }
                    navigation.navigate('ExpensesEntry', {
                        staff: item.id == 2 ? true : false,
                        category: item,
                        hostel: hostel
                    })
                }
            }} style={styles.box}>
                <Image source={item.image} style={styles.category} />
                <Text style={styles.normalText}>{item.type}</Text>
            </Pressable>
        )
    }

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
                        <Text style={styles.normalText}>₹ {totalExpenses?.totalPaidRent ?? 0}/-</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={{ ...styles.headingText2, color: Colors.red }}>Totel Expens</Text>
                        <Text style={styles.normalText}>Coming Soon</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={{ ...styles.headingText2, color: Colors.red }}>Totel Rent Due</Text>
                        <Text style={styles.normalText}>₹ {totalExpenses?.totalDueRent ?? 0}/-</Text>
                    </View>
                </View>
                <Spacer height={15} />
                <Text style={styles.headingText}>Select Hostel</Text>
                <Spacer height={15} />
                <InputFilled
                    type="Dropdown"
                    placeholder="Select a hostel..."
                    data={hostels}
                    value={hostel?.hostelName || ''}
                    keyName="hostelName"
                    onChangeText={text => {
                        setHostel(text)
                    }}
                    icon={CustomImage.hostel}
                />
                <Spacer height={20} />
                <Text style={styles.headingText}>Select Expenses Type</Text>

                <Spacer height={20} />
                <FlatList
                    data={Category}
                    renderItem={renderCategory}
                    numColumns={3}
                    contentContainerStyle={styles.flatStyle}
                />

                <Spacer height={15} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Expenses

const styles = StyleSheet.create({
    flatStyle: {
        margin: horizScale(5)
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
        flexGrow: 1,
        margin: horizScale(5)
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
        margin: horizScale(5)
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
        fontSize: fontSize.das,
        color: Colors.black,
    },
    normalText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: Colors.black,
    }
})