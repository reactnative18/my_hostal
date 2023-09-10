import {
    Image, Pressable, SafeAreaView, ScrollView,
    TouchableOpacity,
    StyleSheet, Text, View,
    Linking
} from 'react-native'
import React, { useState } from 'react'
import FocusStatusBar from '../../../../Components/FocusStatusBar/FocusStatusBar'
import { Spacer, horizScale, normScale, vertScale } from '../../../../util/Layout'
import BackButton from '../../../../Components/BackButton/BackButton'
import { Colors } from '../../../../util/Colors'
import CustomImage from '../../../../util/Images'
import { fontFamily, fontSize } from '../../../../util/Fonts'
import InputFilled from '../../../../Components/InputFilled/InputFilled'


const Help = ({ navigation }) => {
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
            <BackButton navigation={navigation} text={'Back'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer height={25} />
                <Image source={CustomImage.help2} style={styles.image} />
                <Spacer height={25} />
                <Text style={styles.headingText}>Contact US</Text>
                <Spacer height={15} />
                <View style={styles.rowItem}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('mailto:18rohitbabu@gmail.com');
                        }}
                        style={styles.box}>
                        <Image source={CustomImage.email} style={styles.category} />
                        <Text style={styles.email}>18rohitbabu@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('tel:8959402332');
                        }}
                        style={styles.box}>
                        <Image source={CustomImage.telephone} style={styles.category} />
                        <Text style={styles.phone}>+91 8959402332</Text>
                    </TouchableOpacity>
                </View>
                <Spacer height={15} />

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

                <Spacer height={20} />
                <Text style={styles.headingText}>Need Any Help</Text>
                <Spacer height={15} />

                <InputFilled
                    type="Email"
                    placeholder={description ? "Description :)" : "Describe here..."}
                    value={description}
                    multiline={true}
                    onChangeText={text => setDescription(text)}
                    icon={CustomImage.description}
                />
                <Spacer height={20} />
                <Pressable onPress={() => {
                    alert('coming soon')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Spacer height={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Help

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: vertScale(150),
        width: vertScale(150),
        // borderRadius: horizScale(150)
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
    },
    email: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.das,
        color: Colors.black,
    },
    phone: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: Colors.black,
    }
})