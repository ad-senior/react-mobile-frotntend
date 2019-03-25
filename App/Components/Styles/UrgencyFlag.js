import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    fullWidth: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 15,
        marginTop: 30
    },
    separator: {
        borderRightColor: '#707070',
        borderRightWidth: 1,
        width: 1,
        height: "70%"
    },
    icon: {
        height: 50,
        width: 50,
        marginBottom: 10
    },
    flexRow: {
        flexDirection: "row"
    },
    checked: {
        width: "40%",
        paddingBottom: 18,
        paddingTop: 22,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 2
    },
    unchecked: {
        width: "40%",
        paddingBottom: 18,
        paddingTop: 22,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0,
        borderRadius: 2
    },
    button1: {
        borderColor: "#E25C4D",
    },
    button2: {
        borderColor: "#A2A2A2",
    },
    text1: {
        textAlign: "center",
        fontFamily: 'WorkSans-SemiBold',
        color: "#E25C4D",
        fontSize: 16
    },
    text2: {
        textAlign: "center",
        fontFamily: 'WorkSans-SemiBold',
        color: "#464646",
        fontSize: 16
    }
});
