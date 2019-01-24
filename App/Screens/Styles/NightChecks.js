import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20, 
    justifyContent: 'space-between'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:47
  },
  textInputTime: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: '#0066FF'
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
  textContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },
  textActive: {
    color: '#0066FF',
    fontFamily:"WorkSans-Medium"
  },
  textInactive: {
    color: '#ccc',
    fontFamily:"WorkSans-Medium"
  }
})
