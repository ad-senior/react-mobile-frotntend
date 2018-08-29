import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts.js'

const fontNormal = Fonts.sizeConfig.normal

export default StyleSheet.create({
  textinput: {
  	fontFamily: 'WorkSans-Regular',
    fontSize: fontNormal,

  },
  container: {
  	flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height: 60
  },
  defaultText: {
    fontFamily: 'WorkSans-Regular',
    fontSize: fontNormal
  }
})
