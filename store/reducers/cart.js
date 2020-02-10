import * as cartActions from '../actions/cart';
import CartItem from '../../model/cart-item';
import * as orderActions from '../actions/order';

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
    case cartActions.DELETE_CART_ITEM:                  
      productId = action.productId;
      const selectedCartItem = state.cartItems[productId];
      let updatedCartItems;
      if(selectedCartItem.quantity > 1) {
        //reduce the quantity by 1
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice, 
          selectedCartItem.productTitle, 
          selectedCartItem.sum - selectedCartItem.productPrice);
      
        updatedCartItems = {...state.cartItems, [productId]: updatedCartItem};         
      }
      else {
        //remove the item
        updatedCartItems = {...state.cartItems};
        delete updatedCartItems[action.productId];    
      }

      return {
        ...state, 
        cartItems: updatedCartItems,
        totalAmount: (state.totalAmount - selectedCartItem.productPrice) < 0 ? 0 : (state.totalAmount - selectedCartItem.productPrice)
      }
    case orderActions.PLACE_AN_ORDER: //every action in the UI reaches all reducers. so we can check for order action here.
      //clear the cart
      return initialState;

  }
  return state;
}

