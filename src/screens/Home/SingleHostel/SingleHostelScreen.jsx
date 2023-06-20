import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import fontSize from '../../../util/Fonts';

const SingleHostelScreen = ({ navigation }) => {
    const cards = [
        {
            id: '1',
            name: 'First Floor',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$50',
            number: '1234567890',
            active: true
        },
        {
            id: '2',
            name: 'Second Floor',
            image: CustomImage.logo,
            address: 'Available Bads 4',
            price: '$80',
            number: '9876543210',
        },
        {
            id: '3',
            name: 'Third Floor',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$60',
            number: '1234598760',
        },
        {
            id: '4',
            name: 'Forth Floor',
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
            address: 'Avai. Bad 1',
            price: '50',
            number: '1234567890',
        },
        {
            id: '2',
            name: 'Room No 2',
            image: CustomImage.logo,
            address: 'Avai. Bad 2',
            price: '80',
            number: '9876543210',
        },
        {
            id: '3',
            name: 'Room No 3',
            image: CustomImage.logo,
            address: 'Avai. Bad 1',
            price: '60',
            number: '1234598760',
        },
        {
            id: '4',
            name: 'Room No 4',
            image: CustomImage.logo,
            address: 'Avai. Bad 0',
            price: '60',
            number: '1234598760',
        },
        // Add more cards as needed
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ ...styles.card, borderColor: item.active ? 'green' : 'black', borderWidth: item.active ? 3 : 0.8 }}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>{item.address}</Text>
        </TouchableOpacity>
    );
    const renderItemRoom = ({ item }) => (
        <TouchableOpacity style={styles.roomContainer} onPress={() => {
            navigation.navigate('SingleRoomScreen')
        }}>
            <View>

                <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
            <View>

                <Text style={styles.cardInfo}>{item.address}</Text>
                <Text style={styles.cardInfo}>₹ : {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: Colors.blue, height: 70, width: '100%', flex: 0.1
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
            <View style={{ flex: 0.9 }}>
                <View style={{ flex: 0.3, marginVertical: 20 }}>

                    <FlatList
                        data={cards}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
                <View style={{ flex: 0.7, paddingVertical: 20 }}>

                    <FlatList
                        data={room}
                        renderItem={renderItemRoom}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
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
        alignItems: 'center'
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
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
        width: 90
    },
});

export default SingleHostelScreen;
