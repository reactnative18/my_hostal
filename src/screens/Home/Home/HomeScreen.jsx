import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CustomImage from '../../../util/Images';
import HeaderView from '../../../Components/HeaderView';
import { Colors } from '../../../util/Colors';
import { Spacer, horizScale, vertScale } from '../../../util/Layout';
import { fontFamily, fontSize } from '../../../util/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { apiService } from '../../../API_Services';
import { loaderAction } from '../../../redux/Actions/UserAction';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)
    const [hostels, setHostels] = useState([])
    const getData = async () => {
        dispatch(loaderAction(true))
        const response = await apiService.getHostels({ userId: userInfo._id })
        if (response) {
            dispatch(loaderAction(false))
            setHostels(response.data)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.hostelItem} onPress={() => {
            navigation.navigate('SingleHostelScreen', { hostel: item })
        }}>
            <Image source={item?.image || CustomImage.logo} style={styles.hostelImage} />
            <View style={{ paddingHorizontal: 10 }}>

                <Text style={styles.hostelName}>{item.hostelName}</Text>
                <Text style={styles.hostelLocation}>{item.hostelAddress}</Text>
                {item?.availableRoom && <Text style={styles.hostelLocation}>Total available room: {item?.availableRoom}</Text>}
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
                <Image source={CustomImage.add} style={{
                    tintColor: Colors.theme,
                    resizeMode: 'contain',
                    height: horizScale(50), width: horizScale(50)
                }} />
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
        marginVertical: vertScale(4),
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: horizScale(15),
        padding: 5,
        shadowColor: Colors.black,
        alignItems: 'center',
        elevation: 7,
    },
    hostelImage: {
        width: horizScale(70),
        height: horizScale(70),
        borderRadius: horizScale(70),
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
