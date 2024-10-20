import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { Spacer, horizScale, vertScale } from '../../../util/Layout';
import BackButton from '../../../Components/BackButton/BackButton';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

const Notification = ({ navigation }) => {

    const room = [
        {
            id: '1',
            name: 'Due Rent',
            message: "Hey dear, Your rent for Aug month is due please pay your remaining ammount ₹ 4000/- . Thank you"
        },
        {
            id: '2',
            name: 'Due Rent',
            message: "Hey dear, Your rent for Aug month is due please pay your remaining ammount ₹ 4000/- . Thank you"
        },
        {
            id: '3',
            name: 'Due Rent',
            message: "Hey dear, Your rent for Aug month is due please pay your remaining ammount ₹ 4000/- . Thank you"
        },
        {
            id: '4',
            name: 'Due Rent',
            message: "Hey dear, Your rent for Aug month is due please pay your remaining ammount ₹ 4000/- . Thank you"
        },
    ];


    const renderItemRoom = ({ item }) => {
        let length = item?.roominfo?.length ? item?.roominfo?.length : 1
        return (
            <View style={styles.roomContainer}>

                <Text style={styles.cardTitle}>{item.name}</Text>

                <Text numberOfLines={2} style={{ ...styles.userName, }}>{item?.message}</Text>


            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={10} />
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <BackButton navigation={navigation} text={"Notification"} />
            <Spacer height={10} />
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={room}
                    renderItem={renderItemRoom}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => {
                        return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={CustomImage.no} style={{
                                height: horizScale(120),
                                width: horizScale(120),
                            }} />
                            <Text>Empty Notifications...</Text>
                        </View>)
                    }}
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

        borderRadius: horizScale(15),
        marginVertical: vertScale(5),
        padding: horizScale(15),
        width: '100%',
        backgroundColor: Colors.white,
        elevation: 4,
        alignSelf: 'center',

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
        ...Platform.select({
            ios: {
                lineHeight: vertScale(40)
            },
            android: {
                textAlignVertical: 'center',
            }
        }),
        minHeight: vertScale(40),
    },
    cardInfo: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
        width: 90,
        color: Colors.black
    },
});

export default Notification;
