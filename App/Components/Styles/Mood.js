import { StyleSheet } from 'react-native'
import colors from '../../Themes/Colors.js'

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
    width: 52,
    height: 52,
    borderRadius: 30,
    elevation: 2,
    backgroundColor: colors.secondary,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    position:'relative',
  },
  image: {
    width: 52,
    height: 52,
    
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 10
  }
})
