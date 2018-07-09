import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  alertContainer: {
    width: '100%',
  },
  alertBody: {
    margin: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#02d79a',
    backgroundColor: 'white'
  },
  message: {
    textAlign: 'center',
    color: '#02d79a'
  },
})
