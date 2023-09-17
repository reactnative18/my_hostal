import { Alert } from 'react-native'
const ShowAlert = (props) => {
    Alert.alert(props.title, props.message, [{
        text: 'YES',
        onPress: () => { return true }
    }, {
        text: 'No',
        onPress: () => { return false }
    },

    ]
    )
}
export default ShowAlert
