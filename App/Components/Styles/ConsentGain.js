import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  panel: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  panelActive: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10
  },
  panelConsent: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    flex: 1,
    paddingLeft: 10,
    color: 'red'
  },
})
