import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moodContainer: {
    alignItems: 'center',
    width: '25%',
  },
  image: {
    width: 52,
    height: 52,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  }
})
