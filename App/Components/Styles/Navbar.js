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
    },
    profileImage: {
        height: 52,
        width: 52,
        borderRadius: 25
    },
    profileDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    placeIcon: {
        height:15,
        width: 10,
        marginLeft: 10,
    },
    profileName: {
        fontSize: 20,
        color: 'black',
        paddingLeft: 10
    },
    profileAddr: {
        fontSize: 18,
        color: '#8c8c8c',
        paddingLeft: 10
    }
});
