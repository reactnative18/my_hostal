import { StyleSheet } from 'react-native';
import { horizScale } from '../../../util/Layout';
import { fontFamily } from '../../../util/Fonts';
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
        width: horizScale(200),
        height: horizScale(200),
        resizeMode: 'contain',
    },
    text: {
        fontSize: 24,
        fontFamily: fontFamily.blackItalic,
        marginTop: horizScale(16),
        color: 'black'
    },
});
export { styles }