import { StyleSheet } from 'react-native'
import { Colors } from './Colors'
import { fontSize } from './Fonts'
import { horizScale } from './Layout'
const styles = StyleSheet.create({
    rowCenter: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: horizScale(10)
    },
    addressHeading: {
        marginHorizontal: horizScale(20),
        backgroundColor: Colors.grey,
        padding: horizScale(15),
        borderRadius: horizScale(10)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headingText: {
        backgroundColor: Colors.blue,
        color: Colors.white,
        width: '100%',
        height: horizScale(60),
        textAlignVertical: 'center',
        paddingLeft: horizScale(20),
        fontSize: fontSize.input,
        fontWeight: 'bold'
    },
    listContainer: {
        marginHorizontal: horizScale(2),
        marginVertical: horizScale(10),
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: horizScale(15),
        padding: horizScale(20)
    },
    name: {
        color: Colors.blue,
        fontSize: fontSize.regular,
        fontWeight: '600'
    },
    username: {
        color: Colors.blue,
        fontSize: fontSize.h5,
        fontWeight: 'bold'
    },
    email: {
        color: Colors.black,
        fontSize: fontSize.small,
        fontWeight: '500'
    },
    smallIcon: {
        height: horizScale(20),
        width: horizScale(20),
        resizeMode: "contain",
    },
    backView: {
        flexDirection: "row",
        marginLeft: horizScale(20),
        marginTop: horizScale(10),
        alignItems: "center",
    },
    backText: {
        color: Colors.darkgrey,
        marginLeft: horizScale(10),
        fontSize: fontSize.medium,
    },
    infoView: {
        margin: horizScale(20),
        padding: horizScale(30),
        backgroundColor: Colors.blueLight,
        borderRadius: horizScale(15)
    },
    testUnderline: {
        marginHorizontal: horizScale(20),
        height: horizScale(45),
        borderBottomWidth: horizScale(0.8),
        borderColor: Colors.grey,
        textAlignVertical: 'bottom',
        color: Colors.black,
        fontWeight: '600',
        fontSize: fontSize.regular
    }

})
export default styles