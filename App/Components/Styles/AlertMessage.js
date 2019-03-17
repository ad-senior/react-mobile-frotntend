import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    alertContainer: {
        width: '100%',
    },
    alertBody: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 2,
        borderColor: '#3A3A3A',
        backgroundColor: '#3A3A3A'
    },
    message: {
        color: '#FFFFFF'
    },
    panelBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 30,
        height: 30
    },
    time: {
        fontSize: 15,
        color: '#D6D6D6'
    }
});
