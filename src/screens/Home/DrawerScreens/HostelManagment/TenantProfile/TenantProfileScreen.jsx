
import { FlatList, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import { launchImageLibrary } from 'react-native-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const TenantProfileScreen = ({ navigation, route }) => {

    const [isStaff, setIsStaff] = useState(false)
    const staff = route?.params?.isStaff;

    const [name, setName] = useState('Rohit jaat');
    const [mobile, setMobile] = useState('8959402332');
    const [pmobile, setPMobile] = useState('8959402332');
    const [rent, setRent] = useState('5000');
    const [securityDeposit, setSecurityDeposit] = useState('5000');
    const [monthlyRent, setmonthlyRent] = useState('5000');
    const [dOJ, setDOJ] = useState('')
    const [hostel, setHostel] = useState('')
    const [floor, setfloor] = useState('')
    const [room, setroom] = useState('')
    const [seat, setseat] = useState('')
    const [frunt, setFrunt] = useState('');
    const [back, setBack] = useState('');
    const [userPhoto, setUserPhoto] = useState('')
    const hostelList = [{ label: 'AP1', value: 'AP 1' },
    { label: 'AP 2', value: 'AP 2' }]
    const FloorList = [{ label: 'Ground', value: '1' },
    { label: 'First', value: '2' }]
    const RoomlList = [{ label: 'First', value: '1' },
    { label: 'Second', value: '2' }]
    const BedList = [{ label: 'Seat 1', value: '1' },
    { label: 'Seat 2', value: '2' }]
    const handleImagePicker = (type) => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 500,
            maxHeight: 500,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                const source = response.assets[0].uri
                console.log(source)
                if (type == 1) {

                    setFrunt(source);
                } else if (type == 2) {
                    setBack(source);
                } else {
                    setUserPhoto(source)
                }
            }
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={staff ? "Staff Profile" : "Tenant Profile"} />
                <Pressable onPress={() => { alert('Cooming Soon') }} style={{
                    ...styles.button,
                    marginRight: horizScale(15),
                    width: '30%',
                    borderWidth: horizScale(0.8)
                }}>
                    <Text style={styles.buttonText2}>Save</Text>
                    <Image
                        source={CustomImage.right} style={{ tintColor: Colors.white, height: horizScale(10), width: horizScale(10) }}
                    />
                </Pressable>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* <Spacer height={10} /> */}
                <Image
                    source={staff ? CustomImage.cook : CustomImage.dummyuser}
                    style={{ ...styles.profilePicture, resizeMode: 'contain' }}
                />
                <Spacer height={20} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Pressable
                        disabled={staff}
                        onPress={() => { navigation.navigate('ShiftScreen', { userID: 1 }) }} style={styles.button2}>
                        <Text style={styles.buttonText}>Shift</Text>
                    </Pressable>
                    <Pressable
                        disabled={staff}
                        onPress={() => { navigation.navigate('SwipeScreen', { userID: 1 }) }} style={styles.button2}>
                        <Text style={styles.buttonText}>Swipe</Text>
                    </Pressable>
                    <BouncyCheckbox
                        size={normScale(18)}
                        fillColor={Colors.green}
                        unfillColor={Colors.white}
                        disableText={false}
                        text='Is Staff'
                        disabled={staff}
                        isChecked={staff || isStaff}
                        textStyle={{ textDecorationLine: 'underline' }}
                        iconStyle={{ marginLeft: horizScale(0) }}
                        innerIconStyle={{
                            borderWidth: normScale(2),
                            borderColor: staff || isStaff ? Colors.green : Colors.red,
                            borderRadius: 20,
                            backgroundColor: staff || isStaff ? Colors.green : Colors.red,
                        }}
                        onPress={(isChecked) => { setIsStaff(isChecked) }}
                    />

                </View>
                <Spacer height={20} />

                <InputFilled
                    type="Dropdown"
                    placeholder="Select a hostel..."
                    data={hostelList}
                    value={hostel}
                    onChangeText={text => setHostel(text)}
                    icon={CustomImage.hostel}
                />
                <Spacer height={20} />
                {
                    staff || !isStaff &&
                    <>
                        <InputFilled
                            type="Dropdown"
                            placeholder="Select a Floor..."
                            data={FloorList}
                            value={floor}
                            onChangeText={text => setfloor(text)}
                            icon={CustomImage.calendar1}
                        />
                        <Spacer height={20} />
                        <InputFilled
                            type="Dropdown"
                            placeholder="Select a Room..."
                            data={RoomlList}
                            value={room}
                            onChangeText={text => setroom(text)}
                            icon={CustomImage.calendar1}
                        />
                        <Spacer height={20} />
                        <InputFilled
                            type="Dropdown"
                            placeholder="Select a Seat..."
                            data={BedList}
                            value={seat}
                            onChangeText={text => setseat(text)}
                            icon={CustomImage.calendar1}
                        />
                        <Spacer height={20} />
                    </>
                }
                <InputFilled
                    type="Email"
                    placeholder="Name here"
                    value={name}
                    onChangeText={text => setName(text)}
                    icon={CustomImage.user}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Mobile"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    icon={CustomImage.phone}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Mobile"
                    placeholder="Parent Mobile Number"
                    value={pmobile}
                    onChangeText={text => setPMobile(text)}
                    icon={CustomImage.phone}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Mobile"
                    placeholder={isStaff ? "Monthly Salary" : "Monthly Rent"}
                    value={monthlyRent}
                    onChangeText={text => setmonthlyRent(text)}
                    icon={CustomImage.SecurityDeposit}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Mobile"
                    placeholder="Security Deposit"
                    value={securityDeposit}
                    onChangeText={text => setSecurityDeposit(text)}
                    icon={CustomImage.SecurityDeposit}
                />

                <Spacer height={20} />
                <InputFilled
                    type="Mobile"
                    placeholder={isStaff ? "Due Salary" : "Due Rent"}
                    value={rent}
                    onChangeText={text => setRent(text)}
                    icon={CustomImage.rent}
                />
                <Spacer height={20} />
                <InputFilled
                    type="Date"
                    placeholder="Date of Joining"
                    value={dOJ}
                    onChangeText={text => setDOJ(text)}
                    icon={CustomImage.calendar1}
                />
                <Spacer height={20} />
                <View style={styles.imageContainer}>
                    <Pressable style={styles.image} onPress={() => {
                        handleImagePicker(3)
                    }}>
                        <Image source={CustomImage.plus} style={styles.plusImage} />

                        <Text style={styles.imgName}>Profile</Text>
                    </Pressable>
                    <Pressable style={styles.image} onPress={() => {
                        handleImagePicker(1)
                    }}>
                        <Image source={CustomImage.plus} style={styles.plusImage} />

                        <Text style={styles.imgName}>Front</Text>
                    </Pressable>
                    <Pressable style={styles.image} onPress={() => {
                        handleImagePicker(2)
                    }}>
                        <Image source={CustomImage.plus} style={styles.plusImage} />

                        <Text style={styles.imgName}>Back</Text>
                    </Pressable>
                </View>
                <Spacer height={30} />
                <View style={styles.imageContainer2}>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {userPhoto !== '' &&
                            <Pressable onPress={() => {
                                navigation.navigate('ViewFullImage', { uri: userPhoto })
                            }}>
                                <Image source={{ uri: userPhoto }} style={styles.docImage} />
                            </Pressable>}
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {frunt !== '' &&
                            <Pressable onPress={() => {
                                navigation.navigate('ViewFullImage', { uri: frunt })
                            }}>
                                <Image source={{ uri: frunt }} style={styles.docImage} />
                            </Pressable>}
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {back !== '' && <Pressable onPress={() => {
                            navigation.navigate('ViewFullImage', { uri: back })
                        }}>
                            <Image source={{ uri: back }} style={styles.docImage} />
                        </Pressable>}
                    </View>

                </View>
                <Spacer height={30} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default TenantProfileScreen

const styles = StyleSheet.create({
    button2: {
        backgroundColor: Colors.white,
        borderRadius: normScale(60),
        borderWidth: horizScale(0.8),
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(3),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: vertScale(10)
    },
    buttonText2: {
        color: Colors.white,
        fontSize: fontSize.medium,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.regular
    },
    button: {
        backgroundColor: Colors.black,
        borderRadius: normScale(60),
        // height: vertScale(60),
        width: '80%',
        // width: fullWidth - horizScale(80),/
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(5),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: vertScale(10)
    },
    buttonText: {
        color: Colors.black,
        fontSize: fontSize.small,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.black
    },

    imgName: {
        color: Colors.black,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular,
        left: horizScale(5)
    },
    image: {
        borderRadius: horizScale(10),
        borderWidth: horizScale(1),
        borderColor: Colors.blue,
        paddingHorizontal: horizScale(15),
        paddingVertical: horizScale(5),
        flexDirection: 'row'
    },
    plusImage: {
        width: horizScale(18),
        height: horizScale(18),
        resizeMode: 'contain',
    },
    docImage: {
        width: horizScale(100),
        height: horizScale(100),
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    imageContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profilePicture: {
        width: horizScale(60),
        height: horizScale(60),
        borderRadius: horizScale(30),
        alignSelf: 'center'
    },

    hostelName: {
        color: Colors.black,
        fontSize: fontSize.input,
        fontFamily: fontFamily.bold
    },
    normText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.regular,
        flex: 0.9,
        left: horizScale(70)
    },
    hostelAddress: {
        color: Colors.grey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular
    },
    hostelContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    roomContainer: {

        alignItems: 'center',
        paddingVertical: vertScale(10),
        borderBottomWidth: horizScale(0.5),
    },
    hostelContainer2: {
        flex: 0.7,
        paddingHorizontal: horizScale(5)
    },
    deleteButton: {
        flex: 0.1,
        paddingHorizontal: horizScale(5)
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: horizScale(30),
        borderWidth: horizScale(0.8),
        borderColor: Colors.black,
        paddingHorizontal: horizScale(8),
        right: horizScale(20)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    smallLogo: {
        width: horizScale(12),
        height: horizScale(12),
        resizeMode: 'contain',
    },
    deleteIcon: {
        width: horizScale(18),
        height: horizScale(18),
        resizeMode: 'contain',
    },
    hostelImage: {
        width: horizScale(45),
        height: horizScale(45),
        resizeMode: 'contain',
    },
    appText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        marginLeft: normScale(8),
        fontFamily: fontFamily.regular
    },
})