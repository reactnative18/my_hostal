import React, { useEffect } from 'react';
import { View, Animated, ImageBackground } from 'react-native';
import CustomImage from '../../../util/Images';
import { styles } from './style';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';
import Auth from '../../../Auth';
import { apiService } from '../../../API_Services';
import { useDispatch } from 'react-redux';
import { userInfoAction } from '../../../redux/Actions/UserAction';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const fadeAnim = new Animated.Value(0);
    const getUser = async () => {
        const getAuth = await Auth.getAuth()
        if (getAuth) {
            const response = await apiService.getUser({ userId: getAuth?._id })
            if (response == false) {
                navigation.replace('AuthStack');
            } else if (response?.data?._id) {
                await dispatch(userInfoAction(response?.data))
                navigation.replace('HomeDrawer');
            } else {
                navigation.replace('AuthStack');
            }
        }
        else {
            navigation.replace('AuthStack');
        }
    }
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // 2000 milliseconds = 2 seconds
            useNativeDriver: true,
        }).start();
        getUser()
    }, [fadeAnim]);
    return (
        <View style={styles.container}>
            {/* <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image
                    source={CustomImage.logo}
                    style={styles.image}
                />
                <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                    Welcome To AP Hostel
                </Animated.Text>
            </Animated.View> */}
            <ImageBackground source={CustomImage.splashI} style={{ flex: 1, height: '100%', width: '100%' }}>
                <FocusStatusBar hidden={true} translucent={true} />
            </ImageBackground>
        </View>
    );
};



export default SplashScreen;
