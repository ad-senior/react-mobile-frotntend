import BaseAdapter from './BaseAdapter';
import { BASE_URL } from '../Config';

class DailyAdapter extends BaseAdapter {
  static PersonalCare(dataObj) {
    return this.prototype.postRequest(BASE_URL.PERSONAL_CARE, dataObj);
  }
  static Meal(dataObj) {
    return this.prototype.postRequest(BASE_URL.MEAL, dataObj);
  }
}

export default DailyAdapter;
