import { StyleSheet } from 'react-native'
import colors from '../../Themes/Colors.js'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: colors.header
  },
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems:"center"
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  subContainerColumn: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 0,
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    padding: 20
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
    color:'#B2B2B2',
    fontSize:16,
    fontFamily:"WorkSans-SemiBold"
  },
})
