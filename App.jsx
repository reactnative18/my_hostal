import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
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
import { Image } from 'react-native';
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
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationMain />
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
const NavigationMain = () => {
  const { loading } = useSelector(state => state.loader)
  return (
    <>
      <Loader loading={loading} />
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
          <Stack.Screen name="AddBed" component={AddBed} />
          <Stack.Screen name="TenantProfileScreen" component={TenantProfileScreen} />
          <Stack.Screen name="ViewFullImage" component={ViewFullImage} />
          <Stack.Screen name="ShiftScreen" component={ShiftScreen} />
          <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
          <Stack.Screen name="Expenses" component={Expenses} />
          <Stack.Screen name="ExpensesEntry" component={ExpensesEntry} />
          <Stack.Screen name="Notification" component={Notification} />


        </Stack.Navigator>
      </NavigationContainer>
    </>

  )
}

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
        }
      }}

      drawerContent={(props) => <DrawerContentScreen {...props} />}
    >
      <Drawer.Screen name="BottomTabBar" component={BottomTabBar} options={{
        title: 'Home',
        drawerType: 'slide',

      }} />
      <Drawer.Screen name="ReportComplain" component={ReportComplain} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>

  )
}
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from './src/util/Images';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShiftScreen from './src/screens/Home/AvailableRoom/ShiftScreen';
import SwipeScreen from './src/screens/Home/FilledRoom/SwipeScreen';
import Expenses from './src/screens/Home/DrawerScreens/HostelManagment/Expenses';
import ExpensesEntry from './src/screens/Home/DrawerScreens/HostelManagment/Expenses/ExpensesEntry';
import ReportComplain from './src/screens/Home/DrawerScreens/Report';
import Feedback from './src/screens/Home/DrawerScreens/Feedback';
import Help from './src/screens/Home/DrawerScreens/Help';
import Notification from './src/screens/Home/Notification';
import Loader from './src/util/Loader';
import AddBed from './src/screens/Home/DrawerScreens/HostelManagment/HostelBedManagment/AddBed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        tabBarActiveBackgroundColor: Colors.theme,
        tabBarInactiveBackgroundColor: Colors.theme,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.darkgrey,
        tabBarStyle: {
          height: horizScale(80),
          backgroundColor: 'rgba(52,52,52,0.000001)',
          position: 'absolute',
          borderWidth: 0,
          marginHorizontal: horizScale(16),
          marginBottom: vertScale(5),

          borderBottomLeftRadius: horizScale(40),
          borderBottomRightRadius: horizScale(40),
          borderTopLeftRadius: horizScale(40),
          borderTopRightRadius: horizScale(40),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarLabelStyle: {

          paddingBottom: vertScale(10),
        },
        tabBarIconStyle: {
          height: vertScale(20),
          width: horizScale(20),
          marginTop: horizScale(7)
        },


        headerShown: false,
        tabBarHideOnKeyboard: true,

      }}

    >

      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              source={CustomImage.home}
              style={{
                height: horizScale(20),
                width: horizScale(20),
                tintColor: focused ? Colors.white : Colors.darkgrey,
              }}
            />
          );
        },
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
                tintColor: focused ? Colors.white : Colors.darkgrey,
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
                tintColor: focused ? Colors.white : Colors.darkgrey,
              }}
            />
          );
        },
      }} />
    </Tab.Navigator>

  )
}
