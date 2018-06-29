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
  flexWrap: {
    paddingTop: 10,
    flexWrap: 'wrap'
  },
  alignItems: {
    alignItems: 'center'
  },
  textAlign: {
    textAlign: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  marginTB: {
    marginTop: 5,
    marginBottom: 5
  },
  marginLeft: {
    marginLeft: 20,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20
  },
  textCenter: {
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
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
  },
  image: {
    height:40,
    width: 40,
    borderRadius: 64/2
  },
  inActive: {
    color: 'black'
  },
  Active: {
    color: 'blue'
  },
  itemRequired: {
    color: 'red',
    borderColor: 'red'
  },
})

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    color: 'black',
  }
})

export const pickerSelectStylesRequired = StyleSheet.create({
  inputIOS: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    color: 'black',
  }
})

export const pickerSelectBodyStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'blue',
  }
})
