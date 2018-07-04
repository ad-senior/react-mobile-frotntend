import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

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
  containerForm: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DDD'
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
    fontWeight: 'bold'
  },
  textInputForm: {
    height: 40,
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
  itemRequired: {
    color: 'red',
    borderColor: 'red'
  },
  titleForm: {
    textAlign: 'center',
    flex: 1,
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 10
  },  
  button: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 10
  }
})
