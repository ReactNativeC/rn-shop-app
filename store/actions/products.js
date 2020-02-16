export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
import Config from '../../secrets/config';
export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT, 
    productId: id
  }
}
export const addProduct = product => {
  return async  dispatch => {
    //ansy async action here
    const response = await fetch(Config.database +'/products.json', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',        
      }, 
      body: JSON.stringify({
        title: product.title, 
        description: product.description, 
        imageUrl: product.imageUrl, 
        price: product.price
      })
    })    
    const resData = await response.json();
    product.id = resData.name;
    
    dispatch({
      type: ADD_PRODUCT, 
      product: product
    })
  }  
}

export const editProduct = product => {
  return {
    type: EDIT_PRODUCT, 
    product: product
  }
}