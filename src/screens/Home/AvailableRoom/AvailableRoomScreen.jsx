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
import { fetchAllAvailableBeds } from '../../../firebase_database';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
const AvailableRoomScreen = ({ navigation }) => {
    const [seat, setSeat] = useState([])
    const { userInfo } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await fetchAllAvailableBeds(true)
            if (response) {
                const availableRoomList = response.filter(u => u.userId === userInfo.id);
                setSeat(availableRoomList)
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

    const [search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => (
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
                        console.log("params from AvailableRoomScreen=>",item)
                        navigation.navigate('TenantProfileScreen', item)
                    }}
                    style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.green, paddingVertical: 4, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Allocate</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.theme} barStyle={'light-content'} />

            <HeaderView navigation={navigation} />


            <FlatList 
                ListFooterComponent={() => (
                    <Spacer height={55} />
                )}
                data={seat}
                renderItem={renderItemUserInfo}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                    return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={CustomImage.no} style={{
                            height: horizScale(120),
                            width: horizScale(120),
                        }} />
                        <Text>No Available Beds...</Text>
                    </View>)
                }}
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
