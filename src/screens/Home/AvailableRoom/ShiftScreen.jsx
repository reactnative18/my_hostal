import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import HeaderView from '../../../Components/HeaderView';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';
import BackButton from '../../../Components/BackButton/BackButton';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import { fetchAllAvailableBeds, firebase_shiftBeds } from '../../../firebase_database';
import ToastMessage from '../../../Components/ToastMessage';

const ShiftScreen = ({ navigation, route }) => {

    const { tenantData } = route?.params;
    const [BedList, setBedList] = useState([])
    const getAllBeds = async () => {
        const response = await fetchAllAvailableBeds(true)
        if (response) {
            console.log("getAllBeds=>", response)
            const bedList = response.filter(u => u.seatAvailable == true);
            setBedList(bedList)
        }
    }
    useEffect(() => {
        getAllBeds()
    }, [])
    const tenantShift = async () => {
        if (Shift==null){
            ToastMessage.WarningShowToast("Please select a bed first...")
            return
        }
        const res = await firebase_shiftBeds(tenantData, Shift)
        if (res) {
            navigation.replace("HomeDrawer")
            ToastMessage.successShowToast("Shifted successfully...")
        }
    }
    const [Shift, setShift] = useState(null)
    const [search, setSearch] = useState('')
    const renderItemUserInfo = ({ item }) => {
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
                            if (tenantData.tenantId != null) {
                                setShift(Shift != null ? null : item)
                            } else {

                                navigation.navigate('TenantProfileScreen', { item })
                            }
                        }}
                        style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Shift?.id == item?.id ? Colors.red : Colors.green, paddingVertical: 4, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>{Shift?.id == item?.id ? 'Allocated' : 'Allocate'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
        

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={10} />
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <BackButton navigation={navigation} text={"Back"} />
            <FlatList
                ListHeaderComponent={() => (
                    <View>
                        {tenantData.tenantId != null ? <View style={styles.headerView}>
                            <Text style={{ ...styles.buttonText2, marginLeft: horizScale(15) }}>Shift : {tenantData.name} </Text>
                            <Pressable onPress={() => { tenantShift() }} style={{
                                ...styles.button2,
                                marginRight: horizScale(15),
                                backgroundColor: Colors.white,
                                width: '30%',
                                borderWidth: horizScale(0.8)
                            }}>
                                <Text style={styles.buttonText2}>Save</Text>
                            </Pressable>
                        </View> : null}
                        <TextInput
                            style={styles.search}
                            placeholder='Search Here ...'
                            placeholderTextColor={Colors.black}
                            onChangeText={(value) => {
                                setSearch(value)
                            }}
                        />
                    </View>
                )}
                ListFooterComponent={() => (
                    <Spacer height={55} />
                )}
                data={BedList}
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

export default ShiftScreen;
