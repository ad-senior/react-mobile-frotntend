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
  inputTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInputTime: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: 'blue'
  },
  flexRow: {
    flex: 0,
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
})
