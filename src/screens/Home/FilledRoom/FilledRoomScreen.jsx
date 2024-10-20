
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet,
    TouchableOpacity, Alert,
    TextInput,
    SafeAreaView,Image
} from 'react-native';
import { Colors } from '../../../util/Colors';
import HeaderView from '../../../Components/HeaderView';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
import { useIsFocused } from '@react-navigation/native';
import { fetchAllAvailableBeds, firebase_updateBedData } from '../../../firebase_database';
import tableNames from '../../../firebase_database/constrains';
import ToastMessage from '../../../Components/ToastMessage';
import CustomImage from '../../../util/Images';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

const FilledRoomScreen = ({ navigation }) => {
    const [seat, setSeat] = useState([])
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await fetchAllAvailableBeds(false)
            if (response) {
                const filledRoomList = response.filter(u => u.userId === userInfo.id);
                setSeat(filledRoomList)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const isFocus = useIsFocused()
    useEffect(() => {
        getData()
    }, [isFocus])

    const removeTenant = async (id, tId) => {
        try {
            dispatch(loaderAction(true))
            let updateData = {
                "seatAvailable": true,
                tenantId: null
            }
            let tenantUpdateData = {
                monthlyRent: 0,
                rent: 0,
                roomId: 0,
                securityDeposit: 0,
                exitDate: new Date().toLocaleDateString()
            }
            await firebase_updateBedData(tableNames.bed, id, updateData)
            await firebase_updateBedData(tableNames.tenant, tId, tenantUpdateData)

            const data = await seat?.filter(item => item.id !== id)
            setSeat(data)

        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }

    const [isStaff, setIsStaff] = useState(false)
    const [Search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => (
        <TouchableOpacity style={styles.userInfoContainer} onPress={() => {
            console.log("params from FilledRoomScreen=>", { tenant: item })
            navigation.navigate('TenantProfileScreen', { tenant: item })
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
                            onPress: () => { removeTenant(item.bedId,item.tenantId) }
                        }, {
                            text: 'No',
                            onPress: () => { ToastMessage.successShowToast("Thank you :)") }
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
            <FocusStatusBar backgroundColor={Colors.theme} barStyle={'light-content'} />

            <HeaderView navigation={navigation} />

            <FlatList
                data={seat}
                renderItem={renderItemUserInfo}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (<Spacer height={55} />)}
                ListEmptyComponent={() => {
                    return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={CustomImage.no} style={{
                            height: horizScale(120),
                            width: horizScale(120),
                        }} />
                        <Text>No Filled Beds...</Text>
                    </View>)
                }}
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
