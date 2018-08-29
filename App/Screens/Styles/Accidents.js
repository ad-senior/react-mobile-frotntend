import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  textInputTime: {
    marginLeft: 5,
    fontFamily: 'WorkSans-Light',
    color: 'black',
    fontSize: 50,
  },
  inputTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputTime: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  spaceAround: {
    justifyContent: 'space-evenly'
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textActive: {
    color: 'blue'
  },
  textInActive: {
    color: '#B2B2B2'
  }
})
