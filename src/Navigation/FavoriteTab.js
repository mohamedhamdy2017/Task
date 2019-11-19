import {createStackNavigator} from 'react-navigation-stack';
import Favorites from '../screens/Favorites';

export const FavoritesTab = createStackNavigator({
  Favorites: {screen: Favorites},
});
