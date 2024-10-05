import { FlatList, Image, Alert, Pressable, SafeAreaView, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import { useDispatch, useSelector } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import { useIsFocused } from '@react-navigation/native'
import { firebase_getAllDataFromTableById, firebase_removeDataToTable } from '../../../../../firebase_database'
import tableNames from '../../../../../firebase_database/constrains'

const HostelBedManagment = ({ navigation, route }) => {
    const { loading } = useSelector(state => state.loader)
    const dispatch = useDispatch()
    const { hostel, floor, room } = route.params
    const [bed, setBed] = useState([])
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getAllDataFromTableById(tableNames.bed, "roomId", room.id)
            if (response) {
                setBed(response)
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
    const deleteRoom = async (id) => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_removeDataToTable(tableNames.bed, id)
            if (response) {
                const data = await bed?.filter(item => item.id !== id)
                setBed(data)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const renderItem = ({ item, index }) => {
        return <Pressable style={styles.roomContainer} onPress={() => {
            navigation.navigate('TenantProfileScreen', {
               hostelData:{ hostel, floor, room, bed: item}
            })
        }}>
            <View style={styles.hostelContainer}>
                <View style={styles.hostelContainer2}>
                    <Text style={styles.hostelName}>{item.bedName}  <Text style={{ color: item.seatAvailable ? Colors.green : Colors.red, fontSize: fontSize.medium }}>{item.seatAvailable ? "Available" : "Filled"}</Text></Text>
                    <Text numberOfLines={2} style={styles.hostelAddress}>₹ {item.amont} </Text>
                </View>
                <Pressable style={styles.deleteButton}
                    onPress={async () => {
                        Alert.alert("Delete Bed", "Are you sure to delete Bed ?", [{
                            text: 'YES',
                            onPress: () => { deleteRoom(item.id) }
                        }, {
                            text: 'No',
                            onPress: () => {
                                ToastAndroid.showWithGravity('Bed Delete Canceled...', ToastAndroid.TOP, ToastAndroid.SHORT)
                            }
                        },
                        ])

                    }}
                >
                    <Image source={CustomImage.bin} style={styles.deleteIcon} />
                </Pressable>
            </View>

        </Pressable>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Beds In " + room.roomName} />
                <Pressable style={styles.buttonView} onPress={() => {
                    navigation.navigate('AddBed', {
                        room: room,
                        floor: floor
                    })
                }}>
                    <Image source={CustomImage.plus} style={styles.smallLogo} />
                    <Text style={styles.appText}>Add</Text>
                </Pressable>
            </View>
            <Spacer height={30} />

            <FlatList
                data={bed}
                renderItem={renderItem}
                ListEmptyComponent={() => {
                    return (
                        <>
                            {!loading && <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={CustomImage.no} style={{
                                    height: horizScale(120),
                                    width: horizScale(120),
                                }} />
                                <Text>Bed Available</Text>
                            </View>}
                        </>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default HostelBedManagment

const styles = StyleSheet.create({
    hostelName: {
        color: Colors.black,
        fontSize: fontSize.input,
        fontFamily: fontFamily.bold
    },
    normText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular,
        flex: 0.9,
        left: horizScale(70)
    },
    hostelAddress: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular
    },
    hostelContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    roomContainer: {

        alignItems: 'center',
        paddingVertical: vertScale(10),
        borderBottomWidth: horizScale(0.5),
    },
    hostelContainer2: {
        flex: 0.7,
        paddingHorizontal: horizScale(5)
    },
    deleteButton: {
        flex: 0.1,
        paddingHorizontal: horizScale(5)
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: horizScale(30),
        borderWidth: horizScale(0.8),
        borderColor: Colors.black,
        paddingHorizontal: horizScale(8),
        right: horizScale(20)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    smallLogo: {
        width: horizScale(12),
        height: horizScale(12),
        resizeMode: 'contain',
    },
    deleteIcon: {
        width: horizScale(18),
        height: horizScale(18),
        resizeMode: 'contain',
    },
    hostelImage: {
        width: horizScale(45),
        height: horizScale(45),
        resizeMode: 'contain',
    },
    appText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        marginLeft: normScale(8),
        fontFamily: fontFamily.regular
    },
})