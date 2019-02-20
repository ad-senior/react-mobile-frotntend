import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import NfcManager, {NdefParser} from 'react-native-nfc-manager';
// Styles
import styles from './Styles/RootContainerStyles'
import { platforms } from '../Common/Strings';

const RtdType = {
    URL: 0,
    TEXT: 1,
};

function strToBytes(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

function buildUrlPayload(valueToWrite) {
    const urlBytes = strToBytes(valueToWrite);
    // in this example, we always use `http://`
    const headerBytes = [0xD1, 0x01, (urlBytes.length + 1), 0x55, 0x03];
    return [...headerBytes, ...urlBytes];
}

function buildTextPayload(valueToWrite) {
    const textBytes = strToBytes(valueToWrite);
    // in this example. we always use `en`
    const headerBytes = [0xD1, 0x01, (textBytes.length + 3), 0x54, 0x02, 0x65, 0x6e];
    return [...headerBytes, ...textBytes];
}

class RootContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          supported: true,
          enabled: false,
          isWriting: false,
          urlToWrite: 'www.google.com',
          rtdType: RtdType.URL,
          parsedText: null,
          tag: {},
      }
  }
  
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            }
        })
  }

  componentWillUnmount() {
      if (this._stateChangedSubscription) {
          this._stateChangedSubscription.remove();
      }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }

  _requestFormat = () => {
      let {isWriting} = this.state;
      if (isWriting) {
          return;
      }

      this.setState({isWriting: true});
      NfcManager.requestNdefWrite(null, {format: true})
          .then(() => console.log('format completed'))
          .catch(err => console.warn(err))
          .then(() => this.setState({isWriting: false}));
  }

  _requestNdefWrite = () => {
      let {isWriting, urlToWrite, rtdType} = this.state;
      if (isWriting) {
          return;
      }

      let bytes;

      if (rtdType === RtdType.URL) {
          bytes = buildUrlPayload(urlToWrite);
      } else if (rtdType === RtdType.TEXT) {
          bytes = buildTextPayload(urlToWrite);
      }

      this.setState({isWriting: true});
      NfcManager.requestNdefWrite(bytes)
          .then(() => console.log('write completed'))
          .catch(err => console.warn(err))
          .then(() => this.setState({isWriting: false}));
  }

  _cancelNdefWrite = () => {
      this.setState({isWriting: false});
      NfcManager.cancelNdefWrite()
          .then(() => console.log('write cancelled'))
          .catch(err => console.warn(err))
  }

  _requestAndroidBeam = () => {
      let {isWriting, urlToWrite, rtdType} = this.state;
      if (isWriting) {
          return;
      }

      let bytes;

      if (rtdType === RtdType.URL) {
          bytes = buildUrlPayload(urlToWrite);
      } else if (rtdType === RtdType.TEXT) {
          bytes = buildTextPayload(urlToWrite);
      }

      this.setState({isWriting: true});
      NfcManager.setNdefPushMessage(bytes)
          .then(() => console.log('beam request completed'))
          .catch(err => console.warn(err))
  }

  _cancelAndroidBeam = () => {
      this.setState({isWriting: false});
      NfcManager.setNdefPushMessage(null)
          .then(() => console.log('beam cancelled'))
          .catch(err => console.warn(err))
  }

  _startNfc() {
      NfcManager.start({
          onSessionClosedIOS: () => {
              console.log('ios session closed');
          }
      })
          .then(result => {
              console.log('start OK', result);
          })
          .catch(error => {
              console.warn('start fail', error);
              this.setState({supported: false});
          })

      if (Platform.OS === platforms.android) {
          NfcManager.getLaunchTagEvent()
              .then(tag => {
                  console.log('launch tag', tag);
                  if (tag) {
                      this.setState({ tag });
                  }
              })
              .catch(err => {
                  console.log(err);
              })
          NfcManager.isEnabled()
              .then(enabled => {
                  this.setState({ enabled });
              })
              .catch(err => {
                  console.log(err);
              })
          NfcManager.onStateChanged(
              event => {
                  if (event.state === 'on') {
                      this.setState({enabled: true});
                  } else if (event.state === 'off') {
                      this.setState({enabled: false});
                  } else if (event.state === 'turning_on') {
                      // do whatever you want
                  } else if (event.state === 'turning_off') {
                      // do whatever you want
                  }
              }
          )
              .then(sub => {
                  this._stateChangedSubscription = sub;
                  // remember to call this._stateChangedSubscription.remove()
                  // when you don't want to listen to this anymore
              })
              .catch(err => {
                  console.warn(err);
              })
      }
  }

  _onTagDiscovered = tag => {
      console.log('Tag Discovered', tag);
      this.setState({ tag });
      let url = this._parseUri(tag);
      if (url) {
          Linking.openURL(url)
              .catch(err => {
                  console.warn(err);
              })
      }

      let text = this._parseText(tag);
      this.setState({parsedText: text});
  }

  _startDetection = () => {
      NfcManager.registerTagEvent(this._onTagDiscovered)
          .then(result => {
              console.log('registerTagEvent OK', result)
          })
          .catch(error => {
              console.warn('registerTagEvent fail', error)
          })
  }

  _stopDetection = () => {
      NfcManager.unregisterTagEvent()
          .then(result => {
              console.log('unregisterTagEvent OK', result)
          })
          .catch(error => {
              console.warn('unregisterTagEvent fail', error)
          })
  }

  _clearMessages = () => {
      this.setState({tag: null});
  }

  _goToNfcSetting = () => {
      if (Platform.OS === platforms.android) {
          NfcManager.goToNfcSetting()
              .then(result => {
                  console.log('goToNfcSetting OK', result)
              })
              .catch(error => {
                  console.warn('goToNfcSetting fail', error)
              })
      }
  }

  _parseUri = (tag) => {
      if (tag.ndefMessage) {
          let result = NdefParser.parseUri(tag.ndefMessage[0]),
              uri = result && result.uri;
          if (uri) {
              console.log('parseUri: ' + uri);
              return uri;
          }
      }
      return null;
  }

  _parseText = (tag) => {
      if (tag.ndefMessage) {
          return NdefParser.parseText(tag.ndefMessage[0]);
      }
      return null;
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
