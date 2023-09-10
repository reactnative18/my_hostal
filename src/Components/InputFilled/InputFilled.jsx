import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getLocalDate, horizScale, vertScale } from '../../util/Layout';
import { Colors } from '../../util/Colors';
import { fontFamily, fontSize } from '../../util/Fonts';
import CustomImage from '../../util/Images';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
const InputFilled = (props) => {
    const [eye, setEye] = useState(true)
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState('');
    const [open1, setOpen1] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const datefunc = () => {
        return (

            <DatePicker
                modal
                title={'Choose Date'}
                mode="date"

                open={open1}
                date={date}
                onConfirm={date => {
                    setOpen1(false);
                    setDate(date);
                    props.onChangeText(getLocalDate(date))
                    setShowDate(getLocalDate(date));
                }}
                onCancel={() => {
                    setOpen1(false);
                }}
            />

        );
    };
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
                props.onChangeText(source)
            }
        });
    };
    const renderField = () => {
        switch (props.type) {
            case "Email":
                return <View style={{ ...styles.inputContainer, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    {props.value && <Text style={styles.titleText}>{props.placeholder}</Text>}

                    <TextInput
                        placeholder={props.placeholder}
                        placeholderTextColor={Colors.grey}
                        keyboardType='email-address'
                        style={{ ...styles.input, borderBottomColor: props.value ? Colors.blue : Colors.grey }}
                        value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                        editable={props?.editable}
                        multiline={props?.multiline}
                    />
                </View>
            case "Password":
                return <View style={{ ...styles.inputContainer, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    {props.value && <Text style={styles.titleText}>{props.placeholder}</Text>}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                </View>
            case "Mobile":
                return <View style={{ ...styles.inputContainer, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    {props.value && <Text style={styles.titleText}>{props.placeholder}</Text>}
                    <TextInput
                        placeholder={props.placeholder}
                        placeholderTextColor={Colors.grey}
                        keyboardType='number-pad'
                        style={{ ...styles.input, borderBottomColor: props.value ? Colors.blue : Colors.grey }}
                        value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                    />
                </View>
            case "Date":
                return <View style={{ ...styles.inputContainer, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    {props.value && <Text style={styles.titleText}>{props.placeholder}</Text>}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <TextInput
                            placeholder={props.placeholder}
                            placeholderTextColor={Colors.grey}
                            editable={false}
                            style={{ ...styles.input, width: '90%', borderBottomWidth: 0, }}
                            value={props.value}
                            onChangeText={text => props.onChangeText(text)}
                        />
                        {datefunc()}
                        <TouchableOpacity onPress={() => setOpen1(true)}>
                            <Image source={CustomImage.calendar} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            case "Dropdown":
                return <View style={{ ...styles.inputContainer, borderBottomColor: props.value ? Colors.blue : Colors.grey }}>
                    {props.value && <Text style={styles.titleText}>{props.placeholder}</Text>}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Dropdown
                            style={{ width: '100%' }}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={props.data}
                            search
                            mode='modal'
                            maxHeight={vertScale(500)}

                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? props.placeholder : '...'}
                            searchPlaceholder={props.placeholder}
                            value={props.value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                props.onChangeText(item.value);
                                setIsFocus(false);
                            }}

                        />
                    </View>
                </View>
            case "Image":
                return <View style={{ ...styles.inputContainer, borderBottomWidth: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {props.value ? <TouchableOpacity onPress={() => {
                            props.navigation.navigate('ViewFullImage', { uri: props.value })
                        }}>
                            <Image source={{ uri: props.value }} style={styles.image} />
                        </TouchableOpacity> : <Text style={styles.titleText}>{props.text}</Text>}
                        <TouchableOpacity onPress={() => handleImagePicker()}>
                            <Image source={CustomImage.camera} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            default:
                return null;
        }
    }

    return (
        <View style={styles.view}>
            <View style={{ ...styles.subView, flex: 0.15 }}>
                {props.icon == false ? <Text>{props.iconText}</Text> :
                    props.type != 'Image' &&

                    <Image source={props.icon} style={{ ...styles.smallIcon, tintColor: props.value ? Colors.blue : Colors.grey }} />}
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
    image: {
        height: horizScale(60),
        width: horizScale(60),
        resizeMode: 'cover'
    },

    titleText: {
        color: Colors.black,
        fontSize: fontSize.small,
        fontFamily: fontFamily.bold
    },
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

        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    },
    inputContainer: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: horizScale(1.5),
        width: '100%',


    }
})