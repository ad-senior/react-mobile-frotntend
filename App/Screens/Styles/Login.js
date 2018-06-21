import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  logoContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 256,
    height: 256,
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#eeeeee',
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#cccccc',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  check: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 4,
    color: '#666'
  },
  forgotten: {
    marginRight: 0,
    paddingRight: 0,
    fontSize: 12,
    fontWeight: '100',
    marginTop: 4,
    textDecorationLine: 'underline',
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
})
