import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout';

const SingleRoomScreen = ({ navigation }) => {

    const room = [
        {
            id: '1',
            name: 'Bad No 1',
            image: CustomImage.logo,
            address: 'Ajay Carpenter',
            price: '2400',
            number: '7000207121',
            due: 1,
            MED: "28"
        },
        {
            id: '2',
            name: 'Bad No 2',
            image: CustomImage.logo,
            address: 'Anuj bhati',
            price: '1900',
            number: '9876543210',
            MED: "16"
        },
        {
            id: '3',
            empty: true
        },
        {
            id: '4',
            name: 'Bad No 4',
            image: CustomImage.logo,
            address: 'Rohit Jat',
            price: '3000',
            number: '8959402332',
            due: 1,
            MED: "05"
        },
        // Add more cards as needed
    ];
    const UserInfo = [
        {
            id: '1',
            startDate: '28/03/2023',
            endDate: '27/04/2023',
            pendingAmmount: '0',

        },
        {
            id: '2',
            startDate: '28/04/2023',
            endDate: '27/05/2023',
            pendingAmmount: '0',
        },
        {
            id: '3',
            startDate: '28/05/2023',
            endDate: '27/06/2023',
            pendingAmmount: '500',
        },
        {
            id: '4',
            startDate: '28/06/2023',
            endDate: '27/07/2023',
            pendingAmmount: '5000',
        },
        // Add more cards as needed
    ];

    const [selected, setSelected] = useState(room[0].id)
    const [selectedItem, setSelectedItem] = useState(room[0])

    const renderItemRoom2 = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedItem(item)
                setSelected(item.id)
            }}
            style={{ ...styles.roomContainer2, backgroundColor: !item.empty ? item?.due == 1 ? Colors.green : Colors.red : Colors.yellow }}>
            {selected == item.id && <Image source={CustomImage.verify} style={styles.smallIcon} />}
            <Text style={styles.cardTitle2}>Seat {index + 1}</Text>

        </TouchableOpacity>
    );

    const renderItemUserInfo = ({ item }) => {
        return (
            <View style={styles.userInfoContainer} >
                <Spacer height={10} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{
                        borderRadius: horizScale(20),
                        borderWidth: horizScale(1),
                        borderColor: Colors.theme,
                        width: vertScale(30),
                        height: vertScale(30),
                        marginLeft: horizScale(15)
                    }}>

                        <Text style={styles.userInfoId}>{item.id}</Text>
                    </View>
                    <Text style={styles.normalText}>{item.pendingAmmount > 0 ? `Due ${item.pendingAmmount}` : "No Due"}</Text>
                    <TouchableOpacity
                        onPress={() => { alert('Coming soon') }}
                        style={{ width: 100, alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={item.pendingAmmount == 0 ? CustomImage.verify : CustomImage.cross} style={{ height: horizScale(20), width: horizScale(20), tintColor: item.pendingAmmount == 0 ? Colors.green : Colors.red }} />
                    </TouchableOpacity>
                </View>
                <Spacer height={10} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                    <Text style={styles.normalText2}>Start {item.startDate}</Text>
                    <Text style={styles.normalText2}>End {item.endDate}</Text>
                </View>
                <Spacer height={10} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

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
                    <Text style={{ fontSize: fontSize.input, color: Colors.black, marginLeft: 10 }}>1st Floor Room</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ paddingVertical: vertScale(2), height: vertScale(120), marginLeft: horizScale(20) }}>

                    <FlatList
                        data={room}
                        renderItem={renderItemRoom2}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {selectedItem.empty ?
                    <TouchableOpacity style={styles.button} onPress={() => {
                        alert('allocation of room cooming soon')
                    }}>

                        <Text style={styles.buttonText}>Room available</Text>
                    </TouchableOpacity> :
                    <View style={styles.roomContainer}>
                        <Text style={{ ...styles.cardTitle, marginLeft: horizScale(15) }}>{selectedItem.address}</Text>
                        <Spacer height={10} />
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <Text style={styles.cardInfo}>Due Ammount : {selectedItem.price}</Text>
                            <TouchableOpacity style={{
                                alignItems: 'center', flexDirection: 'row',
                                borderWidth: horizScale(1),
                                borderRadius: horizScale(10),
                                padding: horizScale(3)
                            }} onPress={() => {
                                navigation.navigate('TenantProfileScreen')
                            }}>
                                <Image source={CustomImage.verify} style={{
                                    height: horizScale(18), width: horizScale(18), tintColor: Colors.black, marginRight: horizScale(5)

                                }} />
                                <Text style={styles.cardInfo}>UPDATE</Text>
                            </TouchableOpacity>
                        </View>
                        <Spacer height={10} />
                        <View style={{
                            alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>

                            <Text style={styles.cardInfo}>Month End Date : {selectedItem.MED}</Text>
                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => {
                                Linking.openURL(`tel:${selectedItem.number}`)
                            }}>
                                <Image source={CustomImage.call} style={{
                                    height: horizScale(18), width: horizScale(18), tintColor: Colors.black, marginRight: horizScale(5)

                                }} />
                                <Text style={styles.cardInfo}>{selectedItem.number}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}

                {!selectedItem.empty && <FlatList
                    data={UserInfo.reverse()}
                    renderItem={renderItemUserInfo}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        marginVertical: vertScale(9),
        // flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: horizScale(15),
        padding: 5,
        shadowColor: Colors.black,
        elevation: 10,
        marginHorizontal: horizScale(5)
    },
    availableText: {
        color: 'white'
    },
    roomContainer: {
        margin: 5,
    },
    roomContainer2: {
        margin: horizScale(5),
        width: vertScale(50),
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
});

export default SingleRoomScreen;
