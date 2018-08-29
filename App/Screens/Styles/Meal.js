import { StyleSheet } from 'react-native'
import colors from '../../Themes/Colors.js'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: colors.header
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
    flexDirection: 'row'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  subContainerColumn: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 0,
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    padding: 20
  }
})
