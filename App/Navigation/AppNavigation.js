import { StackNavigator } from 'react-navigation'
import Login from '../Screens/Login'
import Home from '../Screens/Home'
import Category from '../Screens/Category'
import PersonalCare from '../Screens/PersonalCare'
import styles from './Styles/NavigationStyles'

const PrimaryNav = StackNavigator({
  LoginScreen: { screen: Login },
  HomeScreen: { screen: Home },
  CategoryScreen: { screen: Category },
  PersonalCareScreen: { screen: PersonalCare }
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
