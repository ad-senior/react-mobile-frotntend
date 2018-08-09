import { StyleSheet } from 'react-native'
import { Platform, Dimensions } from 'react-native'
import colors from '../Themes/Colors.js'

const {height, width} = Dimensions.get('window')
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
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  ml10: {
    marginLeft: 10
  },
  ml20: {
    marginLeft: 20
  },
  prl20: {
    paddingRight: 20,
    paddingLeft: 20
  },
  containerForm: {
    flex: 1,
    padding: 0,
    //backgroundColor: '#F5F5F5',
    backgroundColor: colors.secondary,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  pickerBody: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: 'blue'
  },
  pickerBodyRequired: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: 'red'
  },
  buttonSubmit: {
    marginTop: 10,
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'blue',
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
    fontSize: width / 24,
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10
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
    textAlign: 'center'
  },
  moodRequired: {
    marginTop: 10,
    marginBottom: 10,
    color: 'red',
    borderColor: 'red',
    textAlign: 'center'
  },
  inputRequired: {
    borderWidth: 1,
    borderColor: 'red'
  },
  itemRequired: {
    color: 'red',
    borderColor: 'red'
  },
  titleForm: {
    textAlign: 'center',
    flex: 1,
  },
  buttonActive: {
    ...button,
    borderColor: 'blue',
  },
  button: {
    ...button,
    borderColor: 'black',
  },
  shadow: {
    ...headerShadow
  },
  card: {
    ...headerShadow,
    padding: 20
  },
  square: {
    ...squareShadow
  }
})
