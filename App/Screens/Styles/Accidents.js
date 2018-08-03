import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

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
    textDecorationLine: 'underline',
    color: 'blue'
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
  textInactive: {
    color: '#ccc'
  }
})
