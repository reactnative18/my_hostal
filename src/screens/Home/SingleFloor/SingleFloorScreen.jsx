import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { horizScale, vertScale } from '../../../util/Layout';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

const SingleFloorScreen = ({ navigation, route }) => {
    const { floor } = route.params
    const renderItemRoom = ({ item }) => {
        return (
            <Pressable style={styles.roomContainer} onPress={() => {
                navigation.navigate('SingleRoomScreen', { room: item })
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.cardTitle}>{item.roomName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around',paddingVertical:5 }}>
                    {item.availableBed > 0 && <Text style={styles.cardInfo}>Available Beds : {item.availableBed}</Text>}
                    {item.filledBed > 0 && <Text style={styles.cardInfo}>Filled Beds : {item.filledBed}</Text>}
                </View>

            </Pressable>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
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
                    <Text style={{ fontSize: fontSize.input, color: Colors.black, marginLeft: 10 }}>{floor.floorName}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={floor.rooms}
                    renderItem={renderItemRoom}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subSeater: {
        backgroundColor: Colors.lightsky,
        elevation: 2,
        borderRadius: horizScale(7),
        marginHorizontal: horizScale(2),
        minHeight: vertScale(40),
    },
    roomContainer: {

        borderRadius: 15,
        marginVertical: 5,
        padding: 15,
        width: '100%',
        backgroundColor: Colors.white,
        elevation: 2,
        alignSelf: 'center',
borderWidth:1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        paddingHorizontal: horizScale(5),
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
    smallIcon: {
        width: horizScale(16),
        height: horizScale(16),
        borderRadius: horizScale(8),
        position: 'absolute',
        marginTop: vertScale(-7),
        right: horizScale(-1)
    },
    cardTitle: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
        textAlign: 'left',
        color: Colors.black
    },
    userName: {
        fontSize: fontSize.medium,
        textAlign: 'center',
        color: Colors.black,
        textAlignVertical: 'center',
        minHeight: vertScale(40),
    },
    cardInfo: {
        fontSize: 14,
        marginBottom: 5,
        color: Colors.black
    },
});

export default SingleFloorScreen;
