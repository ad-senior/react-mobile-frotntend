import React, { Component } from 'react'
import {
  StyleSheet,
  View, Text, Image,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  CheckBox,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { EventDispatcher } from "../Actions";
import LoginRedux from '../Redux/LoginRedux'
// Styles
import styles from './Styles/Login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      inputUser: '',
      inputPass: '',
    }
  }

  _userLogin() {
    if (this.state.inputUser.length > 0 && this.state.inputPass.length > 0) {
      // fetch("http://pegasus.moharadev.com:7071/api/token/", {
      //   method: "POST",
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username: this.state.inputUser,
      //     password: this.state.inputPass,
      //   })
      // })
      // .then((response) => response.json())
      // .then((responseData) => {
      //   if(responseData.access != undefined && responseData.refresh != undefined) {
      //     //const { navigate } = this.props.navigation;
      //     //navigate('HomeScreen', { name: 'Jane' })
      //   }
      // })
      // .done();
      this.props.login({ 
        username: this.state.inputUser,
        password: this.state.inputPass,
      });
    }
  }

  rederData() {
    let { userData } = this.props;
    console.log(userData);
    return null
  }

  render () {
    return (
	  <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../Images/default/notepad-2.png')} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#cccccc"
            underlineColorAndroid="transparent"
            returnKeyType="next"
            autoCorrect={false}
            ref={(input) => this.inputUser = input}
            onSubmitEditing={() => this.inputPass.focus()}
            onChangeText={(text) => this.setState({inputUser:text})}
            value={this.state.inputUser}
            style={styles.input}
          />
          <TextInput style={styles.input}
            placeholder="Password"
            placeholderTextColor="#cccccc"
            underlineColorAndroid="transparent"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input) => this.inputPass = input}
            onChangeText={(text) => this.setState({inputPass:text})}
            value={this.state.inputPass}
          />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._userLogin()}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          {this.rederData()}
        </KeyboardAvoidingView>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  login: (userData) => EventDispatcher.Login(userData, dispatch)
});

const stateToProps = (state) => {
  return {
    userData: state.login.results
  };
}

export default connect(stateToProps, dispatchToProps)(Login)
