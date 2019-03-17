import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    main: {
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        borderColor: 'grey'
    },
    item: {
        borderRadius: 20,
        height: 40,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    checked: {
        backgroundColor: "#0066FF"
    },
    unchecked: {
        backgroundColor:"white"
    },
    checkedText: {
        color:"white"
    },
    uncheckedText: {
        color: 'grey'
    }

});
