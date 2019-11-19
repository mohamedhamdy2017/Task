import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTCART,
  DECREMENTCART,
  INCREMENTHEADCART,
  DECREMENTHEADCART,
} from '../actions/types';

const initialState = {
  cart: [],
  cartCount: 1,
  headCart: 0,
  total: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADDTOCART:
      return {...state, cart: [...state.cart, action.payload]}; 
    case REMOVEFROMCART:
      return {
        ...state,
        cart: state.cart.filter(element => element.id != action.payload),
      };
    case INCREMENTCART:
      return {...state, cartCount: state.cartCount + 1};
    case DECREMENTCART:
      return {...state, cartCount: state.cartCount - 1};
    case INCREMENTHEADCART:
      return {...state, headCart: state.headCart + 1};
    case DECREMENTHEADCART:
      return {...state, headCart: state.headCart - 1};
    case 'sum':
      return { 
        ...state, total: [...state.total, action.payload]};
    default:
      return state;
  }
};
