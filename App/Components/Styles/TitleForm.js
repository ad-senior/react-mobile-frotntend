import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Bold',
    color: 'black'
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 50
  },
  menuIcon: {
    height: 22,
    width: 22
  },
})
