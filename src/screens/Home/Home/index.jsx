import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopTabBar from './TopTabBar'
import { Colors } from '../../../util/Colors'
import { vertScale } from '../../../util/Layout'

const Home = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>

                <Text style={{ color: 'white' }}>Home</Text>
            </View>
            <TopTabBar {...props} />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView: {
        backgroundColor: Colors.black,
        height: vertScale(60)
    }
})