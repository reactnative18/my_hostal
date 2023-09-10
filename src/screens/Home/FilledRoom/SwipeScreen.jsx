
import React, { useState } from 'react';
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

const SwipeScreen = ({ navigation, route }) => {

    const userID = route?.params?.userID;

    const UserInfo = [
        {
            id: '1',
            hostelName: 'Ap 1',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02',
            name: 'raja'

        },
        {
            id: '2',
            hostelName: 'Ap 3',
            floorNo: '02',
            roomNo: '102',
            bedNo: '03',
            name: 'raja'
        },
        {
            id: '3',
            hostelName: 'Ap 4',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02',
            name: 'raja'
        },
        {
            id: '4',
            hostelName: 'Ap 2',
            floorNo: '02',
            roomNo: '203',
            bedNo: '02',
            name: 'raja'
        },
        // Add more cards as needed
    ];
    const [selectUser, setSelectUser] = useState({})

    const [Search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => (
        <TouchableOpacity style={styles.userInfoContainer} disabled>
            <View style={styles.rowList}>

                <Text style={styles.boldText}>Name: {item.hostelName}</Text>
                <Text style={styles.regulerText}>Floor No: {item.floorNo}</Text>
            </View>
            <View style={styles.rowList}>

                <Text style={styles.regulerText}>Room No: {item.roomNo}</Text>
                <Text style={styles.regulerText}>Bed No: {item.bedNo}</Text>
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

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Swipe Users'} />

            <FlatList
                data={UserInfo}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Spacer height={20} />
                            {userID != null ? <View style={styles.headerView}>
                                <Text style={{
                                    ...styles.swipeUser,
                                    borderWidth: userID ? horizScale(0.8) : 0,
                                }}> Rohit </Text>
                                <Pressable onPress={() => {
                                    if (selectUser.id && userID) {

                                        Alert.alert("Swipe", "Are you sure to swipe user in your hostel ?", [{
                                            text: 'YES',
                                            onPress: () => { ToastAndroid.showWithGravity('Coming soon', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                                        }, {
                                            text: 'No',
                                            onPress: () => { ToastAndroid.showWithGravity('Thank you :)', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                                        }
                                        ])
                                    } else {
                                        ToastAndroid.showWithGravity('Please select second person to swipe...', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
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
