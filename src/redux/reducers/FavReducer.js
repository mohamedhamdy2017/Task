import {ADDTOFAVORITE, REMOVEFROMFAVORITE} from '../actions/types';

const initialState = {
  favorites: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADDTOFAVORITE:
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVEFROMFAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(element => element.id != action.payload),
      };
    default:
      return state;
  }
};
