import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontSize } from '../../../util/Fonts';
import BackButton from '../../../Components/BackButton/BackButton';
import { Spacer, horizScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

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
            style={{ ...styles.card, borderColor: Colors.black }}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={{ marginLeft: horizScale(10) }}>

                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardInfo}>{item.totalBeds}</Text>
                <Text style={styles.cardInfo}>{item.address}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Spacer height={10} />
                            <BackButton navigation={navigation} text={'Hostel Floor'} />
                            <Spacer height={20} />

                        </View>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
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
        backgroundColor: Colors.white
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
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center'

    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black
    },
    cardInfo: {
        fontSize: 14,
        marginBottom: 5,

        color: Colors.black
    },
});

export default SingleHostelScreen;
