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
    width: 65
  },
  trackCustom: {
    height: 32.5,
    borderRadius: 50,    
    marginLeft: 10,
    marginRight: 10,    
  },
  linearGradient: {
    borderRadius: 50,    
    marginLeft: 10,
    marginRight: 10,    
    height: 32.5,
  }
})
