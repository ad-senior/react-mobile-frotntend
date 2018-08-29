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
  static Mood() {
    return this.prototype.getRequest(BASE_URL.MOOD, {});
  }
  static MealMenu() {
    return this.prototype.getRequest(BASE_URL.MEAL_MENU, {});
  }
  static CarePlan() {
    return this.prototype.getRequest(BASE_URL.CAREPLAN, {});
  }
}

export default DailyAdapter;
