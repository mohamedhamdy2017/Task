import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTCART,
  DECREMENTCART,
  INCREMENTHEADCART,
  DECREMENTHEADCART,
} from './types';

export const addToCart = item => {
  return {
    type: ADDTOCART,
    payload: item,
  };
};

export const removeFromCart = id => {
  return {
    type: REMOVEFROMCART,
    payload: id,
  };
};

export const incermentCount = index => {
  return {
    type: INCREMENTCART,
    payload: index,
  };
};

export const decermentCount = index => {
  return {
    type: DECREMENTCART,
    payload: index,
  };
};

export const incermentHeadCount = () => {
  return {
    type: INCREMENTHEADCART,
  };
};

export const decermentHeadCount = () => {
  return {
    type: DECREMENTHEADCART,
  };
};

export const totalPrice = price => {
  let newPrice = 0
  return {
    type: 'sum',
    payload: newPrice += price ,
  };
};
