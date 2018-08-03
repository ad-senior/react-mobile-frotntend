import { StyleSheet } from 'react-native'
const Dimensions = require('Dimensions')

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 20
  },
  sliderCustom: {
    height: 75,
    width: Dimensions.get('window').width - 45,
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
    marginLeft: 10,
    marginRight: 10,

  },
  linearGradient: {
    borderRadius: 50,
    marginLeft: 0,
    marginRight: 0,
    height: 30,
    justifyContent: 'space-around',
    flex: 1,
    overflow:'visible',
    
  }
})
