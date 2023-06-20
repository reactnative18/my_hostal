import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';

const HomeScreen = ({ navigation }) => {
    const hostels = [
        {
            id: '1',
            name: 'Ap 1',
            location: 'City A',
            image: CustomImage.logo,
            availableRoom: 3,
            category: 'Boys'
        },
        {
            id: '2',
            name: 'AP 2 ',
            location: 'City B',
            image: CustomImage.logo,
            availableRoom: 12,
            category: 'Girls'
        },
        {
            id: '3',
            name: 'Hostel C',
            location: 'City C',
            image: CustomImage.logo,
            availableRoom: 7,
            category: 'Boys'
        },
        {
            id: '3',
            name: 'AP 3',
            location: 'Bholaram indore',
            image: CustomImage.logo,
            availableRoom: 5,
            category: 'Boys'
        },
        // Add more hostels as needed
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.hostelItem} onPress={() => {
            navigation.navigate('SingleHostelScreen')
        }}>
            <Image source={item.image} style={styles.hostelImage} />
            <View style={{ paddingHorizontal: 10 }}>

                <Text style={styles.hostelName}>Name: {item.name}</Text>
                <Text style={styles.hostelLocation}>Address: {item.location}</Text>
                <Text style={styles.hostelLocation}>Total available room: {item.availableRoom}</Text>
                <Text style={styles.hostelLocation}>Category: {item.category}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={hostels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    hostelItem: {
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        elevation: 8
    },
    hostelImage: {
        width: 130,
        height: 130,
        borderRadius: 5,
    },
    hostelName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    hostelLocation: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;
