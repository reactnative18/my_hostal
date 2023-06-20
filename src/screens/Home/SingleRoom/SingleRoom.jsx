import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import fontSize from '../../../util/Fonts';

const SingleRoomScreen = ({ navigation }) => {

    const room = [
        {
            id: '1',
            name: 'Bad No 1',
            image: CustomImage.logo,
            address: 'Ajay Carpenter',
            price: '28',
            number: '7000207121',
        },
        {
            id: '2',
            name: 'Bad No 2',
            image: CustomImage.logo,
            address: 'Anuj bhati',
            price: '15',
            number: '9876543210',
        },
        {
            id: '3',
            empty: true
        },
        {
            id: '4',
            name: 'Bad No 4',
            image: CustomImage.logo,
            address: 'Rohit Jat',
            price: '07',
            number: '8959402332',
        },
        // Add more cards as needed
    ];
    const UserInfo = [
        {
            id: '1',
            startDate: '28/03/2023',
            endDate: '27/04/2023',
            pendingAmmount: 'No dues',

        },
        {
            id: '2',
            startDate: '28/04/2023',
            endDate: '27/05/2023',
            pendingAmmount: 'No dues',
        },
        {
            id: '3',
            startDate: '28/05/2023',
            endDate: '27/06/2023',
            pendingAmmount: '500',
        },
        {
            id: '4',
            startDate: '28/06/2023',
            endDate: '27/07/2023',
            pendingAmmount: '5000',
        },
        // Add more cards as needed
    ];

    const renderItemRoom = ({ item }) => (
        <TouchableOpacity style={{ ...styles.roomContainer, backgroundColor: item.empty ? 'green' : 'white' }}>
            {
                item.empty ?
                    <Text style={styles.availableText}>Room available</Text>
                    :
                    <>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardInfo}>{item.address}</Text>
                        <Text style={styles.cardInfo}>Month Start : {item.price}</Text>
                        <Text style={styles.cardInfo}>Number: {item.number}</Text>
                    </>
            }
        </TouchableOpacity>
    );
    const renderItemUserInfo = ({ item }) => (
        <TouchableOpacity style={{ ...styles.userInfoContainer, }} disabled>

            <Text style={styles.userInfoId}>{item.id}</Text>
            <Text style={styles.userInfoSD}>{item.startDate}</Text>
            <Text style={styles.userInfoED}> {item.endDate}</Text>
            <Text style={styles.userInfoPA}>{item.pendingAmmount}</Text>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={CustomImage.verify} style={{ height: 30, width: 30, }} />
            </View>
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
                data={room}
                renderItem={renderItemRoom}
                keyExtractor={item => item.id}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
            <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 20 }}>Pending amount : 5500</Text>
            <ScrollView horizontal={true}>

                <FlatList
                    data={UserInfo}
                    renderItem={renderItemUserInfo}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={() => {
                        return (
                            <TouchableOpacity style={{ ...styles.userInfoContainer, }} disabled>

                                <Text style={{ ...styles.userInfoId, fontWeight: '700', fontSize: 18 }}>Id</Text>
                                <Text style={{ ...styles.userInfoSD, fontWeight: '700', fontSize: 18 }}>Start date</Text>
                                <Text style={{ ...styles.userInfoED, fontWeight: '700', fontSize: 18 }}>End date</Text>
                                <Text style={{ ...styles.userInfoPA, fontWeight: '700', fontSize: 18 }}>Pending Amount</Text>
                                <Text style={{ ...styles.userInfoPA, fontWeight: '700', fontSize: 18, width: 100 }}>Dues clear</Text>

                            </TouchableOpacity>
                        )
                    }}

                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoId: {
        width: 50,
        borderWidth: 0.5,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black'
    },
    userInfoSD: {
        width: 150,
        borderWidth: 0.5,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black'
    },
    userInfoED: {
        width: 150,
        borderWidth: 0.5,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black'
    },
    userInfoPA: {
        width: 150,
        borderWidth: 0.5,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black'
    },
    userInfoContainer: {
        flexDirection: 'row',

        height: 60,
        borderWidth: 0.5
    },
    availableText: {
        color: 'white'
    },
    roomContainer: {
        width: '47%',
        borderWidth: 0.8,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
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

export default SingleRoomScreen;
