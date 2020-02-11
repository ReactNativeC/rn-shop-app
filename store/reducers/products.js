import PRODUCTS from '../../data/dummy-data';
import * as productActions  from '../../store/actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, action) => {    
  switch(action.type) {
    case productActions.DELETE_PRODUCT :      
      const updatedUserProducts = state.userProducts.filter(product => product.id !== action.productId);
      const updatedAvailableProducts = state.availableProducts.filter(product => product.id !== action.productId);      
      return {
        ...state, 
        availableProducts: updatedAvailableProducts, 
        userProducts: updatedUserProducts
      }
  }

  return state;
}

