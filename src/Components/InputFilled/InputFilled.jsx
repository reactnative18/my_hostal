import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getLocalDate, horizScale, vertScale } from '../../util/Layout';
import { Colors } from '../../util/Colors';
import { fontFamily, fontSize } from '../../util/Fonts';
import CustomImage from '../../util/Images';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
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
            default:
                return null;
        }
    }

    return (
        <View style={styles.view}>
            <View style={{ ...styles.subView, flex: 0.15 }}>
                {props.icon == false ? <Text>{props.iconText}</Text> :
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