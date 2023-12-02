import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import HeaderView from '../../../Components/HeaderView';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { loaderAction } from '../../../redux/Actions/UserAction';
import { apiService } from '../../../API_Services';
const AvailableRoomScreen = ({ navigation }) => {

    const UserInfo = [
        {
            id: '1',
            hostelName: 'Ap 1',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02'

        },
        {
            id: '2',
            hostelName: 'Ap 3',
            floorNo: '02',
            roomNo: '102',
            bedNo: '03'
        },
        {
            id: '3',
            hostelName: 'Ap 4',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02'
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
        const response = await apiService.getAvailableRoom({ userId: userInfo?._id, "seatAvailible": true })
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

    const [search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => (
        <TouchableOpacity style={styles.userInfoContainer} disabled>
            <View style={styles.rowList}>

                <Text style={styles.boldText}>{item.hostelName}</Text>
                <Text style={styles.regulerText}>{item.floorName}</Text>
            </View>
            <View style={styles.rowList}>

                <Text style={styles.regulerText}>{item.roomName}</Text>
                <Text style={styles.regulerText}>{item.bedName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        let hostel = {
                            _id: item.hostelId
                        }
                        let floor = {
                            _id: item.floorId
                        }
                        let room = {
                            _id: item.roomId
                        }
                        let bed = {
                            _id: item._id
                        }
                        console.log(item)
                        navigation.navigate('TenantProfileScreen', { hostel, floor, room, bed })
                    }}
                    style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.green, paddingVertical: 4, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Allocate</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderView navigation={navigation} />


            <FlatList
                ListHeaderComponent={() => (

                    <TextInput
                        style={styles.search}
                        placeholder='Search Here ...'
                        placeholderTextColor={Colors.black}
                        onChangeText={(value) => {
                            setSearch(value)
                        }}
                    />
                )}
                ListFooterComponent={() => (
                    <Spacer height={55} />
                )}
                data={seat}
                renderItem={renderItemUserInfo}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}

            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        marginBottom: 10,

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

export default AvailableRoomScreen;
