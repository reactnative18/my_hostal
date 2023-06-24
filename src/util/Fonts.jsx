import { moderateScale } from 'react-native-size-matters';


const fontSize = {
    h1: moderateScale(38, 0.4),
    h2: moderateScale(34, 0.4),
    h3: moderateScale(30, 0.4),
    h4: moderateScale(26, 0.4),
    h5: moderateScale(20, 0.6),
    h6: moderateScale(19, 0.5),
    input: moderateScale(18, 0.3),
    regular: moderateScale(16, 0.3),
    medium: moderateScale(14, 0.4),
    small: moderateScale(12, 0.4),
    das: moderateScale(10, 0.4),
    tiny: moderateScale(8.5, 0.4),
    pis: moderateScale(6, 0.4),
}
const fontFamily = {
    bold: 'Roboto-Bold',
    boldItalic: 'Roboto-BoldItalic',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    light: 'Roboto-Light',
    thin: 'Roboto-Thin',
    italic: 'Roboto-Italic',
    black: 'Roboto-Black',
    blackItalic: 'Roboto-BlackItalic',

}
export {
    fontFamily,
    fontSize
} 