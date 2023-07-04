
import { SafeAreaView, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Spacer } from '../../util/Layout'
import FocusStatusBar from '../FocusStatusBar/FocusStatusBar'
import { Colors } from '../../util/Colors'
import BackButton from '../BackButton/BackButton'
const ViewFullImage = ({ navigation, route }) => {
    const { uri } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Spacer height={8} />
            <FocusStatusBar translucent={false} backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.headerView}>
                <BackButton navigation={navigation} text={"Back"} />
            </View>
            <Spacer height={10} />
            <Image source={{ uri: uri }} style={styles.fullImage} />
        </SafeAreaView>
    )
}

export default ViewFullImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})