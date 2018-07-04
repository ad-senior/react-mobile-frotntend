import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20, 
    justifyContent: 'space-between'
  },
  searchSection: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    backgroundColor: 'white'
  },
  TextInputStyleClass: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
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
})
