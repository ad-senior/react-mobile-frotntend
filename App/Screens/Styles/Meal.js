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
  flexWrap: {
    flexWrap: 'wrap',
  },
  alignItems: {
    alignItems: 'center'
  },
  subContainerColumn: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  textCenter: {
    textAlign: 'center'
  },
  marginTop: {
    marginTop: 10
  },
  marginTB: {
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
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
  image: {
    height:40,
    width: 40,
    borderRadius: 64/2
  },
  appName: {
    textAlign: 'center',
    flex: 1,
    paddingLeft: 10
  },
  itemRequired: {
    color: 'red',
    borderColor: 'red'
  }
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
