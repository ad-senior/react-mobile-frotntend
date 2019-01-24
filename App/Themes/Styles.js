import { StyleSheet } from 'react-native'
import Colors from './Colors'
import { Platform } from 'react-native'
import colors from '../Themes/Colors.js'

const header = 'rgba(255, 255, 255, 1)'

const shadow = {
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  elevation: 5
}

const headerShadow = {
  ...shadow,
  shadowColor: 'rgba(174, 174, 174, 0.349019607843137)',
  backgroundColor: header
}

const squareShadow = {
  ...shadow,
  shadowColor: 'rgba(201, 201, 201, 0.349019607843137)',
  backgroundColor: 'rgba(255, 255, 255, 1)'
}

const button = {
  borderWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
  flex: 1,
  margin: 10,
}

export default StyleSheet.create({
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mt30: {
    marginTop: 30
  },
  mt53: {
    marginTop: 53
  },
  mt63: {
    marginTop: 63,
  },
  mt40: {
    marginTop: 40
  },
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  mb30: {
    marginBottom: 30
  },
  mb40: {
    marginBottom: 40
  },
  ml10: {
    marginLeft: 10
  },
  ml20: {
    marginLeft: 20
  },
  ml30: {
    marginLeft: 30
  },
  ml40: {
    marginLeft: 40
  },
  mh10: {
    marginHorizontal: 10
  },
  mh20: {
    marginHorizontal: 20
  },
  prl10: {
    paddingRight: 10,
    paddingLeft: 10
  },
  prl20: {
    paddingRight: 20,
    paddingLeft: 20
  },
  prl30: {
    paddingRight: 30,
    paddingLeft: 30
  },
  prl40: {
    paddingRight: 40,
    paddingLeft: 40
  },
  containerForm: {
    flex: 1,
    padding: 0,
    //backgroundColor: '#F5F5F5',
    backgroundColor: colors.secondary,
  },
  containerFormNew: {
    flex: 1,
    padding: 0,
    backgroundColor: Colors.snow,
    borderColor: Colors.bloodOrange,
    shadowOpacity: 1,
    elevation: 5
  },
  picker: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  pickerRequired: {
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  pickerBody: {
    color: '#0066FF'
  },
  pickerBodyRequired: {
    color: 'red'
  },
  buttonSubmit: {
    marginTop: 10,
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#0066FF',
    justifyContent: 'space-around',
    borderRadius: 40,
    alignItems: 'center'
  },
  textSubmit: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'WorkSans-Bold'
  },
  textInputForm: {
    // height: 50, <-- don't use: bugs overlay on text
    // backgroundColor: 'white',
    // paddingHorizontal: 10
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#0066FF',
    marginHorizontal:10,
  },
  textInputFormNew: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hilightBlue,
  },
  textInputBlue: {
    color: '#0019FF',
    padding: 0,
  },
  textQuestion: {
    color: '#333333',
    fontFamily: 'WorkSans-Medium',
  },
  addIcon: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageAddIcon: {
    height:40,
    width: 40,
    borderRadius: 64/2
  },
  mood: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: "WorkSans-Medium",
    color:"#464646"
  },
  moodRequired: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 28,
    color: 'red',
    borderColor: 'red',
    textAlign: 'center',
    fontFamily:"WorkSans-Medium"
  },
  inputRequired: {
    borderWidth: 1,
    borderColor: 'red',
    borderBottomColor: 'red'
  },
  itemRequired: {
    color: 'red',
    borderColor: 'red',
    borderBottomColor : 'red'
  },
  titleForm: {
    textAlign: 'center',
    flex: 1,
  },
  buttonActive: {
    ...button,
    borderColor: '#0066FF',
    paddingVertical:15,
    ...squareShadow,
  },
  buttonInActive: {
    ...button,
    borderColor: 'white',
    ...squareShadow,
    paddingVertical:15,
  },
  buttonRoundActive: {
    borderColor: 'white',
    borderRadius : 16,
  },
  buttonRoundInActive: {
    backgroundColor:'white',
    borderRadius : 16,
    shadowOffset:{  x:0,y:1  },
    shadowColor: '#0066FF',
    shadowOpacity: 0.2,
    shadowRadius:5,
    padding:0,
  },
  button: {
    ...button,
    borderColor: Colors.shadowHeader,
    shadowColor: Colors.shadowHeader,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius : 7,
    elevation: 5,
  },
  shadow: {
    ...headerShadow
  },
  card: {
    // ...headerShadow,
    // padding: 20
    ...headerShadow,
    shadowColor: Colors.shadowHeader,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius : 7,
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: Colors.snow,
    padding: 20
  },
  cardNew: {
    ...headerShadow,
    shadowColor: Colors.shadowHeader,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius : 7 ,
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: Colors.snow,
    padding: 20
  },
  square: {
    ...squareShadow
  },
  notesThoughts: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: -20,
    marginTop: 39,
    backgroundColor: '#FDFFC7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesThoughtsView: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    borderColor: '#0066FF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notesThoughtText: {
    color: '#B2B2B2',
    fontSize:16,
    fontFamily: 'WorkSans-SemiBold'
  },
})
