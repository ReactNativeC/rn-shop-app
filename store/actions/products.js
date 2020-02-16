export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS  = 'SET_PRODUCTS';
import Config from '../../secrets/config';
import Product from '../../model/product';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      //Get products from database
      const response = await fetch(Config.database + '/products.json');
      //if there is authentication issues or any other issues, firebase may not throw the error but just return a a non-200 code 
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      let loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts
      })
    } catch (err) {
      //send the error to analytics/logs
      throw err;
    }
  }
}

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
        price: product.price, 
        ownerId: product.ownerId,
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