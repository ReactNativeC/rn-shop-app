import * as cartActions from '../actions/cart';
import CartItem from '../../model/cart-item';

const initialState = {
  cartItems: {}, 
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case cartActions.ADD_TO_CART:
      const addedProduct = action.product; 
      const productPrice = addedProduct.price; 
      const productTitle = addedProduct.title; 

      if (state.cartItems[addedProduct.id]) {
        //product already exists in the cart, so update it.
        const updatedCartItem = new CartItem(
          state.cartItems[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.cartItems[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          cartItems: { ...state.cartItems, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice
        }
      }
      else {
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
        return {
          ...state,
          cartItems: { ...state.cartItems, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        }
      }
  }
  return state;
}

