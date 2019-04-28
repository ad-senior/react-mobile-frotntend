import request from 'axios';
import { AsyncStorage } from 'react-native';

export default class requestHelper {
	constructor(method, endpoint, params) {
		if (method === "POST" || method === "PUT") {
			this.requestConfig = {
				method: method,
				url: endpoint,
				data: params
			};
		} else {
			this.requestConfig = {
				method: method,
				url: endpoint
			};
		}

		return this.sendRequest();
	}

	setErrorMessage = (error) => {
		let message = 'Invalid status';
		let data = error.data;
		if (data.non_field_errors) {
			message = data.non_field_errors[0];
		} else if (data.code === 'token_not_valid') {
			message = data.detail;
		}

		return { error: true, message: message, status: error.status };
	}

	sendRequest = async () => {
		let tokenString = await AsyncStorage.getItem('token').then(response => response);
		this.requestConfig.headers = { Authorization: `Bearer ${tokenString}` };
		console.log(JSON.stringify(this.requestConfig));
		return request(this.requestConfig)
			.then(response => {
				console.log(JSON.stringify(response))
				try {
					return response.data;
				} catch (error) {
					return Promise.reject({
						data: {
							error: [{
								status: 0,
								detail: 'Something went wrong, please contact us'
							}]
						}
					});
				}
			})
			.catch(response => {
				let error = { ...response }.response;
				console.log(JSON.stringify(response))
				//console.error(`[API][${this.method}][${this.endpoint}]`, error.status, error.data);
				return this.setErrorMessage(error);
			});
	}
}
