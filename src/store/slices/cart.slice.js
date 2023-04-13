import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
	name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases : (state, action) => {
            return action.payload
        }
        
    }
})

export const getCartThunk = () => dispatch => {

    axios
     .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
     .then( resp => dispatch(setPurchases(resp.data) ))
     .catch( error => console.error(error) )
}

export const createCartThunk = data => dispatch => {
    
    axios
     .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
     .then( () => dispatch( getCartThunk() ) )
     .catch( error => console.error(error) )
}

export const removeCartThunk = id => dispatch => {
    
    axios
     .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
     .then( () => dispatch( getCartThunk() ) )
     .catch( error => console.error(error) )
}

export const updateCartThunk = (data, item) => dispatch => {
    
    axios
     .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${item.id}`, data, getConfig())
     .then( () => dispatch( getCartThunk() ) )
     .catch( error => console.error(error) )
}



export const cartCheckoutThunk = () => dispatch => {
    axios
     .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {} , getConfig() )
     .then( () => dispatch( getCartThunk() ))
     .catch( error => console.error(error) )
}

export const { setPurchases } = cartSlice.actions;

export default cartSlice.reducer;