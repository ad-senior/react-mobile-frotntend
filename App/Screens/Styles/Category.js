import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import { platforms } from '../../Common/Strings';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: 'rgba(255,255,255, 1)'
  },
  panel: {
    flex: 0,
    flexDirection: 'row',
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
  searchIcon: {
    marginRight: 10,
    width: 30,
    height: 30
  },
  panelCategory: {
    flex: 0.5,
    margin: 12,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    aspectRatio: 1
  },
  mb20: {
    marginBottom: 20,
  },
  mb10: {
    marginBottom: 10
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
    marginTop: 10,
    height:50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  image: {
    height:25,
    width: 25,
  },
  imageContainer2: {},
  appName: {
    textAlign: 'center',
    flex: 1,
    paddingLeft: 0,
    fontSize: 26,
    color: '#000',
    fontStyle: 'normal'
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
    flex: 1,
    paddingLeft: 10,
    height: 50,
  },
  statusBarBackground: {
    height: (Platform.OS === platforms.ios) ? 20 : 0, // this is just to test ios
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
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 5
  }
})
