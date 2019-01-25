import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  main: {
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch', borderColor: "#E0E0E0", borderWidth: 1, borderLeftWidth: 0,

  },
  first: {
    borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderLeftWidth: 1
  },
  last: {
    borderBottomRightRadius: 20, borderTopRightRadius: 20
  },
  checked: {
    borderColor: "#0066FF",
    borderWidth: 1,
    borderLeftWidth: 1
  },
  activeText: {
    color:"#0066FF"
  },
  
  inActiveText: {
    color:'#ccc'
  }

})
