import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products.slice'
import isLoadingSlice from './slices/isLoading.slice'
import cartSlice from './slices/cart.slice'

export default configureStore({
  reducer: {
    productsSlice,
    isLoadingSlice,
    cartSlice
	}
})