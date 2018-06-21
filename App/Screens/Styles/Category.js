import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DDD'
  },
  panel: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  panelCategory: {
    flex: 0.5,
    flexDirection: 'column',
    margin: 1,
  },
  mb20: {
    marginBottom: 20,
  },
  mb0: {
    marginBottom: 0,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#55efc4',
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#FFF',
    marginTop: 5,
    paddingVertical: 15
  },
  buttonInactive: {
    backgroundColor: '#FFF',
    marginTop: 5,
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12
  },
  check: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 4,
    color: '#666'
  },
  forgotten: {
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: '100',
    color: '#16a085'
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
  image: {
    height:32,
    width: 32,
    borderRadius: 64/2
  },
  imageContainer2: {

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
  profileImg: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF'
  },
  profileName: {
    fontSize: 12,
    fontWeight: '100',
    color: '#000',
    paddingLeft: 10
  },
  profileAddr: {
    fontSize: 12,
    fontWeight: '100',
    color: '#000',
    paddingLeft: 10
  },
  textToday: {
    textAlign: 'left'
  },
  textCompleted: {
    textAlign: 'left'
  },
  MainContainer : {
    justifyContent: 'center',
    flex:1,
    margin: 7,
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF",
    marginBottom: 15
  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : 0, // this is just to test ios
    backgroundColor: "white",
  },

  ImageComponentStyle: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    backgroundColor: '#4CAF50'
  },

  ItemTextStyle: {
    color: '#000000',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 5
  }
})
