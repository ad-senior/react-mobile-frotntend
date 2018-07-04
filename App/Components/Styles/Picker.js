import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginLeft: 5,
    marginRight: 5,
    width: 12,
    height: 8
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '70%',
    maxHeight: '40%',
    minHeight: '20%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: 'white'
  },
  items: {
    marginTop: 20,
    color: 'black'
  },
})
