import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, SafeAreaView, Alert, Pressable } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
import Modal from "react-native-modal";
import { firebase_addDataToTable, firebase_getAllDataFromTableById, firebase_updateBedData } from '../../../firebase_database';
import tableNames from '../../../firebase_database/constrains';
import InputFilled from '../../../Components/InputFilled/InputFilled';
import ToastMessage from '../../../Components/ToastMessage';
import { useIsFocused } from '@react-navigation/native';

const SingleRoomScreen = ({ navigation, route }) => {

    const { userInfo } = useSelector(state => state.userInfo)
    const { room } = route.params;
    const [tenantData, setTenantData] = useState(null)
    const [totalDueRent, setTotalDueRent] = useState(null)
    const dispatch = useDispatch()
    const isFocus = useIsFocused()
    const getData = async (id) => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getAllDataFromTableById(tableNames.tenant, "id", id)
            if (response) { 
                setTenantData(response[0])
            }
            await getTransections(id)
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const getTransections = async (id) => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getAllDataFromTableById(tableNames.transectionTenant, "tenantId", id)
            if (response) { 
                const sortedRentData = response.sort((a, b) => { 
                    const dateB = new Date(a.month.split('-').reverse().join('-'));
                    const dateA = new Date(b.month.split('-').reverse().join('-'));

                    return dateA - dateB;
                });
                setAllTransection(sortedRentData)
                const totalDueRent = sortedRentData.reduce((total, item) => parseInt(total) + item.dueRent, 0);
                setTotalDueRent(totalDueRent)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const [selected, setSelected] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [currentMonth, setCurrentMonth] = useState('')
    const [paidRent, setPaidRent] = useState(null)
    const [dueRent, setDueRent] = useState(null)
    const [showHistory, setShowHistory] = useState(false)
    const [newEntry, setNewEntry] = useState(false)
    const [allTransection, setAllTransection] = useState([])

    const addTransectionRecord = async () => {
        if (currentMonth == '' || dueRent == '' || paidRent == '') {
            ToastMessage.successShowToast("All the field is required...")
            return
        }
        dispatch(loaderAction(true))
        const data = {
            userId: userInfo.id,
            tenantId: tenantData.id,
            month: currentMonth,
            dueRent: Number(dueRent) > 0 ? Number(dueRent) : 0,
            paidRent: Number(paidRent),
            isCurrentMonth: true,
            monthlyRent: Number(tenantData.monthlyRent)
        }
        const tenantUpdate = {
            rent: Number(tenantData.rent) + Number(dueRent)
        }
        if (allTransection.length > 0) {
            const updateLastTransection = {
                isCurrentMonth: false
            }
            firebase_updateBedData(tableNames.transectionTenant, allTransection[0].id, updateLastTransection)
        }
        firebase_updateBedData(tableNames.tenant, tenantData.id, tenantUpdate)
        try {
            const response = await firebase_addDataToTable(tableNames.transectionTenant, data)
            if (response) {
                setCurrentMonth('')
                setDueRent(0)
                setPaidRent(0)
                setNewEntry(!newEntry)
                ToastMessage.successShowToast("Record Added Successfully...")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            await getData(tenantData.id)
            dispatch(loaderAction(false))

        }

    }
    useEffect(() => {
        if (tenantData) {
            getData(tenantData.id)
        }
    }, [isFocus])
    const [isVisible, setIsVisible] = useState(false)
    const [dueRentRecord, setDueRentRecord] = useState(null)
    const updateDueRecord = () => {
        try {
            if (Number(tenantData.rent) > 0) {
                const tenantUpdate = {
                    rent: Number(tenantData.rent) - Number(dueRent)
                }
                firebase_updateBedData(tableNames.tenant, tenantData.id, tenantUpdate)
                const recordUpdate = {
                    dueRent: Number(dueRentRecord.dueRent) - Number(dueRent),
                    paidRent: Number(dueRentRecord.paidRent) + Number(dueRent)
                }
                firebase_updateBedData(tableNames.transectionTenant, dueRentRecord.id, recordUpdate)
            } else {
                const recordUpdate = {
                    dueRent: Number(dueRentRecord.dueRent) - Number(dueRent),
                    paidRent: Number(dueRentRecord.paidRent) + Number(dueRent)
                }
                firebase_updateBedData(tableNames.transectionTenant, dueRentRecord.id, recordUpdate)
            }
        } catch (error) {

        }
        finally {
            getData(tenantData.id)
            setIsVisible(!isVisible)
        }
    }
    function getNextMonthDate(dateString) {
        let [day, month, year] = dateString.split('-').map(Number);
        let date = new Date(year, month - 1, day);
        date.setMonth(date.getMonth() + 1);
        let newDay = String(date.getDate()).padStart(2, '0');
        let newMonth = String(date.getMonth() + 1).padStart(2, '0');
        let newYear = date.getFullYear();
        return `${newDay}-${newMonth}-${newYear}`;
    }
    const dueClearModel = () => {
        return <Modal
            isVisible={isVisible}
            onBackButtonPress={() => setIsVisible(false)}
            onBackdropPress={() => setIsVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <InputFilled
                        type="Mobile"
                        placeholder={"Enter Due Rent"}
                        value={dueRent}
                        onChangeText={text => setDueRent(text)}
                        icon={CustomImage.rent}
                    />
                    <Spacer height={20} />
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderRadius: horizScale(10),
                        paddingVertical: horizScale(5),
                        paddingHorizontal: horizScale(15),
                        backgroundColor: Colors.green
                    }} onPress={() => {
                        updateDueRecord()
                    }}>
                        <Image source={CustomImage.verify} style={{
                            height: horizScale(18), width: horizScale(18), tintColor: Colors.white, marginRight: horizScale(5)

                        }} />
                        <Text style={[styles.cardInfo, { color: Colors.white }]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    }
    const renderItemRoom2 = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                if (!item.seatAvailable) {
                    getData(item.tenantId)
                }
                setSelectedItem(item)
                setSelected(item.id)
            }}
            style={{ ...styles.roomContainer2, backgroundColor: !item.seatAvailable ? item?.due == 1 ? Colors.green : Colors.red : Colors.yellow }}>
            {selected == item.id && <Image source={CustomImage.verify} style={styles.smallIcon} />}
            <Text style={styles.cardTitle2}>{item.bedName}</Text>

        </TouchableOpacity>
    );

    const renderItemUserInfo = ({ item, index }) => {
        return (
            <View key={"historyTransection" + index} style={{ ...styles.userInfoContainer, backgroundColor: item.dueRent == 0 ?'#aaf0c9':'#ffcccb'}} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{
                        borderRadius: horizScale(20),
                        borderWidth: horizScale(1),
                        borderColor: Colors.theme,
                        width: vertScale(30),
                        height: vertScale(30),
                        marginLeft: horizScale(15)
                    }}>
                        <Text style={styles.userInfoId}>{allTransection.length - index}</Text>
                    </View>
                    <Text style={styles.normalText}>Paid : {item.paidRent}</Text>
                    <View style={{ height: 40, width: 2, backgroundColor: Colors.red, marginHorizontal: 20 }} />
                    <Text style={styles.normalText}>{item.dueRent > 0 ? `Due ${item.dueRent}` : "No Due"}</Text>
                    <TouchableOpacity
                        onPress={() => { setDueRentRecord(item), setIsVisible(true) }}
                        style={{ width: 100, alignItems: 'center', justifyContent: 'center', borderWidth: item.dueRent == 0?0:1 ,
                            borderColor: Colors.white, paddingVertical: item.dueRent==0?0:5,borderRadius:10
                        }}>
                      {item.dueRent == 0 ?  <Image source={item.dueRent == 0 ? CustomImage.verify : CustomImage.cross} style={{ height: horizScale(20), width: horizScale(20), tintColor: item.dueRent == 0 ? Colors.green : Colors.red }} />
                       : <Text style={[styles.cardInfo, { color: Colors.red,fontSize:fontSize.small }]}>Update Due</Text>}
                    </TouchableOpacity>
                </View>
                <Spacer height={10} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                    <Text style={styles.normalText2}>Start {item.month}</Text>
                    <Text style={styles.normalText2}>End {getNextMonthDate(item.month)}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={{
                height: vertScale(65), width: '100%',
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack('HomeScreen') }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center', margin: 20,
                    }}>
                    <Image source={CustomImage.back} style={{
                        height: 20, width: 20, tintColor: Colors.black,

                    }} />
                    <Text style={{ fontSize: fontSize.input, color: Colors.black, marginLeft: 10 }}>{room?.roomName ? room?.roomName : "Loading..."}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ paddingVertical: vertScale(2), height: vertScale(80), marginLeft: horizScale(20) }}>

                    <FlatList
                        data={room.beds}
                        renderItem={renderItemRoom2}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {
                    selectedItem?.seatAvailable ?
                        <Pressable style={styles.button} onPress={() => {
                            console.log("params from SingleRoomScreen=>", { ...selectedItem })
                            navigation.navigate('TenantProfileScreen', {...selectedItem });
                        }}>
                            <Text style={styles.buttonText}>Room available</Text>
                        </Pressable> :
                        selectedItem && tenantData && <View style={styles.roomContainer}>
                            <Text style={{ ...styles.cardTitle, marginLeft: horizScale(15) }}>{tenantData?.name ? tenantData.name : "Loading..."}</Text>
                            <Spacer height={10} />
                            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                                <Text style={{
                                    ...styles.cardInfo, borderBottomWidth: 2, borderBottomColor: totalDueRent > 0 ? Colors.red : Colors.green,
                                    fontWeight: totalDueRent > 0 ? '700' : '600',
                                    fontSize: totalDueRent > 0 ? fontSize.regular : fontSize.medium,
                                }}>Due Amount : {totalDueRent}</Text>
                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: horizScale(10),
                                    paddingVertical: horizScale(5),
                                    paddingHorizontal: horizScale(15),
                                    backgroundColor: Colors.green
                                }} onPress={() => {
                                    navigation.navigate('TenantProfileScreen', { tenant: tenantData })
                                }}>
                                    <Image source={CustomImage.verify} style={{
                                        height: horizScale(18), width: horizScale(18), tintColor: Colors.white, marginRight: horizScale(5)

                                    }} />
                                    <Text style={[styles.cardInfo, { color: Colors.white }]}>Update Tenant</Text>
                                </TouchableOpacity>
                            </View>
                            <Spacer height={10} />
                            <View style={{
                                alignItems: 'center', flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}>

                                <Text style={styles.cardInfo}>Monthly Rent : {tenantData.monthlyRent}</Text>
                                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => {
                                    Linking.openURL(`tel:${selectedItem.number}`)
                                }}>
                                    <Image source={CustomImage.call} style={{
                                        height: horizScale(18), width: horizScale(18), tintColor: Colors.black, marginRight: horizScale(5)

                                    }} />
                                    <Text style={styles.cardInfo}>{tenantData.mobile}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line} />
                            {newEntry && <>
                                <Text style={{ ...styles.cardTitle, marginLeft: horizScale(15) }}>Create new entry</Text>
                                <InputFilled
                                    type="Mobile"
                                    placeholder="Paid Rent"
                                    value={paidRent}
                                    onChangeText={text => setPaidRent(text)}
                                    icon={CustomImage.SecurityDeposit}
                                />

                                <Spacer height={20} />
                                <InputFilled
                                    type="Mobile"
                                    placeholder={"Due Rent"}
                                    value={dueRent}
                                    onChangeText={text => setDueRent(text)}
                                    icon={CustomImage.rent}
                                />
                                <Spacer height={20} />
                                <InputFilled
                                    type="Date"
                                    placeholder="Current Month"
                                    value={currentMonth}
                                    onChangeText={text => setCurrentMonth(text)}
                                    icon={CustomImage.calendar1}
                                />
                            </>}
                            <View style={styles.tableHeader}>
                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    borderRadius: horizScale(20),
                                    paddingVertical: horizScale(10),
                                    paddingHorizontal: horizScale(15),
                                    backgroundColor: Colors.yellow,
                                    flex: 0.4
                                }}
                                    onPress={() => {
                                        setShowHistory(!showHistory)
                                        // ToastMessage.WarningShowToast('Oo oo sorry,\n That feature Coming soon')
                                    }}>
                                    <Text style={[styles.cardInfo, { color: Colors.black, textAlign: 'center' }]}>{showHistory ? 'Hide History' : 'Show Transection'}</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    borderRadius: horizScale(20),
                                    paddingVertical: horizScale(10),
                                    paddingHorizontal: horizScale(15),
                                    backgroundColor: Colors.green,
                                    flex: 0.4
                                }}
                                    onPress={() => {
                                        if (newEntry) {
                                            Alert.alert("Update Transection", "Are you sure to Update Transection ?", [{
                                                text: 'YES',
                                                onPress: () => { addTransectionRecord() }
                                            }, {
                                                text: 'No',
                                                onPress: () => {
                                                    ToastMessage.WarningShowToast('Oo oo sorry...')
                                                }
                                            },
                                            ])
                                        } else {
                                            setNewEntry(!newEntry)
                                        }
                                    }}>
                                    <Text style={[styles.cardInfo, { color: Colors.white, textAlign: 'center' }]}>{newEntry ? "Done" : "New Entry"}</Text>
                                </TouchableOpacity> */}

                            </View>
                            {showHistory && <FlatList
                                data={allTransection}
                                renderItem={renderItemUserInfo}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                style={{ marginVertical: vertScale(20) }}
                                ListEmptyComponent={() => (
                                    <>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={CustomImage.no} style={{
                                                height: horizScale(120),
                                                width: horizScale(120),
                                            }} />
                                            <Text>No Record Available</Text>
                                        </View>
                                    </>
                                )}
                            />}
                        </View>
                }               
            </ScrollView>
            {dueClearModel()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: Colors.black,
        marginVertical: 20
    },
    button: {
        backgroundColor: Colors.green,
        borderRadius: normScale(60),
        // height: vertScale(60),
        width: '80%',
        // width: fullWidth - horizScale(80),/
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },

    normalText: {
        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.boldItalic
    },
    normalText2: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular
    },
    userInfoId: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.blackItalic,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: vertScale(28)
    },
    userInfoContainer: {
        marginVertical: vertScale(4),
        backgroundColor: Colors.white,
        borderRadius: horizScale(15),
        padding: 5,
        shadowColor: Colors.black,
        elevation: 7,
        marginHorizontal: horizScale(5),
        paddingVertical: vertScale(9)
    },
    availableText: {
        color: 'white'
    },
    roomContainer: {
        margin: 5,
    },
    roomContainer2: {
        margin: horizScale(5),
        minWidth: vertScale(60),
        height: vertScale(50),
        borderRadius: horizScale(5)
    },
    smallIcon: {
        width: vertScale(18),
        height: vertScale(18),
        position: 'absolute',
        marginTop: vertScale(-6),
        alignSelf: 'center',
        tintColor: Colors.black,
        borderWidth: horizScale(2),
        borderRadius: horizScale(18),
        borderColor: Colors.white
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
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
        textAlign: 'left',
        color: Colors.black
    },
    cardTitle2: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
        textAlignVertical: 'center',
        height: vertScale(50)
    },
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
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    }
});

export default SingleRoomScreen;
