import { StyleSheet } from 'react-native'
import colors from '../../Themes/Colors.js'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    //backgroundColor: colors.header
  },
  input: {
    height: 40,
    backgroundColor: '#55efc4',
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
  },
  sectionList: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  postponeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  menuContainer:{
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5
  },
  timeIcon: {
    width: 13,
    height: 13
  },
  timeActive: {
    color: 'red'
  },
  image: {
    width: 20,
    height: 20
  },
  disable: {
    backgroundColor: '#e4e4e4'
  },
  disableText: {
    color: '#8e8e8e'
  },
  buttonImage: {
    height: 45,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  buttonText: {
    marginLeft: 10,
    textAlign: 'left',
    color: '#000',
    fontSize: 18
  },
  checkboxImage: {
    position: 'absolute',
    left: '80%',
  },
  check: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 4,
    color: '#666'
  },
  signup: {
    marginRight: 0,
    paddingRight: 0,
    fontSize: 12,
    fontWeight: '100',
    marginTop: 4,
    textDecorationLine: 'underline',
    color: '#16a085'
  },
  imageContainer: {
    height:64,
    width: 64,
    borderRadius: 64
  },
  portrait: {
    height:28,
    width: 28,
  },
  placeIcon: {
    height:15,
    width: 10,
    marginLeft: 10,
  },
  profileImage: {
    height: 52,
    width: 52,
    borderRadius: 30
  },
  profileDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  takeNoteIcon: {
    height: 18,
    width: 25,
  },
  takeNoteText: {
    paddingLeft: 10,
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  takeNote: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 23,
    paddingBottom: 23,
    backgroundColor: '#f65b43'
  },
  buttonTakeNote: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 45,
    paddingRight: 45,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35,
  },
  flex0: {
    flex: 0,
  },
  schedule: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.primary
  },
  appName: {
    textAlign: 'center',
    flex: 1,
    paddingLeft: 10
  },
  menuBackArrow: {
    textAlign: 'left'
  },
  menuHamburger: {
    textAlign: 'right'
  },
  profileName: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 10
  },
  profileAddr: {
    fontSize: 18,
    color: '#8c8c8c',
    paddingLeft: 10
  },
  textToday: {
    marginBottom: 10,
    textAlign: 'left'
  },
  textCompleted: {
    textAlign: 'left'
  }
})
