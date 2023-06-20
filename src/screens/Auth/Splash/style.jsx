import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    image: {
        width: scale(200),
        height: scale(200),
        resizeMode: 'contain',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: scale(16),
        color: 'black'
    },
});
export { styles }