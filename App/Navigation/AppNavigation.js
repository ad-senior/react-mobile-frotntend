import { StackNavigator } from 'react-navigation'
import Login from '../Screens/Login'
import Home from '../Screens/Home'
import Category from '../Screens/Category'
import PersonalCare from '../Screens/PersonalCare'
import Meal from '../Screens/Meal'
import ContactLog from '../Screens/ContactLog'
import Medications from '../Screens/Medications'
import MedicationsReview from "../Screens/Review/MedicationsReview";
import NightChecks from '../Screens/NightChecks'
import Accidents from '../Screens/Accidents'
import Activity from '../Screens/Activity'
import Health from '../Screens/Health'
import styles from './Styles/NavigationStyles'
import AccidentReview from '../Screens/Review/AccidentReview'
import NightCheckReview from '../Screens/Review/NightChecksReview'
import ContactLogReview from '../Screens/Review/ContactLogReview'
import MealReview from '../Screens/Review/MealReview'
import PersonalCareReview from '../Screens/Review/PersonalCareReview'
import ActivityReview from '../Screens/Review/ActivityReview'
import BloodPressureReview from "../Screens/Review/HealthSubPages/BloodPressureReview"
import BloodTestReview from "../Screens/Review/HealthSubPages/BloodTestReview"
import BMIReview from "../Screens/Review/HealthSubPages/BMIReview"
import FootCheckReview from "../Screens/Review/HealthSubPages/FootCheckReview"
import GlucoseReview from "../Screens/Review/HealthSubPages/GlucoseReview"
import HeartRateReview from "../Screens/Review/HealthSubPages/HeartRateReview"
import OtherTestReview from "../Screens/Review/HealthSubPages/OtherTestReview"
import SeizureReview from "../Screens/Review/HealthSubPages/SeizureReview"
import TemperatureReview from "../Screens/Review/HealthSubPages/TemperatureReview"
import WoundCareReview from "../Screens/Review/HealthSubPages/WoundCareReview"





const PrimaryNav = StackNavigator({
  LoginScreen: { screen: Login },
  HomeScreen: { screen: Home },
  CategoryScreen: { screen: Category },
  PersonalCareScreen: { screen: PersonalCare },
  MealScreen: { screen: Meal },
  MealReview: { screen: MealReview },
  ContactLogScreen: { screen: ContactLog },
  MedicationsReviewScreen: { screen: MedicationsReview },
  MedicationsScreen: { screen: Medications },
  NightChecksScreen: { screen: NightChecks },
  AccidentsScreen: { screen: Accidents },
  HealthScreen: { screen: Health },
  ActivityScreen: { screen: Activity },
  PersonalCareReview: { screen : PersonalCareReview },
  ActivityReview: { screen : ActivityReview },
  AccidentReviewScreen: {screen: AccidentReview},
  NightCheckReviewScreen: {screen: NightCheckReview},
  ContactLogReviewScreen: { screen: ContactLogReview },
  BloodPressureReview : { screen: BloodPressureReview },
  BloodTestReview: { screen: BloodTestReview },
  BMIReview: { screen: BMIReview },
  FootCheckReview: { screen: FootCheckReview },
  GlucoseReview: { screen: GlucoseReview },
  HeartRateReview: { screen: HeartRateReview },
  OtherTestReview: { screen: OtherTestReview },
  SeizureReview: { screen: SeizureReview },
  TemperatureReview: { screen: TemperatureReview },
  WoundCareReview: { screen: WoundCareReview },
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
