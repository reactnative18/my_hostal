import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import CustomImage from '../../../util/Images';
import fontSize from '../../../util/Fonts';
import { Colors } from '../../../util/Colors';
const AllocateBedScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [location, setLocation] = useState('');

    const handleSave = () => {
        // Perform the save action here
        console.log('Room Allocation Info Saved');
    };

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: Colors.blue, height: 70, width: '100%',
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack('HomeScreen') }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center', margin: 20,
                    }}>
                    <Image source={CustomImage.back} style={{
                        height: 20, width: 20, tintColor: Colors.white,

                    }} />
                    <Text style={{ fontSize: fontSize.input, color: Colors.white, marginLeft: 10 }}>Back to home</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.heading}>Room Allocation Information</Text>

            <TouchableOpacity style={styles.userInfoContainer} disabled>
                <View style={styles.rowList}>

                    <Text style={styles.boldText}>Name: {item.hostelName}</Text>
                    <Text style={styles.regulerText}>Floor No: {item.floorNo}</Text>
                </View>
                <View style={styles.rowList}>

                    <Text style={styles.regulerText}>Room No: {item.roomNo}</Text>
                    <Text style={styles.regulerText}>Bed No: {item.bedNo}</Text>

                </View>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>User name:</Text>
                <TextInput
                    style={styles.input}
                    value={roomNumber}
                    onChangeText={setRoomNumber}
                    placeholder="Enter user name"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Mobile number:</Text>
                <TextInput
                    style={styles.input}
                    value={capacity}
                    onChangeText={setCapacity}
                    placeholder="Enter mobile number"
                    keyboardType="numeric"
                />
            </View>


            <View style={styles.infoContainer}>
                <Text style={styles.label}>User Address:</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
                />
            </View>
            <Button title="Save" onPress={handleSave} />
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
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 20,

        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 40,

    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
    },
});

export default AllocateBedScreen;
