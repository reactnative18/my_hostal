import * as React from 'react'
import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

const FocusStatusBar = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
}
FocusStatusBar.propTypes = {
    backgroundColor: PropTypes.string,
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    barStyle: PropTypes.string,
};
export default FocusStatusBar