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

const getLocalDate = (strDate) => {
    var date = new Date(strDate);

    var dd = date.getDate()
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + "-" + mm + "-" + yyyy;
    return date.toString();
}


export {
    horizScale,
    vertScale,
    normScale,
    fullHeight,
    fullWidth,
    Spacer,
    getLocalDate
}