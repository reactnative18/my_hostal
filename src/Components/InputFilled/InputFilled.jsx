import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { horizScale, vertScale } from '../../util/Layout';
import { Colors } from '../../util/Colors';
import { fontFamily, fontSize } from '../../util/Fonts';
import CustomImage from '../../util/Images';

const InputFilled = (props) => {
    const [eye, setEye] = useState(true)
    const renderField = () => {
        switch (props.type) {
            case "Email":
                return <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={Colors.grey}
                    keyboardType='email-address'
                    style={{ ...styles.input, borderBottomColor: props.value ? Colors.blue : Colors.grey }}
                    value={props.value}
                    onChangeText={text => props.onChangeText(text)}
                />
            case "Password":
                return <View style={{ ...styles.passwordView, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    <TextInput
                        placeholder={props.placeholder}
                        placeholderTextColor={Colors.grey}
                        secureTextEntry={eye}
                        style={{ ...styles.input, width: '90%', borderBottomWidth: 0, }}
                        value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                    />
                    <TouchableOpacity onPress={() => setEye(!eye)}>

                        <Image source={eye ? CustomImage.eyeHide : CustomImage.eye} style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>
            default:
                return null;
        }
    }

    return (
        <View style={styles.view}>
            <View style={{ ...styles.subView, flex: 0.15 }}>

                <Image source={props.icon} style={{ ...styles.smallIcon, tintColor: props.value ? Colors.blue : Colors.grey }} />
            </View>
            <View style={{ ...styles.subView, flex: 0.8 }}>
                {
                    renderField()
                }
            </View>
        </View>

    )

}

export default InputFilled

const styles = StyleSheet.create({
    passwordView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.grey,
        borderBottomWidth: horizScale(1.5),
    },
    subView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    smallIcon: {
        height: horizScale(18),
        width: horizScale(18),
        resizeMode: 'contain',
        tintColor: Colors.grey,
        marginTop: vertScale(5)
    },
    eyeIcon: {
        height: horizScale(18),
        width: horizScale(18),
        resizeMode: 'contain',
        marginTop: vertScale(5),
        tintColor: Colors.black
    },
    input: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: horizScale(1.5),
        width: '100%',
        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    }
})