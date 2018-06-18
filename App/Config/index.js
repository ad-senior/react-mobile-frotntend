import { Text } from 'react-native'
import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig'
import API_URL from './Api'

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling

export const BASE_URL = API_URL.PATH;

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = DebugConfig.yellowBox
}
