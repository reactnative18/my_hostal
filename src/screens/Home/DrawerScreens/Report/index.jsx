import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FocusStatusBar from '../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../util/Layout'
import BackButton from '../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../util/Colors'
import CustomImage from '../../../../util/Images'
import { fontFamily, fontSize } from '../../../../util/Fonts'
import InputFilled from '../../../../Components/InputFilled/InputFilled'


const ReportComplain = ({ navigation }) => {
    const [Complain, setComplain] = useState('')
    const ComplainList = [{ label: 'Maintenance', value: 'maintenance' },
    { label: 'Cleanliness', value: 'cleanliness' },
    { label: 'Noise', value: 'noise' }]
    const [description, setDescription] = useState(null)
    const [attachment, setAttachment] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Spacer height={10} />
            <BackButton navigation={navigation} text={'Report & Complain'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer height={25} />
                <Image source={CustomImage.report} style={styles.image} />
                <Spacer height={25} />
                <Text style={styles.headingText}>Complain Type</Text>
                <Spacer height={15} />
                <InputFilled
                    type="Dropdown"
                    placeholder="Select a complain..."
                    data={ComplainList}
                    value={Complain}
                    onChangeText={text => setComplain(text)}
                    icon={CustomImage.complain}
                />
                <Spacer height={20} />
                <Text style={styles.headingText}>Description</Text>
                <Spacer height={25} />

                <InputFilled
                    type="Email"
                    placeholder={description ? "Description :)" : "Describe here..."}
                    value={description}
                    multiline={true}
                    onChangeText={text => setDescription(text)}
                    icon={CustomImage.description}
                />
                <Spacer height={20} />
                <Text style={styles.headingText}>Any Attachment</Text>
                <Spacer height={25} />

                <InputFilled
                    type="Image"
                    text="Attachment"
                    navigation={navigation}
                    value={attachment}
                    onChangeText={text => setAttachment(text)}
                    icon={CustomImage.camera}
                />
                {/* <View style={styles.rowItem2}>
                    <View style={styles.box}>
                        <Image source={CustomImage.onetime} style={styles.category} />
                        <Text style={styles.normalText}>One Time Expense</Text>
                    </View>
                </View> */}
                <Spacer height={20} />
                <Pressable onPress={() => {
                    alert('coming soon')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <Spacer height={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReportComplain

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: vertScale(150),
        width: vertScale(150),
        borderRadius: horizScale(150)
    },
    button: {
        backgroundColor: Colors.black,
        borderRadius: normScale(60),
        // height: vertScale(60),
        width: '80%',
        // width: fullWidth - horizScale(80),/
        paddingHorizontal: horizScale(10),
        paddingVertical: vertScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: vertScale(10)
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    selectedImage: {
        position: 'absolute',
        right: horizScale(-5),
        top: horizScale(-5),
        tintColor: Colors.green,
        height: horizScale(18),
        width: horizScale(18),
        backgroundColor: Colors.white

    },
    category: {
        height: horizScale(30),
        width: horizScale(30),
        resizeMode: 'contain'
    },
    box: {
        borderWidth: horizScale(0.7),
        borderColor: Colors.black,
        borderRadius: horizScale(10),
        padding: horizScale(10),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: horizScale(90)
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    rowItem2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: horizScale(15)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headingText: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.input,
        color: Colors.black,
        paddingHorizontal: horizScale(15)
    },
    headingText2: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular,
        color: Colors.black,
    },
    normalText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.medium,
        color: Colors.black,
    }
})