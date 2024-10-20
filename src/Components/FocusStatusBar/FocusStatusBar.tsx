
import * as React from 'react';
import { View, StatusBar, StatusBarProps, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../util/Colors';

const FocusStatusBar = ({ backgroundColor, barStyle = "dark-content" }: StatusBarProps) => {
    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets()
    if (Platform.OS == 'android') {
        return isFocused ? <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle} /> : null
    }
    return (
        isFocused ? <View style={{ height: insets.top, backgroundColor: Colors.theme, position: 'absolute', width: '100%' }}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor={Colors.theme}
                barStyle={barStyle} />
        </View> : null
    );
}
export default FocusStatusBar
