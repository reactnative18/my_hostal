import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontSize } from '../../../util/Fonts';
import HeaderView from '../../../Components/HeaderView';

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

    const [search, setSearch] = useState('')
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
                        navigation.navigate('AllocateBedScreen', { item })
                    }}
                    style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', paddingVertical: 4, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Allocate</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <HeaderView navigation={navigation} />
            <TextInput
                style={styles.search}
                placeholder='Search Here ...'
                placeholderTextColor={Colors.black}
                onChangeText={(value) => {
                    setSearch(value)
                }}
            />
            <FlatList
                data={UserInfo}
                renderItem={renderItemUserInfo}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}

            />
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 10
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
