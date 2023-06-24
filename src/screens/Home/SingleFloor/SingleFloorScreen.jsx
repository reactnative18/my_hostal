import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontSize } from '../../../util/Fonts';

const SingleFloorScreen = ({ navigation }) => {

    const room = [
        {
            id: '1',
            name: 'No 1',
            image: CustomImage.logo,
            address: 'Avai. Bad 1',
            price: '50',
            number: '1234567890',
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 1 }, { username: 'raja', seetNo: 2, rent: 0 }, { seetNo: 3 }]
        },
        {
            id: '2',
            name: 'No 2',
            image: CustomImage.logo,
            address: 'Avai. Bad 2',
            price: '80',
            number: '9876543210',
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 1 }, { username: 'raja', seetNo: 2, rent: 0 }, { seetNo: 3 }]
        },
        {
            id: '3',
            name: 'No 3',
            image: CustomImage.logo,
            address: 'Avai. Bad 1',
            price: '60',
            number: '1234598760',
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 1 }, { username: 'raja', seetNo: 2, rent: 0 }, { seetNo: 3 }]
        },
        {
            id: '4',
            name: 'No 4',
            image: CustomImage.logo,
            address: 'Avai. Bad 0',
            price: '60',
            number: '1234598760',
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 'Clear' }, { username: 'raja', seetNo: 2, rent: 'Due' }, { seetNo: 3 }]
        },
        // Add more cards as needed
    ];


    const renderItemRoom = ({ item }) => (
        <TouchableOpacity style={styles.roomContainer} onPress={() => {
            navigation.navigate('SingleRoomScreen')
        }}>

            <View style={{ flex: 0.5 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>

                {item?.roominfo?.map((item, index) => (<Text numberOfLines={2} style={{ ...styles.userName, backgroundColor: item?.username ? Colors.green : Colors.red }}>{item?.username ? item?.username : `Seet No. ${item.seetNo}`}</Text>))}
            </View>
            <View style={{ flex: 0.5 }}>
                <Text style={styles.cardTitle}></Text>
                {item?.roominfo?.map((item, index) => (
                    <>
                        {item.username ? <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={item?.rent == 1 ? CustomImage.check : CustomImage.clock} style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: item?.rent == 0 ? Colors.red : null }} />
                            <Text numberOfLines={2} style={{ ...styles.userName, color: Colors.black, marginLeft: 8 }}>{item?.rent == 1 ? 'Clear' : 'Due'}</Text>
                        </View> : <View style={{ height: 55 }}></View>}
                    </>
                ))}

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{
                height: 70, width: '100%', flex: 0.1
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
                    <Text style={{ fontSize: fontSize.input, color: Colors.black, marginLeft: 10 }}>1st Floor Rooms</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={room}
                    renderItem={renderItemRoom}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    roomContainer: {

        borderWidth: 0.8,
        borderRadius: 15,
        marginVertical: 5,
        padding: 15,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        // alignItems: 'center's
    },
    card: {

        padding: 10,
        borderWidth: 0.8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 5
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.black
    },
    userName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
        borderRadius: 10,
        margin: 3,
        minHeight: 50,
        textAlignVertical: 'center'
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
        width: 90,
        color: Colors.black
    },
});

export default SingleFloorScreen;
