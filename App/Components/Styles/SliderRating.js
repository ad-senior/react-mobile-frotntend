import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 10,
        paddingLeft: 28,
        paddingRight:25
    },
    text: {
        textAlign: 'center',
        marginBottom: 20
    },
    textStep: {
        textAlign: 'left',
        padding: 0
    },
    sliderContainerUI: {
        position: 'relative',
        width: "100%",
        marginTop: 10,
        marginBottom: 20
    },
    sliderCustom: {
        height: 75,
        width: "100%",
        position: 'absolute',
        top: -22.5,
        left: 0
    },
    thumbCustom: {
        height: 65,
        width: 65,
        overflow:'visible',
    },
    trackCustom: {
        height: 32.5,
        borderRadius: 50,

    },
    linearGradient: {
        borderRadius: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 30,
        justifyContent: 'space-around',
        flex: 1,
        overflow:'visible',

    }
});
