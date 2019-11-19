import {ADDTOFAVORITE, REMOVEFROMFAVORITE} from './types';


export const addToFavorite = (item) => {
    return {
        type: ADDTOFAVORITE,
        payload: item
    }
}

export const removeFromFavorite = (id) => {
    return {
        type: REMOVEFROMFAVORITE, 
        payload: id
    }
}