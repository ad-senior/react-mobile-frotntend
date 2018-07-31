import React, { Component } from 'react'
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux'
import { EventDispatcher } from "../Actions";
import styles from './Styles/Login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUser: 'bench.p',
      inputPass: 'test',
    }
    this.image = require('../Images/default/notepad-2.png');
  }

  _userLogin() {
    if (this.state.inputUser.length > 0 && this.state.inputPass.length > 0) {
      this.props.login({username: this.state.inputUser, password: this.state.inputPass})
        .then(async (response) => {
          let data = response.loginSuccess;
          if (data.error){
            Alert.alert(
              'Invalid login details. Please try again.',
              null,
              [{text: 'Close'}]
            )
          }else{
            const { navigate } = this.props.navigation;
            await AsyncStorage.setItem('token', data.access);
            await AsyncStorage.setItem('refresh', data.refresh);
            this.props.fetchMood()
            navigate('HomeScreen');
          }
        })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={this.image} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#cccccc"
            underlineColorAndroid="transparent"
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
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
      </KeyboardAvoidingView>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  login: (userData) => EventDispatcher.Login(userData, dispatch),
  fetchMood: () => EventDispatcher.FetchMood(dispatch)
});

export default connect(null, dispatchToProps)(Login)
