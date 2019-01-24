import { StackNavigator } from 'react-navigation'
import Login from '../Screens/Login'
import Home from '../Screens/Home'
import Category from '../Screens/Category'
import PersonalCare from '../Screens/PersonalCare'
import Meal from '../Screens/Meal'
import ContactLog from '../Screens/ContactLog'
import Medications from '../Screens/Medications'
import MedicationsReview from "../Screens/MedicationsReview";
import NightChecks from '../Screens/NightChecks'
import Accidents from '../Screens/Accidents'
import Activity from '../Screens/Activity'
import Health from '../Screens/Health'
import styles from './Styles/NavigationStyles'

const PrimaryNav = StackNavigator({
  LoginScreen: { screen: Login },
  HomeScreen: { screen: Home },
  CategoryScreen: { screen: Category },
  PersonalCareScreen: { screen: PersonalCare },
  MealScreen: { screen: Meal },
  ContactLogScreen: { screen: ContactLog },
  MedicationsReviewScreen: { screen: MedicationsReview },
  MedicationsScreen: { screen: Medications },
  NightChecksScreen: { screen: NightChecks },
  AccidentsScreen: { screen: Accidents },
  HealthScreen: { screen: Health },
  ActivityScreen: { screen: Activity }
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
