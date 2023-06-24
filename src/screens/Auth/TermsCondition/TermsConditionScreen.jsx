import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, FlatList, View, Pressable, Image } from 'react-native'
import BackButton from '../../../Components/BackButton/BackButton'
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar'
import { Colors } from '../../../util/Colors'
import { Spacer, horizScale, normScale, vertScale } from '../../../util/Layout'
import { fontFamily, fontSize } from '../../../util/Fonts'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const TermsConditionScreen = ({ navigation }) => {
    const [agree, setAgree] = useState(false)
    const data = ['1 से 10 तक पैसा जमा करवाना होगा वरना 100 रु पेलेन्टी देना होगा',

        'हॉस्टल छोड़ने से 1 माह पहले बताना होगा',
        'सुबह चाय नास्ता 7 से 9 तक रहेगा',

        'लंच 11.30 से 2.30 तक',

        'डिनर 7.30 से 9.30 तक',

        'रूम में केटली. हिटर, प्रेस इंडेक्शन रखने पर लाईट बिल 500 रुअलग देना होगा',

        'रात को 11 बजे लॉक लग जायेगा जरुरी काम होने पर ही खुलेगा वरना पापा मम्मी से बात करवाना होगी',

        'खाना झुठा छोड़ने पर 50 रु अलग से चार्ज',

        'रुम के अन्दर बिना बताये कोई दोस्त या अन्य व्यक्ति को रखने पर 200 रू चार्ज लगेगा',

        'आपको कोई भी तकलीफ हो तो  इस नंबर पर काल करें 9755713752']
    const renderItem = ({ item, index }) => {
        return <Text style={styles.text}>{index + 1}. {item}</Text>
    }
    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Spacer height={5} />
            <BackButton navigation={navigation} text={'Back'} />
            <Spacer height={10} />
            <Text style={styles.headingText}>Terms & Condition</Text>
            <Spacer height={8} />
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            </View>
            <Spacer height={8} />
            <View style={styles.headerView}>
                <BouncyCheckbox
                    size={normScale(25)}
                    fillColor={Colors.green}
                    unfillColor={Colors.white}
                    disableText={true}
                    iconStyle={{ marginLeft: horizScale(20) }}
                    innerIconStyle={{
                        borderWidth: normScale(2),
                        borderColor: agree ? Colors.green : Colors.black,
                        borderRadius: 0,
                        backgroundColor: agree ? Colors.green : Colors.white,
                    }}
                    onPress={(isChecked) => { setAgree(isChecked) }}
                />
                <Text style={styles.termsConditionText}>I agree to all the <Text style={{ color: Colors.black, fontFamily: fontFamily.black }}>Terms & Condition</Text></Text>
            </View>
            <Spacer height={8} />

            <Pressable onPress={() => { navigation.navigate('SignupScreen') }} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default TermsConditionScreen

const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    termsConditionText: {
        color: Colors.black,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular,
        marginHorizontal: horizScale(8)
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
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize.regular,
        letterSpacing: normScale(1),
        fontFamily: fontFamily.boldItalic
    },
    headingText: {
        color: Colors.black,
        fontSize: fontSize.h4,
        fontFamily: fontFamily.black,
        marginHorizontal: horizScale(20),

    },
    text: {
        color: Colors.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
        marginHorizontal: horizScale(18),
        marginVertical: vertScale(8)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
})