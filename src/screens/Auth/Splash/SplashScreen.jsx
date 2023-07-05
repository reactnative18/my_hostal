import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated, ImageBackground } from 'react-native';
import CustomImage from '../../../util/Images';
import { styles } from './style';
import FocusStatusBar from '../../../Components/FocusStatusBar/FocusStatusBar';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // 2000 milliseconds = 2 seconds
            useNativeDriver: true,
        }).start();

        const delay = setTimeout(() => {
            navigation.replace('AuthStack'); // Replace 'Home' with the name of your main screen
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(delay); // Cleanup the timeout on unmounting
    }, [fadeAnim, navigation]);

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
