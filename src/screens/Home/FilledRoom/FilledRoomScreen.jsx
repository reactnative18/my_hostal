
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, Image,
    TouchableOpacity, ScrollView, Alert, ToastAndroid,
    TextInput,
    SafeAreaView
} from 'react-native';
import { Colors } from '../../../util/Colors';
import HeaderView from '../../../Components/HeaderView';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
import { apiService } from '../../../API_Services';
import { useIsFocused } from '@react-navigation/native';

const FilledRoomScreen = ({ navigation }) => {


    const UserInfo = [
        {
            id: '1',
            hostelName: 'Ap 1',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02',
            joiningDate: '02/05/2023',
            name: 'Ajit modi'
        },
        {
            id: '2',
            hostelName: 'Ap 3',
            floorNo: '02',
            roomNo: '102',
            bedNo: '03',
            joiningDate: '02/05/2023',
            name: 'rahul patel'
        },
        {
            id: '3',
            hostelName: 'Ap 4',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02',
            joiningDate: '02/05/2023',
            name: 'Anushka kohli'
        },
        {
            id: '4',
            hostelName: 'Ap 2',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02'
        },
        // Add more cards as needed
    ];

    const [seat, setSeat] = useState([])
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const getData = async () => {
        dispatch(loaderAction(true))
        const response = await apiService.getAvailableRoom({ userId: userInfo?._id, "seatAvailible": false })
        console.log(response)
        if (response) {
            dispatch(loaderAction(false))
            setSeat(response.data)
        }
    }
    const isFocus = useIsFocused()
    useEffect(() => {
        getData()
    }, [isFocus])


    const [isStaff, setIsStaff] = useState(false)

    const [Search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => (
        <TouchableOpacity style={styles.userInfoContainer} onPress={() => {
            navigation.navigate('TenantProfileScreen', { user: {} })
        }}>
            <View style={styles.rowList}>
                <View>

                    <Text style={styles.boldText}>Hostel Name: {item.hostelName}</Text>
                    {!isStaff && <Text style={styles.regulerText}>Floor No: {item.floorName}</Text>}
                </View>
                <View >
                    <Text>{' '}</Text>
                </View>
                <Text style={styles.regulerText}>{item.name}</Text>
            </View>
            <View style={styles.rowList}>
                {!isStaff && <>
                    <Text style={styles.regulerText}>Room No: {item.roomName}</Text>
                    <Text style={styles.regulerText}>Bed No: {item.bedName}</Text>
                </>}
                {isStaff && <>
                    <Text style={styles.regulerText}>Joining Date {'\n'} {item.joiningDate}</Text>
                    <Text style={styles.regulerText}>Due Salary: {item.roomNo}</Text>
                </>}
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Remove", "Are you sure to remove this user from your hostel ?", [{
                            text: 'YES',
                            onPress: () => { ToastAndroid.showWithGravity('Coming soon', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }, {
                            text: 'No',
                            onPress: () => { ToastAndroid.showWithGravity('Thank you :)', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }
                        ])
                    }}
                    style={{ width: horizScale(90), alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6F00', paddingVertical: 4, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Remove {isStaff ? "Staff" : "User"}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderView navigation={navigation} />

            <FlatList
                data={seat}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.search}
                                placeholder='Search Here ...'
                                placeholderTextColor={Colors.black}
                                onChangeText={(value) => {
                                    setSearch(value)
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                <BouncyCheckbox
                                    size={normScale(18)}
                                    fillColor={Colors.green}
                                    unfillColor={Colors.white}
                                    disableText={true}
                                    isChecked={isStaff}
                                    iconStyle={{ marginLeft: horizScale(0) }}
                                    innerIconStyle={{
                                        borderWidth: normScale(2),
                                        borderColor: isStaff ? Colors.green : Colors.red,
                                        borderRadius: 20,
                                        backgroundColor: isStaff ? Colors.green : Colors.red,
                                    }}
                                    onPress={(isChecked) => { setIsStaff(!isStaff) }}
                                />
                                <Text style={{ ...styles.staffText, textDecorationLine: isStaff ? 'none' : 'line-through' }}>Is Staff</Text>
                            </View>
                        </View>
                    )
                }}

                renderItem={renderItemUserInfo}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (<Spacer height={55} />)}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    staffText: {
        fontSize: fontSize.das,
        color: Colors.black,
        fontFamily: fontFamily.regular
    },
    search: {
        height: vertScale(50),
        marginVertical: 15,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 8,
        backgroundColor: Colors.white,
        fontSize: 17,
        paddingHorizontal: 20,
        fontWeight: '700',
        color: Colors.black, marginHorizontal: horizScale(15)
    },
    rowList: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    regulerText: {
        color: 'black',
        fontSize: 14
    },
    boldText: {
        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold
    },

    userInfoContainer: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        justifyContent: 'space-around',
        width: '95%',
        height: 120
    },
    availableText: {
        color: 'white'
    },

    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 20
    },
    card: {
        width: 200,
        marginRight: 10,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default FilledRoomScreen;
