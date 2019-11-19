import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import { ProductDetails } from '../screens/ProductDetails';
import { CheckOut } from '../screens/CheckOut';


export const HomeTab = createStackNavigator({
  Home: {screen: Home},
  Cart: {screen: Cart},
  ProductDetails: {screen: ProductDetails},
  CheckOut: {screen: CheckOut}
});
