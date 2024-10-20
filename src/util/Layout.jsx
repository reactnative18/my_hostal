import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale, scale } from 'react-native-size-matters';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;


const horizScale = (val) => moderateScale(val);
const normScale = (val) => scale(val);

const vertScale = (val) => moderateScale(val);





const Spacer = (props) => (
    <View style={{ width: '100%', height: vertScale(props.height), backgroundColor: 'transparent' }} />
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