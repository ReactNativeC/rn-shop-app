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
  return async dispatch => {
    try {
      //delete from server before dispatching delete action to redux
      const response = await fetch(`${Config.database}/products/${id}.json`, {
        method: 'DELETE',
      })
      if(!response.ok)
        throw new Error("Something went wrong");

      dispatch({
        type: DELETE_PRODUCT,
        productId: id
      })
    } catch (err) {
      throw err;
    }
  }
}

export const addProduct = product => {
  return async  dispatch => {
    try {
      //any async action to udpate database goes here
      const response = await fetch(`${Config.database}/products.json`, {
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
      //even if we receive authentication 401 or some other non-OK(200) error, let the user know.
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      product.id = resData.name;

      dispatch({
        type: ADD_PRODUCT,
        product: product
      })
    } catch (err) {
      //Log it an analytics server
      throw err;
    }
  }  
}

export const editProduct = product => {
  return async dispatch => {
    try {
    //update database first before dispatcing action    
    //PATCH HTTP method only updates attributes that we specify in the body payload
    const response = await fetch(`${Config.database}/products/${product.id}.json`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',        
      }, 
      body: JSON.stringify({
        title: product.title, 
        description: product.description, 
        imageUrl: product.imageUrl, 
      })
    })        
    //even if we receive authentication 401 or some other non-OK(200) error, let the user know.
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: EDIT_PRODUCT, 
      product: product
    })   
  } catch(err) {
    //Log it to analytics server
    throw err;
  } 
  }
  
}