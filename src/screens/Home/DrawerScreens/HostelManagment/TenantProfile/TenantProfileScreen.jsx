
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import BackButton from '../../../../../Components/BackButton/BackButton'
import { Spacer, horizScale, normScale, vertScale } from '../../../../../util/Layout'
import FocusStatusBar from '../../../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../../../util/Colors'
import { fontFamily, fontSize } from '../../../../../util/Fonts'
import CustomImage from '../../../../../util/Images'
import InputFilled from '../../../../../Components/InputFilled/InputFilled'
import { launchImageLibrary } from 'react-native-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { firebase_addDataToTable, firebase_createTenantProfile, firebase_getAllDataFromTable, firebase_getAllDataFromTableById, firebase_updateBedData } from '../../../../../firebase_database'
import tableNames from '../../../../../firebase_database/constrains'
import { uploadImages } from '../../../../../firebase_database/UploadImages'
import { useDispatch, useSelector } from 'react-redux'
import { loaderAction } from '../../../../../redux/Actions/UserAction'
import ToastMessage from '../../../../../Components/ToastMessage'

const TenantProfileScreen = ({ navigation, route }) => {
    const { loading } = useSelector(state => state.loader)
    const dispatch = useDispatch()
    const staff = route?.params?.isStaff;
    const [isStaff, setIsStaff] = useState(staff || false)
    const { userInfo } = useSelector(state => state.userInfo)
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pmobile, setPMobile] = useState('');
    const [rent, setRent] = useState(null);
    const [securityDeposit, setSecurityDeposit] = useState(null);
    const [monthlyRent, setmonthlyRent] = useState(null);
    const [dOJ, setDOJ] = useState('')
    const [hostel, setHostel] = useState(null)
    const [floor, setfloor] = useState(null)
    const [room, setroom] = useState(null)
    const [seat, setseat] = useState(null)
    const [frunt, setFrunt] = useState(null);
    const [back, setBack] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null)
    const [hostelList, setHostelList] = useState([])
    const [FloorList, setFloorList] = useState([])
    const [RoomlList, setRoomlList] = useState([])
    const [BedList, setBedList] = useState([])
    const [tenantId, setTenantId] = useState('')
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
                    setImg2('')
                } else if (type == 2) {
                    setBack(source);
                    setImg3('')
                } else { 
                    setUserPhoto(source)
                    setImg1('')
                }
            }
        });
    };
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    const uploadImage = async (imageType) => {
        if (mobile == '') {
            ToastMessage.WarningShowToast("Please enter mobile number...")
            return
        }
        dispatch(loaderAction(true))
        switch (imageType) {
            case "userProfile":
                await uploadImages(`profile_${mobile}.${userPhoto.uri.split('.')[1]}`, userPhoto.uri, (uploadedURI) => {
                    setImg1(uploadedURI)
                })
                dispatch(loaderAction(true))
                break
            case "frunt":
                await uploadImages(`aadhar_front_${mobile}.${frunt.uri.split('.')[1]}`, frunt.uri, (uploadedURI) => {
                    setImg2(uploadedURI)
                })
                break
            case "back":
                await uploadImages(`aadhar_back_${mobile}.${back.uri.split('.')[1]}`, back.uri, (uploadedURI) => {
                    setImg3(uploadedURI)
                })
                break
        }
        dispatch(loaderAction(false))
    }
    const setParamsData=useCallback(()=>{
        const { name, mobile, pmobile, rent, securityDeposit, monthlyRent, dateOfJoining, userPhoto, frunt_img, back_img, tenantId, id } = route?.params?.tenant
        callDataTenant()
        setmonthlyRent(monthlyRent)
        setName(name)
        setMobile(mobile)
        setPMobile(pmobile)
        setRent(rent)
        setSecurityDeposit(securityDeposit)
        setDOJ(dateOfJoining)
        setImg1(userPhoto)
        setImg2(frunt_img)
        setImg3(back_img)
        setTenantId(tenantId ? tenantId : id)
    },[])
    useEffect(() => {
        try {
            dispatch(loaderAction(true))
            console.log("route?.params=>",route?.params)
            let hostelId = route?.params?.tenant?.hostelId ? route?.params?.tenant?.hostelId : route?.params?.hostelId
            getAllHostels(hostelId)
            setIsStaff(staff || false)
            if (route?.params?.tenant) { 
               setParamsData()
            } 
            if (route?.params?.hostelData && !route?.params?.hostelData?.isTrue && route?.params) {
                callData()
            }
            if(route?.params){
                const { amont, seatAvailable } = route?.params
                if (seatAvailable && Number(amont)>0){
                    setSecurityDeposit(()=>amont)
                    setmonthlyRent(()=>amont)
                }
            }

        } catch (error) {
            console.log("useeffect 1=>", error)
        }
        finally{
            dispatch(loaderAction(false))
        }

    }, [route?.params?.tenant])
    useEffect(() => {
        BedList.length > 0 && callDataTenant()
    }, [BedList])
    const callDataTenant = async () => {
        const { floorId, roomId, bedId, id, seatAvailable } = route?.params?.tenant ? route?.params?.tenant : route?.params
        try {
            dispatch(loaderAction(true))
            floorId && FloorList && setfloor(FloorList.find(item => item.id == floorId))
            roomId && RoomlList && setroom(RoomlList.find(item => item.id == roomId))
            if (seatAvailable){
                id && BedList && setseat(BedList.find(item => item.id == id))
            }else{
                bedId && BedList && setseat(BedList.find(item => item.id == bedId))
            }
        } catch (error) {
           
            console.log("callDataTenant=>", error)
        }
        finally{
            dispatch(loaderAction(false))
        }
    }
    const callData = async () => {
        if (route?.params?.params?.isTrue) {
            return
        }
        const { hostel, floor, room, bed } = route?.params?.hostelData
        setHostel(hostel)
        await getAllFloors(hostel.id),
            await getAllRooms(floor.id)
        await getAllBeds(room.id)
        setfloor(floor)
        setroom(room)
        setseat(bed)
    }
    const createProfile = async () => {
        try {
            const params = isStaff ? {
                name: name,
                mobile: mobile,
                monthlySalary: Number(monthlyRent),
                dateOfJoining: dOJ,
                hostelId: hostel?.id,
                userPhoto: userPhoto == null ? "https://drive.google.com/file/d/1njoAhXT4jbIE9WDNbZ6hnYpX_zycMfF4/view?usp=sharing" : img1,
                frunt_img: frunt == null ? "https://drive.google.com/file/d/1dh0_k5DNzW2TRgMaGRbhCf5W0Qh8KWbm/view?usp=sharing" : img2,
                back_img: back == null ? "https://drive.google.com/file/d/1rxXk39ELnpdeMAdDiilkquOwR9jAapHe/view?usp=sharing" : img3
            } : {
                name: name,
                mobile: mobile,
                pmobile: pmobile,
                rent: Number(rent),
                securityDeposit: Number(securityDeposit),
                monthlyRent: Number(monthlyRent),
                dateOfJoining: dOJ,
                hostelId: hostel?.id,
                userPhoto: userPhoto == null ? "https://drive.google.com/file/d/1njoAhXT4jbIE9WDNbZ6hnYpX_zycMfF4/view?usp=sharing" : img1,
                frunt_img: frunt == null ? "https://drive.google.com/file/d/1dh0_k5DNzW2TRgMaGRbhCf5W0Qh8KWbm/view?usp=sharing" : img2,
                back_img: back == null ? "https://drive.google.com/file/d/1rxXk39ELnpdeMAdDiilkquOwR9jAapHe/view?usp=sharing" : img3,
                floorId: floor?.id,
                roomId: room?.id,
                bedId: seat?.id,
            }
            for (let key in params) {
                if (params[key] === undefined || params[key] === null || params[key] === '') {
                    ToastMessage.WarningShowToast("Please fill all the fields")
                    return
                }
            }
            dispatch(loaderAction(true))
            if (route?.params?.tenant) {
                await firebase_updateBedData(isStaff ? tableNames.staff : tableNames.tenant, tenantId, params)
                ToastMessage.successShowToast("Profile updated successfully")
                navigation.goBack()
            } else {
                const tenantId = await firebase_createTenantProfile(isStaff ? tableNames.staff : tableNames.tenant, params, isStaff)
                if (tenantId) {
                    ToastMessage.successShowToast("Profile created successfully")

                    const data = {
                        userId: userInfo.id,
                        tenantId: tenantId,
                        month: dOJ,
                        dueRent: Number(rent),
                        paidRent: Number(monthlyRent) - Number(rent),
                        isCurrentMonth: true,
                        monthlyRent: Number(monthlyRent),
                    }
                    await firebase_addDataToTable(isStaff ? tableNames.transectionStaff : tableNames.transectionTenant, data)
                    navigation.replace('HomeDrawer')
                }
            }


        } catch (error) {
            console.log("create profile issue=>", error)
        }
        finally {
            dispatch(loaderAction(false))
        }
    }

    const getAllBeds = async (id, isAvailable = true) => {
        const response = await firebase_getAllDataFromTableById(tableNames.bed, "roomId", id)
        if (response) { 
            const bedList = response.filter(u => u.seatAvailable == isAvailable);
            setBedList(bedList)
        }
    }
    const getAllRooms = async (id) => {
        const response = await firebase_getAllDataFromTableById(tableNames.room, "floorId", id)
        if (response) {
            setRoomlList(response)
        }
    }
    const getAllFloors = async (id) => {
        const response = await firebase_getAllDataFromTableById(tableNames.floor, "hostelId", id)
        if (response) {
            setFloorList(response)
        }
    }
    const getAllHostels = async (id = '') => {
        try {
             const response = await firebase_getAllDataFromTable(tableNames.hostel)
            const availableHostelList = response.filter(u => u.userId === userInfo.id);
            if (availableHostelList) { 
                setHostelList(availableHostelList)
                if (id != '') {
                    let selectedHostel = availableHostelList.find(item => item.id == id)
                    setHostel(selectedHostel)
                    const { hostelId, floorId, roomId } = route?.params?.tenant ? route?.params?.tenant : route?.params
                    hostelId && await getAllFloors(hostelId)
                    floorId && await getAllRooms(floorId)
                    roomId && await getAllBeds(roomId, !route?.params?.tenant)
                }  
            }
        } catch (error) {

        } 
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={isStaff ? "Staff Profile" : "Tenant Profile"} />
                <Pressable onPress={() => { createProfile() }} style={{
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
                    source={isStaff ? CustomImage.cook : CustomImage.dummyuser}
                    style={{ ...styles.profilePicture, resizeMode: 'contain' }}
                />
                <Spacer height={20} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {route?.params?.tenant && <>
                        <Pressable
                            disabled={isStaff}
                            onPress={() => {
                                navigation.navigate('ShiftScreen', {
                                    tenantData: { tenantId: tenantId, name: name, mobile: mobile, pmobile: pmobile, rent: rent, securityDeposit: securityDeposit, monthlyRent: monthlyRent, dateOfJoining: dOJ, hostelId: hostel?.id, userPhoto: userPhoto == null ? "https://drive.google.com/file/d/1njoAhXT4jbIE9WDNbZ6hnYpX_zycMfF4/view?usp=sharing" : img1, frunt_img: frunt == null ? "https://drive.google.com/file/d/1dh0_k5DNzW2TRgMaGRbhCf5W0Qh8KWbm/view?usp=sharing" : img2, back_img: back == null ? "https://drive.google.com/file/d/1rxXk39ELnpdeMAdDiilkquOwR9jAapHe/view?usp=sharing" : img3, floorId: floor?.id, roomId: room?.id, bedId: seat?.id }
                                })
                            }} style={styles.button2}>
                            <Text style={styles.buttonText}>Shift</Text>
                        </Pressable>
                        <Pressable
                            disabled={isStaff}
                            onPress={() => {
                                navigation.navigate('SwipeScreen', {
                                    tenantData: { tenantId: tenantId, name: name, mobile: mobile, pmobile: pmobile, rent: rent, securityDeposit: securityDeposit, monthlyRent: monthlyRent, dateOfJoining: dOJ, hostelId: hostel?.id, userPhoto: userPhoto == null ? "https://drive.google.com/file/d/1njoAhXT4jbIE9WDNbZ6hnYpX_zycMfF4/view?usp=sharing" : img1, frunt_img: frunt == null ? "https://drive.google.com/file/d/1dh0_k5DNzW2TRgMaGRbhCf5W0Qh8KWbm/view?usp=sharing" : img2, back_img: back == null ? "https://drive.google.com/file/d/1rxXk39ELnpdeMAdDiilkquOwR9jAapHe/view?usp=sharing" : img3, floorId: floor?.id, roomId: room?.id, bedId: seat?.id }
                                })
                            }} style={styles.button2}>
                            <Text style={styles.buttonText}>Swipe</Text>
                        </Pressable>
                    </>}
                    {
                        route?.params?.hostelData || tenantId == '' &&
                        <BouncyCheckbox
                            size={normScale(18)}
                            fillColor={Colors.green}
                            unfillColor={Colors.white}
                            disableText={false}
                            text='Is Staff'
                            disabled={staff}
                            isChecked={isStaff}
                            textStyle={{ textDecorationLine: 'underline' }}
                            iconStyle={{ marginLeft: horizScale(0) }}
                            innerIconStyle={{
                                borderWidth: normScale(2),
                                borderColor: isStaff ? Colors.green : Colors.red,
                                borderRadius: 20,
                                backgroundColor: isStaff ? Colors.green : Colors.red,
                            }}
                            onPress={(isChecked) => { setIsStaff(isChecked) }}
                        />
                    }

                </View>
                <Spacer height={20} />
                <InputFilled
                    type="Dropdown"
                    placeholder="Select a hostel..."
                    data={hostelList}
                    value={hostel?.hostelName ||''}
                    keyName="hostelName"
                    onChangeText={text => {
                        setHostel(text) 
                        getAllFloors(text.id)
                    }}
                    icon={CustomImage.hostel}
                />
                <Spacer height={20} />
                {
                    !isStaff &&
                    <>
                        {hostel?.id && <>
                            <InputFilled
                                type="Dropdown"
                                placeholder="Select a Floor..."
                                data={FloorList}
                                value={floor?.floorName}
                                keyName="floorName"
                                onChangeText={text => {
                                    setfloor(text)
                                    getAllRooms(text.id)
                                }}
                                icon={CustomImage.calendar1}
                            />
                            <Spacer height={20} />
                        </>}
                        {floor?.id && <>
                            <InputFilled
                                type="Dropdown"
                                placeholder="Select a Room..."
                                data={RoomlList}
                                value={room?.roomName}
                                keyName="roomName"
                                onChangeText={text => {
                                    setroom(text)
                                    getAllBeds(text.id)
                                }}
                                icon={CustomImage.calendar1}
                            />
                            <Spacer height={20} />
                        </>}
                        {room?.id && <>
                            <InputFilled
                                type="Dropdown"
                                placeholder="Select a Seat..."
                                data={BedList}
                                value={seat?.bedName}
                                keyName="bedName"
                                onChangeText={text => setseat(text)}
                                icon={CustomImage.calendar1}
                            />
                            <Spacer height={20} />
                        </>}
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
                {!isStaff && <>
                    <InputFilled
                        type="Mobile"
                        placeholder="Parent Mobile Number"
                        value={pmobile}
                        onChangeText={text => setPMobile(text)}
                        icon={CustomImage.phone}
                    />
                    <Spacer height={20} />
                </>}
                <InputFilled
                    type="Mobile"
                    placeholder={isStaff ? "Monthly Salary" : "Monthly Rent"}
                    value={monthlyRent ? monthlyRent+"" : ""}
                    onChangeText={text => setmonthlyRent(text)}
                    icon={CustomImage.SecurityDeposit}
                    editable={route?.params}
                />
                {!isStaff && <>
                    <Spacer height={20} />
                    <InputFilled
                        type="Mobile"
                        placeholder="Security Deposit"
                        editable={route?.params}
                        value={securityDeposit ? securityDeposit+"" : ""}
                        onChangeText={text => setSecurityDeposit(text)}
                        icon={CustomImage.SecurityDeposit}
                    />

                    <Spacer height={20} />
                    <InputFilled
                        type="Mobile"
                        placeholder={isStaff ? "Due Salary" : "Due Rent"}
                        value={ rent!=null ? rent+"" : ""}
                        onChangeText={text => setRent(text)}
                        icon={CustomImage.rent}
                    />
                </>}
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
                        {userPhoto !== null || img1 &&
                            <>
                                <Pressable onPress={() => {
                                    navigation.navigate('ViewFullImage', { uri: !img1 ? userPhoto.uri : img1 })
                                }}>
                                    <Image source={{ uri: img1 }} style={styles.docImage} alt='user Photo' />
                                </Pressable>
                                <Pressable style={img1 ? styles.imgConfirmbtndone : styles.imgConfirmbtn} onPress={() => {
                                    uploadImage('userProfile')
                                }}>
                                    <Text style={img1 ? styles.imgConfirmtxtdone : styles.imgConfirmtxt}>Confirm</Text>
                                </Pressable>
                            </>
                        }
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {frunt !== null || img2 &&
                            <>
                                <Pressable onPress={() => {
                                    navigation.navigate('ViewFullImage', { uri: !img2 ? frunt.uri : img2 })
                                }}>
                                    <Image source={{ uri: !img2 ? frunt.uri : img2 }} style={styles.docImage} />
                                </Pressable>
                                <Pressable style={img2 ? styles.imgConfirmbtndone : styles.imgConfirmbtn} onPress={() => {
                                    uploadImage('frunt')
                                }}>
                                    <Text style={img2 ? styles.imgConfirmtxtdone : styles.imgConfirmtxt}>Confirm</Text>
                                </Pressable>
                            </>
                        }
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        {back !== null || img3 &&
                            <>
                                <Pressable onPress={() => {
                                    navigation.navigate('ViewFullImage', { uri: !img3 ? back.uri : img3 })
                                }}>
                                    <Image source={{ uri: !img3 ? back.uri : img3 }} style={styles.docImage} />
                                </Pressable>
                                <Pressable style={img3 ? styles.imgConfirmbtndone : styles.imgConfirmbtn} onPress={() => {
                                    uploadImage('back')
                                }}>
                                    <Text style={img3 ? styles.imgConfirmtxtdone : styles.imgConfirmtxt}>Confirm</Text>
                                </Pressable>
                            </>
                        }
                    </View>

                </View>
                <Spacer height={30} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default TenantProfileScreen

const styles = StyleSheet.create({
    imgConfirmbtn: {
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10
    },
    imgConfirmbtndone: {
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,
        backgroundColor: Colors.green,
        borderColor: Colors.green
    },
    imgConfirmtxt: {
        fontSize: fontSize.small,
        color: Colors.black
    },
    imgConfirmtxtdone: {
        fontSize: fontSize.small,
        color: Colors.white
    },
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