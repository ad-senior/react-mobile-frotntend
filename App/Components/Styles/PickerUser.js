import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginLeft: 5,
    marginRight: 5,
    width: 20,
    height: 20
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modal: {
    width: '70%',
    maxHeight: '50%',
    minHeight: '20%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: 'white'
  },
  items: {
    marginTop: 20,
  },
  searchSection: {
    flex: 0,
    marginTop: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  TextInputStyleClass: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
    width: 20,
    height: 20
  },
})
