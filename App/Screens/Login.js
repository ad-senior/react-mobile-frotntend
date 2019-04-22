import React, {Component} from 'react';
import {View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import {connect} from 'react-redux';
import {EventDispatcher} from "../Actions";
import Loading from '../Components/Loading';
import Geolocation from '../Components/Geolocation';
import styles from './Styles/Login';
import {emptyString} from '../Common/Strings';


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputUser: emptyString,
            inputPass: emptyString,
            submit: false,
            location: [null, null]
        };
        this.image = require('../Images/default/notepad-2.png');
    }

    _userLogin () {
        if (this.state.inputUser.length > 0 && this.state.inputPass.length > 0) {
            this.setState({submit: true});
            this.props.login({username: this.state.inputUser, password: this.state.inputPass})
                .then(async (response) => {
                    if (response.type === "LOGIN_SUCCESS") {
                        let data = response.loginSuccess;
                        if (data.error) {
                            this.setState({submit: false});
                            Alert.alert(
                                'Invalid login details. Please try again.',
                                null,
                                [{text: 'Close'}]
                            );
                        } else {
                            const {navigate} = this.props.navigation;
                            
                            await AsyncStorage.setItem('token', data.access);
                            await AsyncStorage.setItem('refresh', data.refresh);
                            this.props.fetchMood();
                            this.props.fetchMealMenu();
                            this.props.fetchCarePlan();
                            this.setState({submit: false});
                            if(data.su_id>=0){
                                this.props.updateUser({id:data.su_id})
                                navigate('HomeScreen');
                            } else {
                                let SU = await this.props.fetchServiceUser();
                                this.setState({submit: false});
                                if (SU.fetchUser && SU.fetchUser.length < 1) {
                                    Alert.alert(
                                        'Missing SU in this user.',
                                        null,
                                        [{text: 'Close'}]
                                    );
                                } else {
                                    navigate('HomeScreen');
                                }
                            }
                            
                        }
                    } else {
                        this.setState({submit: false});
                        Alert.alert(
                            "An error happened while trying to log in. Please verify internet connection.",
                            null,
                            [{text: 'Close'}]
                        );
                    }

                });
        }
    }

  _getLocation = (loc) => {
      this.setState({location: loc});
  }

  render () {
      return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
              {this.state.submit &&
          <Loading visible={this.state.submit} />
              }
              <Geolocation onLocation={this._getLocation} />
              <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={this.image} />
              </View>
              <View style={styles.formContainer}>
                  <TextInput
                      placeholder="Username"
                      placeholderTextColor="#CCCCCC"
                      underlineColorAndroid="transparent"
                      returnKeyType="next"
                      autoCorrect={false}
                      autoCapitalize="none"
                      ref={(input) => this.inputUser = input}
                      onSubmitEditing={() => this.inputPass.focus()}
                      onChangeText={(text) => this.setState({inputUser: text})}
                      value={this.state.inputUser}
                      style={styles.input}
                  />
                  <TextInput
                      placeholder="Password"
                      placeholderTextColor="#CCCCCC"
                      underlineColorAndroid="transparent"
                      returnKeyType="go"
                      secureTextEntry
                      style={styles.input}
                      ref={(input) => this.inputPass = input}
                      onChangeText={(text) => this.setState({inputPass: text})}
                      value={this.state.inputPass}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => this._userLogin()}>
                      <Text style={styles.buttonText}>LOGIN</Text>
                  </TouchableOpacity>
              </View>
          </KeyboardAvoidingView>
      );
  }
}

const dispatchToProps = (dispatch) => ({
    updateUser: (user) => EventDispatcher.UpdateUser(user, dispatch),
    login: (userData) => EventDispatcher.Login(userData, dispatch),
    fetchMood: () => EventDispatcher.FetchMood(dispatch),
    fetchMealMenu: () => EventDispatcher.FetchMealMenu(dispatch),
    fetchServiceUser: () => EventDispatcher.FetchServiceUser(dispatch),
    fetchCarePlan: () => EventDispatcher.FetchCarePlan(dispatch),
});

export default connect(null, dispatchToProps)(Login);
