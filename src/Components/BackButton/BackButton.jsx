import React from 'react'
import {
    StyleSheet, Text, View, Pressable,
    Image

} from 'react-native'
import CustomImage from '../../util/Images'
import { horizScale } from '../../util/Layout'
import { Colors } from '../../util/Colors'
import { fontFamily, fontSize } from '../../util/Fonts'

const BackButton = (props) => {
    return (
        <Pressable style={styles.backView} onPress={() => props.navigation.goBack()}>
            <Image source={CustomImage.back} style={styles.smallIcon} />
            <Text style={styles.backText}>{props.text}</Text>
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: horizScale(15)
    },
    smallIcon: {
        height: horizScale(18),
        width: horizScale(18),
        tintColor: Colors.black
    },
    backText: {
        color: Colors.black,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.medium,
        paddingLeft: horizScale(5)
    }
})