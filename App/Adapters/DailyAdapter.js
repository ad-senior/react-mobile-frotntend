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
  static Mood() {
    return this.prototype.getRequest(BASE_URL.MOOD, {});
  }
}

export default DailyAdapter;
