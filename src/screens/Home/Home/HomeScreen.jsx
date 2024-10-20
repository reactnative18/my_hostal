import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import CustomImage from '../../../util/Images';
import HeaderView from '../../../Components/HeaderView';
import { Colors } from '../../../util/Colors';
import { Spacer, horizScale, vertScale } from '../../../util/Layout';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
import { useIsFocused } from '@react-navigation/native';
import { firebase_getAllDataFromTable, getAllHostelData } from '../../../firebase_database';
import tableNames from '../../../firebase_database/constrains';
import useCheckRentOncePerDay from '../../../firebase_database/AutoEntries';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const [hostels, setHostels] = useState([])
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await getAllHostelData(userInfo.id)
            if (response?.length > 0) {
                setHostels(response)
            }
        } catch (error) {
            
        }
        finally{

            dispatch(loaderAction(false))
        }
       
    }
    const { loading } = useSelector(state => state.loader)
    const focus = useIsFocused()
    useCheckRentOncePerDay(userInfo.id)
    useEffect(() => {
        getData()
    }, [focus])
    const renderItem = ({ item, index }) => {
        if (item.userId == userInfo.id || item.userId == userInfo?.subId) {
            return (
                <TouchableOpacity style={styles.hostelItem} onPress={() => {
                    navigation.navigate('SingleHostelScreen', { hostel: item })
                }}>
                    <Image source={item?.image || CustomImage.logo} style={styles.hostelImage} />
                    <View style={{ paddingHorizontal: 10, flex: 1 }}>

                        <Text style={styles.hostelName}>{item.hostelName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={styles.normalText}>Collection {item.totalPaidRent}</Text>
                            <View style={{ height: 30, width: 2, backgroundColor: Colors.red, marginHorizontal: 20 }} />
                            <Text style={styles.normalText}>Dues {item.totalDueRent}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ ...styles.hostelLocation, flex: item?.availableRoom ? 0.6 : 0.8 }}>{item.hostelAddress}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.theme} barStyle={'light-content'} />

            <HeaderView navigation={navigation} />

            <FlatList
                data={hostels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (<Spacer height={50} />)}
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
           {hostels.length>0 && <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('TenantProfileScreen')
            }}>
                <Image source={CustomImage.add} style={{
                    tintColor: Colors.theme,
                    resizeMode: 'contain',
                    height: horizScale(50), width: horizScale(50)
                }} />
            </TouchableOpacity>}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    normalText: {
        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.boldItalic
    },
    button: {
        position: 'absolute',
        right: horizScale(20),
        bottom: vertScale(105)
    },
    container: {
        flex: 1,
        // backgroundColor: Colors.theme
        overflow: 'hidden'
    },
    listContainer: {
        paddingVertical: vertScale(10),
        paddingHorizontal: horizScale(5),
    },
    hostelItem: {
        marginVertical: vertScale(4),
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: horizScale(15),
        padding: 5,
        shadowColor: Colors.black,
        alignItems: 'center',
        elevation: 7,
    },
    hostelImage: {
        width: horizScale(70),
        height: horizScale(70),
        borderRadius: horizScale(70),
    },
    hostelName: {
        flex: 0.2,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.black,
        color: Colors.black
    },
    hostelLocation: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular,
        color: Colors.darkgrey2,
    },
});

export default HomeScreen;
