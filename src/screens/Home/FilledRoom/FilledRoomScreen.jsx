
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ToastAndroid } from 'react-native';

const FilledRoomScreen = ({ navigation }) => {


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
                        Alert.alert("Remove", "Are you sure to remove this user from your hostel ?", [{
                            text: 'YES',
                            onPress: () => { ToastAndroid.showWithGravity('Coming soon', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }, {
                            text: 'No',
                            onPress: () => { ToastAndroid.showWithGravity('Thank you :)', ToastAndroid.SHORT, ToastAndroid.BOTTOM) }
                        }
                        ])
                    }}
                    style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6F00', paddingVertical: 4, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Remove User</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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

export default FilledRoomScreen;
