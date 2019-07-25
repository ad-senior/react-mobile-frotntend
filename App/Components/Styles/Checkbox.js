import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    borderParent: {
        borderWidth: 1,
        borderColor:"#CCCCCC",
        borderRadius: 5,
        width: 17,
        height: 17,
    },
    border:{
        flex: 1,
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 2,
        marginRight: 2,
        marginLeft: 2,
        marginBottom: 2
    },
    borderParentChecked:{
        borderWidth: 1,
        borderColor:"#0066FF",
        borderRadius: 5,
        width: 17,
        height: 17,
    },
    bgActive: {
        backgroundColor: '#0066FF'
    },
    titleActive: {
        color: '#0066FF'
    },
    titleRedActive: {
        color: 'red'
    },
    title: {
        marginHorizontal: 20
    },
});
