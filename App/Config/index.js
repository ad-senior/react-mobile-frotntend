import { Text } from 'react-native'
import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig'
import MockData from './MockData'
import API_URL from './Api'

Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling

export const BASE_URL = API_URL.PATH;
export const Data = MockData;

if (__DEV__) {
  console.disableYellowBox = DebugConfig.yellowBox
}
