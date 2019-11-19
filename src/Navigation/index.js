import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeTab} from './HomeTab';
import {FavoritesTab} from './FavoriteTab';

const rootNav = createBottomTabNavigator({
  Home: {screen: HomeTab},
  Favorites: {screen: FavoritesTab},
});


export default createAppContainer(rootNav)