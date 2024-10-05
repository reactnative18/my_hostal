import Toast from 'react-native-simple-toast';
import { Colors } from '../../util/Colors';
function successShowToast(message) {
    return Toast.showWithGravity(message, Toast.LONG, Toast.TOP, {
        backgroundColor: Colors.green,
    });
}

function WarningShowToast(message) {
    return Toast.showWithGravity(message, Toast.LONG, Toast.TOP, {
        backgroundColor: Colors.yellow,
    });

}

function FailureShowToast(message) {
    return Toast.showWithGravity(message, Toast.LONG, Toast.TOP, {
        backgroundColor: Colors.red,
    });
}
export default {
    successShowToast,
    WarningShowToast,
    FailureShowToast,
};
