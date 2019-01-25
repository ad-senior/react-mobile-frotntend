import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20, 
    justifyContent: 'space-between'
  },
  inputTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputTouchableContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  textInputTime: {
    marginLeft: 5,
    borderBottomWidth: 1,
    borderColor:"#0066FF",
    color: 'grey',
    fontSize: 40
  },
  indoorBtn: {
    margin: 0,
    borderWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  indoorView:{
    height:60
  },
  modal: {
    width: '70%',
    maxHeight: '60%',
    minHeight: '20%',
    borderRadius: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  checkboxView:{
    marginTop:50,
    marginHorizontal:10,
    color:'#B2B2B2'
  },
  outdoorBtn: {
    margin: 0,
    borderWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  notesThoughts:{
    flex:1,
    flexDirection:'row',
    height:80,
    marginHorizontal:-20,
    marginTop:39,
    backgroundColor:'#FDFFC7',
    alignItems:'center',
    justifyContent:'center',
  },
  notesThoughtsView:{
    width: 20,
    height: 20,
    borderRadius:12.5,
    borderColor: '#0066FF',
    borderWidth:1,
    alignItems: 'center',
    justifyContent:'center'
  },
  notesThoughtText:{
    color: '#B2B2B2',
    fontSize:16,
    fontFamily:"WorkSans-SemiBold"
  },
  timePicker: {
    width: 40,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    height: 200
  },
  timePickerLine: {
    position: "absolute",
    borderBottomColor: "#595959",
    borderTopColor: "#595959",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    height: 80,
    width: 75
  },
  flexRow: {
    flex: 0,
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  sliderView: {
    marginVertical: 50
  },
  textContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },
  textActive: {
    color: '#0066FF'
  },
  textInactive: {
    color: '#ccc'
  },
  picker: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
