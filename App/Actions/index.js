import LoginRedux from '../Redux/LoginRedux';
import LoginAdapter from '../Adapters/LoginAdapter';
import DailyRedux from '../Redux/DailyRedux';
import DailyAdapter from '../Adapters/DailyAdapter';
import ServiceUserAdapter from '../Adapters/ServiceUserAdapter';
import ServiceUserRedux from '../Redux/ServiceUserRedex';
import { AsyncStorage } from 'react-native';

const refreshToken = async (dispatch) => {
	let tokenRefresh = await AsyncStorage.getItem('refresh').then(response => response);
	let data = { 'refresh': tokenRefresh };
	return LoginAdapter.RefreshToken(data)
		.then(async (response) => {
			if (response.access) {
				response.refresh = tokenRefresh;
				await AsyncStorage.setItem('token', response.access);
			}
			return dispatch(LoginRedux.getTokenSuccess(response));
		})
		.catch(error => dispatch(LoginRedux.getTokenSuccess(error)));
};

const Login = (userData, dispatch) => {
	return LoginAdapter.Login(userData)
		.then(response => dispatch(LoginRedux.loginSuccess(response)))
		.catch(error => dispatch(LoginRedux.loginFail(error)));
};

const BusinessAccounts = (dispatch) => {
	return LoginAdapter.BusinessAccounts()
		.then(response => dispatch(LoginRedux.accountsSuccess(response)))
		.catch(error => dispatch(LoginRedux.loginFail(error)));
};

const FetchServiceUser = (dispatch) => {
	return ServiceUserAdapter.FetchServicerUser()
		.then(response => dispatch(ServiceUserRedux.fetchUser(response)))
		.catch(error => dispatch(ServiceUserRedux.fetchUser(error)));
};

const FetchMood = (dispatch) => {
	DailyAdapter.Mood()
		.then(response => dispatch(DailyRedux.fetchMood(response)))
		.catch(error => dispatch(DailyRedux.fetchMoodFail(error)));
};

const FetchMealMenu = (dispatch) => {
	DailyAdapter.MealMenu()
		.then(response => dispatch(DailyRedux.fetchMealMenu(response)))
		.catch(error => dispatch(DailyRedux.fetchMealMenu(error)));
};

const PostPersonalCare = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.PersonalCare(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostPersonalCareOffline = dataObj => {
	async function PostPersonalCare(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.PersonalCare(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostPersonalCare.type = 'PostPersonalCare';
	PostPersonalCare.interceptInOffline = true;
	PostPersonalCare.meta = {
		retry: true,
		name: 'PostPersonalCareOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostPersonalCare;

};
const PostMeal = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.Meal(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostMealOffline = dataObj => {
	async function PostMeal(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.Meal(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostMeal.type = 'PostMeal';
	PostMeal.interceptInOffline = true;
	PostMeal.meta = {
		retry: true,
		name: 'PostMealOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostMeal;

};
const PostAccident = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.Accident(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostAccidentOffline = dataObj => {
	async function PostAccident(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.Accident(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostAccident.type = 'PostAccident';
	PostAccident.interceptInOffline = true;
	PostAccident.meta = {
		retry: true,
		name: 'PostAccidentOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostAccident;

};
const PostActivity = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.Activity(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostActivityOffline = dataObj => {
	async function PostActivity(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.Activity(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostActivity.type = 'PostActivity';
	PostActivity.interceptInOffline = true;
	PostActivity.meta = {
		retry: true,
		name: 'PostActivityOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostActivity;

};
const PostNightCheck = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.NightCheck(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostNightCheckOffline = dataObj => {
	async function PostNightCheck(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.NightCheck(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostNightCheck.type = 'PostNightCheck';
	PostNightCheck.interceptInOffline = true;
	PostNightCheck.meta = {
		retry: true,
		name: 'PostNightCheckOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostNightCheck;

};
const PostContactLog = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.ContactLog(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostContactLogOffline = dataObj => {
	async function PostContactLog(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.ContactLog(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostContactLog.type = 'PostContactLog';
	PostContactLog.interceptInOffline = true;
	PostContactLog.meta = {
		retry: true,
		name: 'PostContactLogOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostContactLog;

};
const PostMedication = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.Medication(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostMedicationOffline = dataObj => {
	async function PostMedication(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.Medication(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostMedication.type = 'PostMedication';
	PostMedication.interceptInOffline = true;
	PostMedication.meta = {
		retry: true,
		name: 'PostMedicationOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostMedication;

};

const PostHealth = async (dataObj, dispatch) => {
	await refreshToken(dispatch);
	return DailyAdapter.Health(dataObj)
		.then(response => dispatch(DailyRedux.postSuccess(response)))
		.catch(error => dispatch(DailyRedux.postFail(error)));
};

const PostHealthOffline = dataObj => {
	async function PostHealth(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.Health(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	PostHealth.type = 'PostHealth';
	PostHealth.interceptInOffline = true;
	PostHealth.meta = {
		retry: true,
		name: 'PostHealthOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return PostHealth;

};

const UpdateMedicationOffline = dataObj => {
	async function UpdateMedication(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateMedication(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateMedication.type = 'UpdateMedication';
	UpdateMedication.interceptInOffline = true;
	UpdateMedication.meta = {
		retry: true,
		name: 'UpdateMedicationOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateMedication;

};

const UpdateIncidentOffline = dataObj => {
	async function UpdateIncident(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateIncident(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateIncident.type = 'UpdateIncident';
	UpdateIncident.interceptInOffline = true;
	UpdateIncident.meta = {
		retry: true,
		name: 'UpdateIncidentOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateIncident;

};
const UpdatePersonalCareOffline = dataObj => {
	async function UpdatePersonalCare(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdatePersonalCare(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdatePersonalCare.type = 'UpdatePersonalCare';
	UpdatePersonalCare.interceptInOffline = true;
	UpdatePersonalCare.meta = {
		retry: true,
		name: 'UpdatePersonalCareOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdatePersonalCare;

};

const UpdateActivityOffline = dataObj => {
	async function UpdateActivity(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateActivity(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateActivity.type = 'UpdateActivity';
	UpdateActivity.interceptInOffline = true;
	UpdateActivity.meta = {
		retry: true,
		name: 'UpdateActivityOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateActivity;

};
const UpdateNightCheckOffline = dataObj => {
	async function UpdateNightCheck(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateNightCheck(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateNightCheck.type = 'UpdateNightCheck';
	UpdateNightCheck.interceptInOffline = true;
	UpdateNightCheck.meta = {
		retry: true,
		name: 'UpdateNightCheckOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateNightCheck;

};

const UpdateContactOffline = dataObj => {
	async function UpdateContact(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateConatct(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateContact.type = 'UpdateContact';
	UpdateContact.interceptInOffline = true;
	UpdateContact.meta = {
		retry: true,
		name: 'UpdateContactOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateContact;

};
const UpdateMealOffline = dataObj => {
	async function UpdateMeal(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateMeal(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateMeal.type = 'UpdateMeal';
	UpdateMeal.interceptInOffline = true;
	UpdateMeal.meta = {
		retry: true,
		name: 'UpdateMealOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateMeal;

};
const UpdateHealthOffline = dataObj => {
	async function UpdateHealth(dispatch) {
		await refreshToken(dispatch);
		return DailyAdapter.UpdateHealth(dataObj)
			.then(response => dispatch(DailyRedux.postSuccess(response)))
			.catch(() => dispatch(DailyRedux.postFail(dataObj)));
	}
	UpdateHealth.type = 'UpdateHealth';
	UpdateHealth.interceptInOffline = true;
	UpdateHealth.meta = {
		retry: true,
		name: 'UpdateHealthOffline', // This should be the name of your function
		args: [dataObj], // These are the arguments for the function. Add more as needed.
	};
	return UpdateHealth;

};

const FetchCarePlan = (dispatch) => {
	DailyAdapter.CarePlan()
		.then(response => dispatch(DailyRedux.fetchCarePlan(response)))
		.catch(error => dispatch(DailyRedux.fetchCarePlan(error)));
};


const FetchCalendar = (serviceUser, dispatch) => {
	DailyAdapter.Calendar(serviceUser)
		.then(response => dispatch(DailyRedux.fetchCalendar(response)))
		.catch(error => dispatch(DailyRedux.fetchCalendarFail(error)));
};

const FetchDaily = (dispatch) => dispatch(DailyRedux.fetchDaily());

const UpdateUser = (user, dispatch) => dispatch(ServiceUserRedux.updateUser(user));

export const EventDispatcher = {
	Login,
	BusinessAccounts,
	FetchDaily,
	FetchMood,
	FetchMealMenu,
	FetchCalendar,
	UpdateUser,
	FetchServiceUser,
	PostPersonalCare,
	PostMeal,
	PostAccident,
	PostActivity,
	PostContactLog,
	PostHealth,
	PostNightCheck,
	PostMedication,
	PostPersonalCareOffline,
	PostMealOffline,
	PostAccidentOffline,
	PostActivityOffline,
	PostContactLogOffline,
	PostHealthOffline,
	PostNightCheckOffline,
	PostMedicationOffline,
	FetchCarePlan,
	UpdatePersonalCareOffline,
	UpdateMedicationOffline,
	UpdateIncidentOffline,
	UpdateNightCheckOffline,
	UpdateActivityOffline,
	UpdateHealthOffline,
	UpdateContactOffline,
	UpdateMealOffline,

};
