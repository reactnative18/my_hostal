import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { horizScale, vertScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

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
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 1 }, { username: 'raja', seetNo: 2, rent: 0 }]
        },
        {
            id: '3',
            name: 'No 3',
            image: CustomImage.logo,
            address: 'Avai. Bad 1',
            price: '60',
            number: '1234598760',
            roominfo: [{ username: 'Asutosh shing tomer', seetNo: 1, rent: 1 }, { seetNo: 3 }]
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


    const renderItemRoom = ({ item }) => {
        let length = item?.roominfo?.length ? item?.roominfo?.length : 1
        return (
            <Pressable style={styles.roomContainer} onPress={() => {
                navigation.navigate('SingleRoomScreen')
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {item?.roominfo?.map((item, index) => (
                        <View style={{
                            ...styles.subSeater,
                            flex: 10 / length, backgroundColor: item?.username ? Colors.greylight : Colors.yellow
                        }}>
                            {item?.username && <Image source={item?.rent == 1 ? CustomImage.verify : CustomImage.cross} style={{ ...styles.smallIcon, tintColor: item?.rent == 1 ? Colors.green : Colors.red }} />}
                            <Text numberOfLines={2} style={{ ...styles.userName, }}>{item?.username ? item?.username : `Seet No. ${item.seetNo}`}</Text>
                        </View>
                    ))}

                </View>
            </Pressable>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subSeater: {
        backgroundColor: Colors.lightsky,
        elevation: 2,
        borderRadius: horizScale(7),
        marginHorizontal: horizScale(2),
        minHeight: vertScale(40),
    },
    roomContainer: {

        borderRadius: 15,
        marginVertical: 5,
        padding: 15,
        width: '100%',
        backgroundColor: Colors.white,
        elevation: 2,
        alignSelf: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        paddingHorizontal: horizScale(5),
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
    smallIcon: {
        width: horizScale(16),
        height: horizScale(16),
        borderRadius: horizScale(8),
        position: 'absolute',
        marginTop: vertScale(-7),
        right: horizScale(-1)
    },
    cardTitle: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
        textAlign: 'left',
        color: Colors.black
    },
    userName: {
        fontSize: fontSize.medium,
        textAlign: 'center',
        color: Colors.black,
        textAlignVertical: 'center',
        minHeight: vertScale(40),
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
