export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product: product
  }
}
export const deleteCartItem = productId => {
  return {
    type: DELETE_CART_ITEM, 
    productId: productId
  }
}