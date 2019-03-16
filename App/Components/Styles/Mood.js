import {StyleSheet} from 'react-native';
import colors from '../../Themes/Colors.js';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    moodContainer: {
        alignItems: 'center',
        width: '25%',
        padding: 5,

    },
    imgContainer: {
        width: 53,
        height: 54,
        borderRadius: 30,
        backgroundColor: colors.secondary,
        justifyContent:"center",
        alignItems:"center",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        position: 'relative',
    },
    image: {
        width: 75,
        height: 75,
        marginTop:2

    },
    text: {
        textAlign: 'center',
        fontSize: 12,
        paddingTop: 10
    }
});
