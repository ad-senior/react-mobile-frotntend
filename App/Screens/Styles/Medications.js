import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    subContainer: {
        flex: 0,
        flexDirection: 'row',
        marginBottom: 0,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    TextInputStyleClass: {
        flex: 1,
        paddingLeft: 10,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
        width: 30,
        height: 30
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
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textActive: {
        color: 'blue'
    },
    textInactive: {
        color: '#ccc'
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
});
