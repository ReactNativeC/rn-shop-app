export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT, 
    productId: id
  }
}
export const addProduct = product => {
  return {
    type: ADD_PRODUCT, 
    product: product
  }
}
export const editProduct = product => {
  return {
    type: EDIT_PRODUCT, 
    product: product
  }
}