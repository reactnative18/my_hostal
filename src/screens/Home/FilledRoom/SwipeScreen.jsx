
import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, StyleSheet, Image,
    TouchableOpacity, ScrollView, Alert, ToastAndroid,
    TextInput,
    Pressable,
    SafeAreaView
} from 'react-native';
import { Colors } from '../../../util/Colors';
import HeaderView from '../../../Components/HeaderView';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import BackButton from '../../../Components/BackButton/BackButton';
import { fontFamily, fontSize } from '../../../util/Fonts';
import CustomImage from '../../../util/Images';
import { useDispatch, useSelector } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
import { fetchAllAvailableBeds, firebase_swipeBeds } from '../../../firebase_database';
import { useIsFocused } from '@react-navigation/native';
import ToastMessage from '../../../Components/ToastMessage';

const SwipeScreen = ({ navigation, route }) => {
    const { tenantData } = route?.params;
    const [selectUser, setSelectUser] = useState({})
    const [Search, setSearch] = useState('')
    const [seat, setSeat] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await fetchAllAvailableBeds(false)
            if (response) {
                console.log("FilledRoomScreen=>", response)
                setSeat(response)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    const swipeTenants= async()=>{
        try {
          const res=await  firebase_swipeBeds(tenantData, selectUser)
          if(res){
              navigation.replace("HomeDrawer")
              ToastMessage.successShowToast("Swiped successfully...")
          }
        } catch (error) {
            
        }
    }
    const isFocus = useIsFocused()
    useEffect(() => {
        getData()
    }, [isFocus])

    const renderItemUserInfo = ({ item }) => {
        if (tenantData.tenantId == item.tenantId) {
            return
        }
        return (
            <TouchableOpacity style={styles.userInfoContainer} disabled>
                <View style={styles.rowList}>

                    <Text style={styles.boldText}>Name: {item.hostelName}</Text>
                    <Text style={styles.regulerText}>Floor No: {item.floorName}</Text>
                </View>
                <View style={styles.rowList}>

                    <Text style={styles.regulerText}>Room No: {item.roomName}</Text>
                    <Text style={styles.regulerText}>Bed No: {item.bedName}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectUser(item)
                        }}
                        style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6F00', paddingVertical: 4, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Select User</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
       

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Swipe Users'} />

            <FlatList
                data={seat}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Spacer height={20} />
                            {tenantData != null ? <View style={styles.headerView}>
                                <Text style={{
                                    ...styles.swipeUser,
                                    borderWidth: tenantData?.tenantId ? horizScale(0.8) : 0,
                                }}> {tenantData.name} </Text>
                                <Pressable onPress={() => {
                                    if (selectUser.tenantId && tenantData.tenantId) {
                                        Alert.alert("Swipe", "Are you sure to swipe user in your hostel ?", [{
                                            text: 'YES',
                                            onPress: () => { swipeTenants() }
                                        }, {
                                            text: 'No',
                                            onPress: () => { ToastMessage.successShowToast('Thank you :)') }
                                        }
                                        ])
                                    } else {
                                        ToastMessage.WarningShowToast('Please select second person to swipe...')
                                    }
                                }}>
                                    <Image source={CustomImage.swipe} />
                                </Pressable>
                                <Text style={{
                                    ...styles.swipeUser,
                                    borderWidth: selectUser?.id ? horizScale(0.8) : 0,
                                }}> {selectUser?.name} </Text>
                            </View> : null}
                            <Spacer height={20} />
                            <TextInput
                                style={styles.search}
                                placeholder='Search Here ...'
                                placeholderTextColor={Colors.black}
                                onChangeText={(value) => {
                                    setSearch(value)
                                }}
                            />
                        </View>
                    )
                }}

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
                        <Text>No Beds available...</Text>
                    </View>)
                }}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    swipeUser: {

        borderRadius: horizScale(10),
        paddingHorizontal: horizScale(5),
        paddingVertical: vertScale(5),
        minWidth: horizScale(100),
        color: Colors.black,
        fontSize: fontSize.small,
        letterSpacing: normScale(0.9),
        fontFamily: fontFamily.bold,
        backgroundColor: Colors.white,
        elevation: 8,
        textAlign: 'center'

    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: horizScale(20)
    },
    button2: {
        backgroundColor: Colors.black,
        borderRadius: normScale(60),
        // height: vertScale(60),
        width: '40%',
        // width: fullWidth - horizScale(80),/
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(7),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: vertScale(10)
    },
    buttonText2: {
        color: Colors.black,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    search: {
        height: 60,
        marginVertical: 15,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 8,
        backgroundColor: Colors.white,
        fontSize: 17,
        paddingHorizontal: 20,
        fontWeight: '700',
        color: Colors.black
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
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
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

export default SwipeScreen;
