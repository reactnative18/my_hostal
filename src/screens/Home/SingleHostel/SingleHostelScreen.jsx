import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontSize } from '../../../util/Fonts';

const SingleHostelScreen = ({ navigation }) => {
    const cards = [
        {
            id: '1',
            name: 'First Floor',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            totalBeds: 'Total Bads 12',
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
            totalBeds: 'Total Bads 12',
        },
        {
            id: '3',
            name: 'Third Floor',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$60',
            number: '1234598760',
            totalBeds: 'Total Bads 12',
        },
        {
            id: '4',
            name: 'Forth Floor',
            image: CustomImage.logo,
            address: 'Available Bads 3',
            price: '$60',
            totalBeds: 'Total Bads 12',
            number: '1234598760',
        },
        // Add more cards as needed
    ];


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('SingleFloorScreen')
            }}
            style={{ ...styles.card, borderColor: item.active ? 'green' : 'black', borderWidth: item.active ? 3 : 0.8 }}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>{item.totalBeds}</Text>
            <Text style={styles.cardInfo}>{item.address}</Text>
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
                    <Text style={{ fontSize: fontSize.input, color: Colors.black, marginLeft: 10 }}>Hostel Floor</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={cards}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
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
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        // alignItems: 'center's
    },
    card: {

        padding: 10,
        borderWidth: 0.8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        margin: 10,
        width: '45%'

    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.black
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,

        color: Colors.black
    },
});

export default SingleHostelScreen;
