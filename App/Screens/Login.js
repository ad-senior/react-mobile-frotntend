import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage, Alert, Picker } from 'react-native';
import { connect } from 'react-redux';
import { EventDispatcher } from "../Actions";
import Loading from '../Components/Loading';
import Geolocation from '../Components/Geolocation';
import styles from './Styles/Login';
import { emptyString } from '../Common/Strings';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import {Data} from '../Config';

export async function requestLocationPermission() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				'title': 'Location Permission',
				'message': 'Bloom Support app needs access to your location',
			}
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.warn(err);
		return false;
	}
} 

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputUser: emptyString,
			inputPass: emptyString,
			submit: false,
			location: [null, null],
			permission: false,
			domainName: "",
			domainsList: Data.domainsList
		};
		this.image = require('../Images/default/notepad-2.png');
	}

  	async componentDidMount() {
		if(Platform.OS === 'android') {
			let data = await requestLocationPermission();
			this.setState({ permission: data });
		}
  	}
	
	getBuisnessAccounts() {
		this.props.businessAccounts()
		.then(async (response) => {
			if (response.type === "ACCOUNTS_SUCCESS") {
				let data = response.accountsSuccess;				
				this.setState({ domainsList: data});
			}
		});
	}

	_userLogin() {		
		if (this.state.inputUser.length > 0 && this.state.inputPass.length > 0) {
			if(this.state.domainName == 0 || this.state.domainName == '') {
				Alert.alert(
					'Please select domain name.',
					null,
					[{ text: 'Close', onPress: () => { this.setState({ submit: false }) } }]
				);
				return false;
			} 
			var BASE_URL = 'https://' + this.state.domainName + '/api';
			AsyncStorage.setItem("domain", BASE_URL);
			this.setState({ submit: true });
			this.props.login({ username: this.state.inputUser, password: this.state.inputPass, domain_name: this.state.domainName })
				.then(async (response) => {
					if (response.type === "LOGIN_SUCCESS") {
						let data = response.loginSuccess;
						if (data.error) {
							Alert.alert(
								'Invalid login details. Please try again.',
								null,
								[{ text: 'Close', onPress: () => { this.setState({ submit: false }) } }]
							);
						} else {
							const { navigate } = this.props.navigation;

							await AsyncStorage.setItem('token', data.access);
							await AsyncStorage.setItem('refresh', data.refresh);
							this.props.fetchMood();
							this.props.fetchMealMenu();
							this.props.fetchCarePlan();

							this.setState({ submit: false });
							if (data.su_id >= 0) {
								this.props.updateUser({ id: data.su_id })
								this.props.fetchCalendar({ id: data.su_id });
								navigate('HomeScreen', {showNotesMessage: true});
							} else {
								let SU = await this.props.fetchServiceUser();
								this.setState({ submit: false });
								if (SU.fetchUser && SU.fetchUser.length < 1) {
									Alert.alert(
										'Missing SU in this user.',
										null,
										[{ text: 'Close' }]
									);
								} else {
									navigate('HomeScreen', {showNotesMessage: true});
								}
							}

						}
					} else {
						this.setState({ submit: false });
						Alert.alert(
							"An error happened while trying to log in. Please verify internet connection.",
							null,
							[{ text: 'Close' }]
						);
					}

				});
		}
	}

	_getLocation = (loc) => {
		this.setState({ location: loc });
	}
	
	_renderGeolocation(){
		if(Platform.OS === 'android' && this.state.permission) {
			return <Geolocation onLocation={this._getLocation} />;
		} 
		else if(Platform.OS === 'ios') {
			return <Geolocation onLocation={this._getLocation} />;
		}
		return null;
	}

	state = { permission: false };

	render() {
		let domainItems = this.state.domainsList.map( (s, i) => {
            return <Picker.Item key={i} value={s.domain_name} label={s.business_name} />
        });
		return (
			<View style={styles.PermissionContainer}>
				<KeyboardAvoidingView behavior="padding" style={styles.container}>
					{this.state.submit &&
						<Loading visible={this.state.submit} />
					}
					{ this._renderGeolocation() }
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
							onChangeText={(text) => this.setState({ inputUser: text })}
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
							onChangeText={(text) => this.setState({ inputPass: text })}
							value={this.state.inputPass}
						/>
						<Picker
							style={styles.input}
							itemStyle={styles.picker}
							placeholder="Select  domain"
							selectedValue={this.state.domainName}
							style={{height: 50, width: '100%'}}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({domainName: itemValue})
							}>
							<Picker.Item value="0" label="Please Select Account Domain" />
							{domainItems}
						</Picker>
						<TouchableOpacity style={styles.buttonContainer} onPress={() => this._userLogin()}>
							<Text style={styles.buttonText}>LOGIN</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
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
	fetchCalendar: serviceUser => EventDispatcher.FetchCalendar(serviceUser, dispatch),
	businessAccounts: () => EventDispatcher.BusinessAccounts(dispatch)
});

export default connect(null, dispatchToProps)(Login);
