import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20, 
    justifyContent: 'space-between'
  },
  TextInputStyleClass: {
    flex: 1,
    paddingLeft: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
    width: 30,
    height: 30
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
