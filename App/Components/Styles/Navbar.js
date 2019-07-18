import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    backButton: {
        marginTop: 0
    },
    appName: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'WorkSans-SemiBold'
    },
    menuImage: {
        height: 20,
        width: 25
    },
    menuCarePlan: {
        height: 50,
        width: 50
    },
    menuText: {
        fontSize: 18,
        color: '#b8b8b8'
    },
    menuUserName: {
        fontSize: 18,
        color: '#000'
    }
});
