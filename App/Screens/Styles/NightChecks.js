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
  textInputTime: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: 'blue',
    width: 75
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
    color: 'blue'
  },
  textInactive: {
    color: '#ccc'
  }
})
