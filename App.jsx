import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Main from './src/screens/Main';
import UserInfo from './src/screens/UserInfo';
import SplashScreen from './src/screens/Auth/Splash/SplashScreen';
import LoginScreen from './src/screens/Auth/Login/LoginScreen';
import SignupScreen from './src/screens/Auth/Signup/SignupScreen';
import HomeScreen from './src/screens/Home/Home/HomeScreen';
import SingleHostelScreen from './src/screens/Home/SingleHostel/SingleHostelScreen';
import SingleRoomScreen from './src/screens/Home/SingleRoom/SingleRoom';
import AvailableRoomScreen from './src/screens/Home/AvailableRoom/AvailableRoomScreen';
import FilledRoomScreen from './src/screens/Home/FilledRoom/FilledRoomScreen';
import AllocateBedScreen from './src/screens/Home/AllocateBed/AllocateBedScreen';
import { Colors } from './src/util/Colors';
import SingleFloorScreen from './src/screens/Home/SingleFloor/SingleFloorScreen';
import AuthMainScreen from './src/screens/Auth/AuthMain/AuthMainScreen';
import TermsConditionScreen from './src/screens/Auth/TermsCondition/TermsConditionScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { fontFamily, fontSize } from './src/util/Fonts';
import { Image, StyleSheet, View } from 'react-native';
import Home from './src/screens/Home/Home';
import DrawerContentScreen from './src/screens/Navigation/DrawerContent/DrawerContentScreen';
import { horizScale, vertScale } from './src/util/Layout';
import HostelManagmentScreen from './src/screens/Home/DrawerScreens/HostelManagment/HostelManagmentMain/HostelManagmentScreen';
import HostelFloorManagment from './src/screens/Home/DrawerScreens/HostelManagment/HostelFloor/HostelFloorManagment';
import HostelRoomManagment from './src/screens/Home/DrawerScreens/HostelManagment/HostelRoomManagment/HostelRoomManagment';
import HostelBedManagment from './src/screens/Home/DrawerScreens/HostelManagment/HostelBedManagment/HostelBedManagment';
import TenantProfileScreen from './src/screens/Home/DrawerScreens/HostelManagment/TenantProfile/TenantProfileScreen';
import ViewFullImage from './src/Components/ViewFullImage/ViewFullImage';
import AddHostel from './src/screens/Home/DrawerScreens/HostelManagment/HostelManagmentMain/AddHostel';
import AddFloor from './src/screens/Home/DrawerScreens/HostelManagment/HostelFloor/AddFloor';
import AddRoom from './src/screens/Home/DrawerScreens/HostelManagment/HostelRoomManagment/AddRoom';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='SplashScreen'
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />

          <Stack.Screen name="SingleHostelScreen" component={SingleHostelScreen} />
          <Stack.Screen name="SingleRoomScreen" component={SingleRoomScreen} />
          <Stack.Screen name="AllocateBedScreen" component={AllocateBedScreen} />
          <Stack.Screen name="SingleFloorScreen" component={SingleFloorScreen} />


          <Stack.Screen name="HostelManagmentScreen" component={HostelManagmentScreen} />
          <Stack.Screen name="AddHostel" component={AddHostel} />
          <Stack.Screen name="HostelFloorManagment" component={HostelFloorManagment} />
          <Stack.Screen name="AddFloor" component={AddFloor} />
          <Stack.Screen name="HostelRoomManagment" component={HostelRoomManagment} />
          <Stack.Screen name="AddRoom" component={AddRoom} />
          <Stack.Screen name="HostelBedManagment" component={HostelBedManagment} />
          <Stack.Screen name="TenantProfileScreen" component={TenantProfileScreen} />
          <Stack.Screen name="ViewFullImage" component={ViewFullImage} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='AuthMainScreen'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthMainScreen" component={AuthMainScreen} />
      <Stack.Screen name="TermsConditionScreen" component={TermsConditionScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  )
}


const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName='BottomTabBar'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: horizScale(250),
        },
        drawerType: 'frunt',
        overlayColor: 'transparent',
        drawerStatusBarAnimation: 'fade',
        drawerItemStyle: {
          height: vertScale(200),
          backgroundColor: 'red'
        }
      }}

      drawerContent={(props) => <DrawerContentScreen {...props} />}
    >
      <Drawer.Screen name="BottomTabBar" component={BottomTabBar} options={{
        title: 'Home',
        drawerType: 'slide',

      }} />
    </Drawer.Navigator>

  )
}
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from './src/util/Images';
const Tab = createMaterialBottomTabNavigator();
const BottomTabBar = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={Colors.white}
      barStyle={{
        backgroundColor: Colors.theme, height: vertScale(50),
        // paddingBottom: 5,
        backgroundColor: 'rgba(111, 35, 110 ,0.6)',
        position: 'absolute',
        borderRadius: horizScale(50),
        marginHorizontal: horizScale(20),
        overflow: 'hidden',
        marginBottom: vertScale(10),
        alignItems: 'center',
        justifyContent: 'space-around',

      }}
      labeled={false}
      style={{ backgroundColor: 'red' }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        tabBarLabel: 'Home',

        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name="home" color={focused ? Colors.theme : Colors.white} size={26} />
        ),
      }} />
      <Tab.Screen name="AvailableRoomScreen" component={AvailableRoomScreen} options={{
        tabBarLabel: 'Available Rooms',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              source={CustomImage.AvailableRoom}
              style={{
                height: horizScale(20),
                width: horizScale(20),
                tintColor: focused ? Colors.theme : Colors.white,
              }}
            />
          );
        },
      }} />
      <Tab.Screen name="FilledRoomScreen" component={FilledRoomScreen} options={{
        tabBarLabel: 'Filled Rooms',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              source={CustomImage.Door}
              style={{
                height: horizScale(20),
                width: horizScale(20),
                tintColor: focused ? Colors.theme : Colors.white,
              }}
            />
          );
        },
      }} />
    </Tab.Navigator>

  )
}
