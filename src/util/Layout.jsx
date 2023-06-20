import React from 'react';
import { Dimensions } from 'react-native';
const REFERENCE_WIDTH = 414;
const REFERENCE_HEIGHT = 736;

const { height, width } = Dimensions.get('window');

const horizScale = (val) => width * (val / REFERENCE_WIDTH);

const vertScale = (val) => height * (val / REFERENCE_HEIGHT);

export {
    horizScale,
    vertScale,
}