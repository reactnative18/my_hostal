// import React from 'react';
// import { Dimensions } from 'react-native';
// const REFERENCE_WIDTH = 414;
// const REFERENCE_HEIGHT = 736;

// const { height, width } = Dimensions.get('window');
// const fullWidth = Dimensions.get('window').width;
// const fullHeight = Dimensions.get('window').height;

// const horizScale = (val) => width * (val / REFERENCE_WIDTH);
// const normScale = (val) => width * (val / REFERENCE_WIDTH);

// const vertScale = (val) => height * (val / REFERENCE_HEIGHT);

// export {
//     horizScale,
//     vertScale,
//     normScale,
//     fullHeight,
//     fullWidth

// }
import { Dimensions, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const horizScale = (val) => scale(val)

const vertScale = (val) => verticalScale(val)
const normScale = (val) => moderateScale(val)


const Spacer = (props) => (
    <View style={{ width: '100%', height: vertScale(props.height) }} />
);
Spacer.propTypes = {
    height: PropTypes.number,
};

export {
    horizScale,
    vertScale,
    normScale,
    fullHeight,
    fullWidth,
    Spacer
}