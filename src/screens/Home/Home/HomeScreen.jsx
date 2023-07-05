import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import HeaderView from '../../../Components/HeaderView';
import { Colors } from '../../../util/Colors';
import { Spacer, horizScale, vertScale } from '../../../util/Layout';
import { fontFamily, fontSize } from '../../../util/Fonts';

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
            id: '4',
            name: 'AP 30',
            location: 'Bholaram indore',
            image: CustomImage.logo,
            availableRoom: 5,
            category: 'Boys'
        },
        {
            id: '5',
            name: 'Hostel C',
            location: 'City C',
            image: CustomImage.logo,
            availableRoom: 7,
            category: 'Boys'
        },
        {
            id: '6',
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
        <SafeAreaView style={styles.container}>
            <HeaderView navigation={navigation} />

            <FlatList
                data={hostels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (<Spacer height={50} />)}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('TenantProfileScreen')
            }}>
                <Image source={CustomImage.add} style={{ tintColor: Colors.theme }} />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: horizScale(20),
        bottom: vertScale(65)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        paddingVertical: vertScale(10),
        paddingHorizontal: horizScale(5),
    },
    hostelItem: {
        marginVertical: vertScale(9),
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: horizScale(15),
        padding: 5,
        shadowColor: Colors.black,

        elevation: 10,
    },
    hostelImage: {
        width: 130,
        height: 130,
        borderRadius: 5,
    },
    hostelName: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.black,
        color: Colors.black
    },
    hostelLocation: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular,
        color: Colors.darkgrey2
    },
});

export default HomeScreen;
