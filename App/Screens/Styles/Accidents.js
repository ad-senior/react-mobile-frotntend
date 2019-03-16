import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    subContainer: {
        flex: 0,
        flexDirection: 'row',
        marginBottom: 0,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    textInputTime: {
        marginLeft: 5,
        fontFamily: 'WorkSans-Light',
        color: 'black',
        fontSize: 50,
    },
    textTime: {
        marginLeft: 5,
        textDecorationLine: 'underline',
        color: '#0066FF'
    },
    inputTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputTime: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    flexWrap: {
        flexWrap: 'wrap',
    },
    spaceAround: {
        justifyContent: 'space-evenly'
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textActive: {
        color: '#0066FF'
    },
    textInActive: {
        color: '#8F8F8F'
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
    image: {
        marginLeft: 5,
        width: 12,
        height: 8
    },
});
