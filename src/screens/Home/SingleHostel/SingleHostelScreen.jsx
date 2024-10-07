import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontSize } from '../../../util/Fonts';
import BackButton from '../../../Components/BackButton/BackButton';
import { Spacer, horizScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import { useDispatch } from 'react-redux';
import { loaderAction } from '../../../redux/Actions/UserAction';
// import { apiService } from '../../../API_Services';
import { firebase_getMasterHostel } from '../../../firebase_database';
// import tableNames from '../../../firebase_database/constrains';

const SingleHostelScreen = ({ navigation, route }) => {

    const [Floor, setFloor] = useState([])
    const dispatch = useDispatch()
    const { hostel } = route.params
    const [hostels, setHostels] = useState([])
    const getData = async () => {
        try {
            dispatch(loaderAction(true))
            const response = await firebase_getMasterHostel(hostel.id)
            if (response) {
                console.log("master Hostel",JSON.stringify(response))
                // setFloor(response)
            }
        } catch (error) {

        }
        finally {
            dispatch(loaderAction(false))
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('SingleFloorScreen', { floor: item })
            }}
            style={{ ...styles.card, borderColor: Colors.black }}>
            <Image source={item?.image || CustomImage.floor} style={styles.cardImage} />
            <View style={{ marginLeft: horizScale(10) }}>
                <Text style={styles.cardTitle}>{item.floorName}</Text>
                {item.totalBeds && <Text style={styles.cardInfo}>{item.totalBeds}</Text>}
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

            <FlatList
                data={Floor}
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
        width: horizScale(60),
        height: horizScale(60),
        borderRadius: horizScale(30),
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
