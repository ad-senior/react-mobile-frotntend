import BaseAdapter from './BaseAdapter';
import { BASE_URL } from '../Config';

class DailyAdapter extends BaseAdapter {
	static PersonalCare(dataObj) {
		return this.prototype.postRequest(BASE_URL.PERSONAL_CARE, dataObj);
	}
	static Meal(dataObj) {
		return this.prototype.postRequest(BASE_URL.MEAL, dataObj);
	}
	static Accident(dataObj) {
		return this.prototype.postRequest(BASE_URL.ACCIDENT, dataObj);
	}
	static Activity(dataObj) {
		return this.prototype.postRequest(BASE_URL.ACTIVITY, dataObj);
	}
	static ContactLog(dataObj) {
		return this.prototype.postRequest(BASE_URL.CONTACT_LOG, dataObj);
	}
	static Health(dataObj) {
		return this.prototype.postRequest(BASE_URL.HEALTH, dataObj);
	}
	static NightCheck(dataObj) {
		return this.prototype.postRequest(BASE_URL.NIGHT_CHECK, dataObj);
	}
	static Medication(dataObj) {
		return this.prototype.postRequest(BASE_URL.MEDICATION, dataObj);
	}
	static UpdateMedication(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.MEDICATION}${dataObj.id}/`, dataObj);
	}

	static UpdateIncident(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.ACCIDENT}${dataObj.id}/`, dataObj);
	}
	static UpdatePersonalCare(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.PERSONAL_CARE}${dataObj.id}/`, dataObj);
	}
	static UpdateActivity(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.ACTIVITY}${dataObj.id}/`, dataObj);
	}
	static UpdateNightCheck(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.NIGHT_CHECK}${dataObj.id}/`, dataObj);
	}

	static UpdateConatct(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.CONTACT_LOG}${dataObj.id}/`, dataObj);
	}
	static UpdateMeal(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.MEAL}${dataObj.id}/`, dataObj);
	}
	static UpdateHealth(dataObj) {
		return this.prototype.putRequest(`${BASE_URL.HEALTH}${dataObj.id}/`, dataObj);
	}
	static Mood() {
		return this.prototype.getRequest(BASE_URL.MOOD, {});
	}
	static MealMenu() {
		return this.prototype.getRequest(BASE_URL.MEAL_MENU, {});
	}
	static CarePlan() {
		return this.prototype.getRequest(BASE_URL.CAREPLAN, {});
	}
	static Calendar(dataObj) {
		return this.prototype.getRequest(`${BASE_URL.CALENDAR}?su=${dataObj.id}`, {});
	}
	static PastNotes(dataObj) {
		return this.prototype.getRequest(`${BASE_URL.PAST_NOTES}${dataObj.id}`, {});
	}
}

export default DailyAdapter;
