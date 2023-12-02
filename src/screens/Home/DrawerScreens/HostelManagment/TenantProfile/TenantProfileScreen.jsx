
import React, { useState, useEffect } from 'react'
import { FlatList, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import { launchImageLibrary } from 'react-native-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { apiService } from '../../../../../API_Services'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import Auth from '../../../../../Auth'
import { Config } from '../../../../../Config'

const TenantProfileScreen = ({ navigation, route }) => {
    const { userInfo } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    const getBeds = async (room) => {

        const response = await apiService.getBeds({
            "userId": userInfo._id,
            hostelId: hostel._id,
            floorId: floor._id,
            "roomId": room._id
        })
        if (response) {

            setBedList(response.data)
        }
    }

    const getRooms = async (floor) => {

        const response = await apiService.getRooms({
            hostelId: hostel._id,
            floorId: floor._id
        })
        if (response) {

            setRoomlList(response.data)
            if (room) {
                getBeds(room)
            }
        }
    }

    const getFloors = async (hostel) => {

        const response = await apiService.getFloors({ hostelId: hostel._id })
        if (response) {

            setFloorList(response.data)
            if (floor) {
                getRooms(floor)
            }
        }
    }

    const getHostel = async () => {

        const response = await apiService.getHostels({ userId: userInfo._id })
        if (response) {

            setHostelList(response.data)
            if (hostel) {
                getFloors(hostel)
            }
        }
    }
    const addTenant = async () => {
        dispatch(loaderAction(true))
        var myHeaders = new Headers();
        var token = await Auth.getToken();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("bedId", seat._id);
        formdata.append("tName", name);
        formdata.append("tMobile", mobile);
        formdata.append("tParentMobile", pmobile);
        formdata.append("tParentName", tParentName);
        formdata.append("tAadharNo", "");
        formdata.append("joiningDate", dOJ);
        formdata.append("secDepoAmt", securityDeposit);
        formdata.append("paymentDate", dOJ);
        formdata.append("paymentAmt", monthlyRent);
        formdata.append("isStaff", isStaff);
        formdata.append("aadharImgFrnt", {
            uri: frunt.uri, // file uri/path
            name: frunt.fileName, //file name
            type: `image/${frunt.uri.split(".").pop()}`, //file type
        });
        formdata.append("aadharImgBck", {
            uri: back.uri, // file uri/path
            name: back.fileName, //file name
            type: `image/${back.uri.split(".").pop()}`, //file type
        });
        formdata.append("salary", "");
        formdata.append("description", "This is payment desciption");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        console.log("Upload tenant==>", requestOptions)
        fetch(Config.base_URL + "api/addTenat", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result==>", result)
                if (result.success) {
                    dispatch(loaderAction(false))
                    ToastAndroid.showWithGravity(result.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    navigation.replace('HomeDrawer');
                }
            })
            .catch(error => {
                dispatch(loaderAction(false))
                console.log('error', error)
            })
            .finally(() => {
                dispatch(loaderAction(false))
            });
    }


    const [isStaff, setIsStaff] = useState(false)
    const staff = route?.params?.isStaff;
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pmobile, setPMobile] = useState('');
    const [tParentName, setTParentName] = useState('')
    const [rent, setRent] = useState('');
    const [securityDeposit, setSecurityDeposit] = useState('');
    const [monthlyRent, setmonthlyRent] = useState('');
    const [dOJ, setDOJ] = useState('')
    const [hostel, setHostel] = useState(route?.params?.hostel)
    const [floor, setfloor] = useState(route?.params?.floor)
    const [room, setroom] = useState(route?.params?.room)
    const [seat, setseat] = useState(route?.params?.bed)
    const [frunt, setFrunt] = useState({});
    const [back, setBack] = useState({});
    const [userPhoto, setUserPhoto] = useState({})
    const [hostelList, setHostelList] = useState([])
    const [FloorList, setFloorList] = useState([])
    const [RoomlList, setRoomlList] = useState([])
    const [BedList, setBedList] = useState([])
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
                const source = response.assets[0]

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
    useEffect(() => {
        getHostel()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={staff ? "Staff Profile" : "Tenant Profile"} />
                <Pressable onPress={() => { addTenant() }} style={{
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
                    labelField={"hostelName"}
                    valueField={"_id"}
                    onChangeText={text => {
                        setHostel(text),
                            getFloors(text)
                    }}
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
                            labelField={"floorName"}
                            valueField={"_id"}
                            onChangeText={text => {
                                setfloor(text),
                                    getRooms(text)
                            }}
                            icon={CustomImage.calendar1}
                        />
                        <Spacer height={20} />
                        <InputFilled
                            type="Dropdown"
                            placeholder="Select a Room..."
                            data={RoomlList}
                            value={room}
                            labelField={"roomName"}
                            valueField={"_id"}
                            onChangeText={text => {
                                setroom(text),
                                    getBeds(text)
                            }}
                            icon={CustomImage.calendar1}
                        />
                        <Spacer height={20} />
                        <InputFilled
                            type="Dropdown"
                            placeholder="Select a Seat..."
                            data={BedList}
                            value={seat}
                            labelField={"bedName"}
                            valueField={"_id"}
                            onChangeText={text => {
                                if (text.seatAvailible) {
                                    setseat(text)
                                }
                            }}
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
                    type="Email"
                    placeholder="Parent Name"
                    value={tParentName}
                    onChangeText={text => setTParentName(text)}
                    icon={CustomImage.user}
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
                        {Object.keys(userPhoto).length > 0 &&
                            <Pressable onPress={() => {
                                navigation.navigate('ViewFullImage', { uri: userPhoto.uri })
                            }}>
                                <Image source={{ uri: userPhoto.uri }} style={styles.docImage} />
                            </Pressable>}
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {Object.keys(frunt).length > 0 &&
                            <Pressable onPress={() => {
                                navigation.navigate('ViewFullImage', { uri: frunt.uri })
                            }}>
                                <Image source={{ uri: frunt.uri }} style={styles.docImage} />
                            </Pressable>}
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {Object.keys(back).length > 0 && <Pressable onPress={() => {
                            navigation.navigate('ViewFullImage', { uri: back.uri })
                        }}>
                            <Image source={{ uri: back.uri }} style={styles.docImage} />
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