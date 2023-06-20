import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import fontSize from '../../../util/Fonts';

const SingleHostelScreen = ({ navigation }) => {
    const cards = [
        {
            id: '1',
            name: 'Floor 1',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$50',
            number: '1234567890',
        },
        {
            id: '2',
            name: 'Floor 2',
            image: CustomImage.logo,
            address: 'Available Bads 4',
            price: '$80',
            number: '9876543210',
        },
        {
            id: '3',
            name: 'Floor 3',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$60',
            number: '1234598760',
        },
        {
            id: '4',
            name: 'Floor 4',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$60',
            number: '1234598760',
        },
        // Add more cards as needed
    ];
    const room = [
        {
            id: '1',
            name: 'Room No 1',
            image: CustomImage.logo,
            address: 'Available Bad 1',
            price: '$50',
            number: '1234567890',
        },
        {
            id: '2',
            name: 'Room No 2',
            image: CustomImage.logo,
            address: 'Available Bad 2',
            price: '$80',
            number: '9876543210',
        },
        {
            id: '3',
            name: 'Room No 3',
            image: CustomImage.logo,
            address: 'Available Bad 1',
            price: '$60',
            number: '1234598760',
        },
        {
            id: '4',
            name: 'Room No 4',
            image: CustomImage.logo,
            address: 'Available Bad 0',
            price: '$60',
            number: '1234598760',
        },
        // Add more cards as needed
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>{item.address}</Text>
        </TouchableOpacity>
    );
    const renderItemRoom = ({ item }) => (
        <TouchableOpacity style={styles.roomContainer} onPress={() => {
            navigation.navigate('SingleRoomScreen')
        }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>{item.address}</Text>
            <Text style={styles.cardInfo}>Bad Price: {item.price}</Text>
            <Text style={styles.cardInfo}>Number: {item.number}</Text>
        </TouchableOpacity>
    );

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
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
            <FlatList
                data={room}
                renderItem={renderItemRoom}
                keyExtractor={item => item.id}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    roomContainer: {
        width: '47%',
        borderWidth: 0.8,
        margin: 5
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    card: {
        width: 80,
        padding: 10,
        borderWidth: 0.8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5
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
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default SingleHostelScreen;
