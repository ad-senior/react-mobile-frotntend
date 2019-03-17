import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    subContainer: {
        flex: 0,
        flexDirection: 'row',
        marginBottom: 0,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    searchSection: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    TextInputStyleClass: {
        flex: 1,
        paddingLeft: 10,
        height: 50,
    },
    searchIcon: {
        marginBottom:10,
        width: 25,
        height: 25,
    },
    flexRow: {
        flex: 0,
        flexDirection: 'row',
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
        color: '#0066FF'
    },
    textInactive: {
        color: '#ccc'
    },
    icon: {
        height: 30,
        aspectRatio: 2.36
    }
});
