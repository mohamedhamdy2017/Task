import {combineReducers} from 'redux'
import FavReducer from './FavReducer';
import CartReducer from './CartReducer';

export default combineReducers({
    favReducer: FavReducer,
    cartReducer: CartReducer
})