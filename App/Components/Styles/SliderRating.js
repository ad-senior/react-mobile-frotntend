import { StyleSheet } from 'react-native'

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
  sliderCustom: {
    height: 70,
  },
  thumbCustom: {
    height: 65,
    width: 65,
    overflow:'visible'
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
    height: 50,
    justifyContent: 'space-around',
    flex: 1,
    overflow:'visible'
  }
})
