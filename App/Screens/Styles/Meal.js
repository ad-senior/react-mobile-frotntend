import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DDD',
  },
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  flexRow: {
    flex: 0,
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 0,
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  subContainerColumn: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#FFF',
    marginTop: 5,
    paddingVertical: 15
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    height: (Platform.OS === 'ios') ? 20 : 0,
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
    color: '#fff',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 5
  },
})

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 10,
    color: 'black',
  }
})
