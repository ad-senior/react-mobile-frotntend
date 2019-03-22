import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    main: {
        flexDirection: "row",
        borderRadius: 20,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 10,
        alignItems: "center",
    },
    item: {
        borderRadius: 20,
        height: 38,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    checked: {
        backgroundColor: "#0066FF"
    },
    unchecked: {
        backgroundColor: "white"
    },
    checkedText: {
        color: "white"
    },
    uncheckedText: {
        color: 'grey'
    }

});
