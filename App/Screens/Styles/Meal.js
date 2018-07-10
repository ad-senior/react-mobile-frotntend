import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DDD',
  },
  subContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  flexRow: {
    flex: 0,
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  subContainerColumn: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 5,
    justifyContent: 'space-between'
  },
})
