import { Pressable, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listUser, userInfo } from '../redux/action'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../util/Loader'
import styles from '../util/Styles'
import { FlatList } from 'react-native-gesture-handler'
import { Colors } from '../util/Colors'
import FocusStatusBar from '../Components/FocusStatusBar/FocusStatusBar'

const Main = ({ navigation }) => {
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => state.userData)
    useEffect(() => {
        dispatch(listUser())
    }, [dispatch])
    const renderItem = ({ item, index }) => {
        return <Pressable
            onPress={() => {
                dispatch(userInfo(item))
                navigation.navigate('UserInfo')
            }}
            style={styles.listContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </Pressable>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <FocusStatusBar backgroundColor={Colors.blue} barStyle='light-content' />
            <Text style={styles.headingText}>My Application</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default Main

