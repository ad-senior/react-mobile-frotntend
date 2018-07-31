import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Bold',
    color: 'black'
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50
  },
  menuIcon: {
    height: 18,
    width: 20
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1
  },
  separated: {
    width: 6,
    marginLeft: -20,
    marginTop: -10,
  },
  recordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 30, 
    paddingRight: 30,
    borderRadius: 45
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modal: {
    width: '70%',
    minHeight: '20%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white'
  },
  recordIcon: {
    height: 20,
    width: 14
  },
  recordText: {
    marginLeft: 5,
    textAlign: 'left',
    color: '#5e5e5e',
    fontSize: 15
  },
  button: {
    flex: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 45,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonText: {
    fontFamily: 'WorkSans-Bold',
  },
  buttonRecord: {
    flex: 1,
    textAlign: 'center'
  },
  buttonIconContainer:{
    right: -1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    backgroundColor: '#686868'
  },
})
