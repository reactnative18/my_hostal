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
import { fontFamily } from './src/util/Fonts';
import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home/Home';

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
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{
        title: 'Home',
        drawerType: 'slide',

      }} />
    </Drawer.Navigator>

  )
}

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={
        {
          tabBarContentContainerStyle: {
            backgroundColor: Colors.black
          },
          tabBarActiveTintColor: Colors.white,
          tabBarLabelStyle: { fontFamily: fontFamily.black, fontSize: 15 }
        }
      }
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