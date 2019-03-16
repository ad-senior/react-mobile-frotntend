import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuText: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 24,
        color: 'black'
    },
    menuIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 50
    },
    menuIcon: {
        height: 18,
        width: 18
    },
});
