import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../../../util/Colors';
import { fontFamily, fontSize } from '../../../util/Fonts';
import HomeScreen from './HomeScreen';
import AvailableRoomScreen from '../AvailableRoom/AvailableRoomScreen';
import FilledRoomScreen from '../FilledRoom/FilledRoomScreen';
import { vertScale } from '../../../util/Layout';

const Tab = createMaterialTopTabNavigator();
const TopTabBar = () => {
    return (
        <Tab.Navigator

            style={{ height: vertScale(300), backgroundColor: Colors.appBack }}
            screenOptions={{
                tabBarContentContainerStyle: {
                    backgroundColor: Colors.black
                },
                tabBarActiveTintColor: Colors.white,
                tabBarLabelStyle: { fontFamily: fontFamily.black, fontSize: fontSize.regular },
                tabBarItemStyle: { flex: 1 },
                tabBarInactiveTintColor: Colors.gray,
                tabBarStyle: { backgroundColor: Colors.backWhite },
                tabBarIndicatorStyle: { color: Colors.green },
                tabBarPressColor: Colors.backWhite,

            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Home'
            }} />
            <Tab.Screen name="AvailableRoomScreen" component={AvailableRoomScreen} options={{
                title: 'Available Rooms'
            }} />
            <Tab.Screen name="FilledRoomScreen" component={FilledRoomScreen} options={{
                title: 'Filled Rooms'
            }} />
        </Tab.Navigator>

    )
}

export default TopTabBar

const styles = StyleSheet.create({})