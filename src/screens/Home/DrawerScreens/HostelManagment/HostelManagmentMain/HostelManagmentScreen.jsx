import { Alert, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import { useDispatch, useSelector } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import { apiService } from '../../../../../API_Services'
import { useIsFocused } from '@react-navigation/native'
const HostelManagmentScreen = ({ navigation }) => {
    const { loading } = useSelector(state => state.loader)
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const [hostels, setHostels] = useState([])
    const getData = async () => {
        dispatch(loaderAction(true))
        const response = await apiService.getHostels({ userId: userInfo._id })
        if (response) {
            dispatch(loaderAction(false))
            setHostels(response.data)
        }
    }
    const focus = useIsFocused()
    useEffect(() => {
        getData()
    }, [focus])
    const deleteHostel = async (id) => {
        dispatch(loaderAction(true))
        const response = await apiService.deleteHostel({ hostelId: id })
        if (response) {
            const data = await hostels?.filter(item => item._id !== id)
            setHostels(data)
            dispatch(loaderAction(false))
        }
    }
    const renderItem = ({ item, index }) => {
        return <Pressable style={styles.hostelContainer} onPress={() => navigation.navigate('HostelFloorManagment', {
            hostel: item
        })}>
            <View style={{ flex: 0.2, alignItems: 'center' }}>

                <Image source={item.icon || CustomImage.logo} style={styles.hostelImage} />
            </View>
            <View style={styles.hostelContainer2}>
                <Text style={styles.hostelName}>{item.hostelName}</Text>
                <Text numberOfLines={2} style={styles.hostelAddress}>{item.hostelAddress}</Text>
            </View>
            <Pressable style={styles.deleteButton} onPress={async () => {
                Alert.alert("Delete Hostel", "Are you sure to delete hostel ?", [{
                    text: 'YES',
                    onPress: () => { deleteHostel(item._id) }
                }, {
                    text: 'No',
                    onPress: () => {
                        ToastAndroid.showWithGravity('Hostel Delete Canceled...', ToastAndroid.TOP, ToastAndroid.SHORT)
                    }
                },
                ])

            }}>
                <Image source={CustomImage.bin} style={styles.deleteIcon} />
            </Pressable>
        </Pressable>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"My Hostels"} />
                <Pressable style={styles.buttonView} onPress={() => {
                    navigation.navigate('AddHostel')
                }}>
                    <Image source={CustomImage.plus} style={styles.smallLogo} />
                    <Text style={styles.appText}>Add</Text>
                </Pressable>
            </View>
            <Spacer height={30} />

            <FlatList
                data={hostels}
                renderItem={renderItem}
                ListEmptyComponent={() => {
                    return (
                        <>
                            {!loading && <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={CustomImage.no} style={{
                                    height: horizScale(120),
                                    width: horizScale(120),
                                }} />
                                <Text>Hostel Available</Text>
                            </View>}
                        </>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default HostelManagmentScreen

const styles = StyleSheet.create({
    hostelName: {
        color: Colors.black,
        fontSize: fontSize.input,
        fontFamily: fontFamily.bold
    },
    hostelAddress: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular
    },
    hostelContainer: {
        flexDirection: 'row',
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