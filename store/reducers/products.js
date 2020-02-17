import PRODUCTS from '../../data/dummy-data';
import * as productActions  from '../../store/actions/products';
import Product from '../../model/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, action) => {    
  switch(action.type) {
    case productActions.SET_PRODUCTS:
      return {
        availableProducts: action.products, 
        userProducts: action.products.filter(product => product.ownerId === "u1")
      }
    case productActions.DELETE_PRODUCT :      
      const updatedUserProducts = state.userProducts.filter(product => product.id !== action.productId);
      const updatedAvailableProducts = state.availableProducts.filter(product => product.id !== action.productId);      
      return {
        ...state, 
        availableProducts: updatedAvailableProducts, 
        userProducts: updatedUserProducts
      }
    case productActions.ADD_PRODUCT :      
      const product = action.product;
      //id is being set by Firebase and is sent from the products action
      // const uuidv4 = require('uuid/v4');
      // id = uuidv4();

      //Dont allow to create an empty product
      if(product.title.length === 0)
        return state;
      
      const newProduct = new Product(product.id,"u1",product.title, product.imageUrl, product.description, product.price);
      const newAvailableProducts =  [...state.availableProducts].concat(newProduct);
      const newUserProducts = [...state.userProducts].concat(newProduct);
   
      return {
        ...state,         
        availableProducts: newAvailableProducts,
        userProducts: newUserProducts
       }
    case productActions.EDIT_PRODUCT:     
      const updatedProduct = action.product;
      const productToBeUpdated = state.userProducts.find(x => x.id === updatedProduct.id);
      
      const indexInUserProducts = state.userProducts.findIndex(product => product.id === updatedProduct.id);
      const indexInAvailableProducts = state.availableProducts.findIndex(product => product.id == updatedProduct.id)
      
      productToBeUpdated.title = updatedProduct.title;
      productToBeUpdated.imageUrl = updatedProduct.imageUrl;
      productToBeUpdated.description = updatedProduct.description;
      productToBeUpdated.price = updatedProduct.price;
      
      let modifiedUserProducts = [...state.userProducts];
      modifiedUserProducts[indexInUserProducts] = productToBeUpdated;
      
      let modifiedAvailableProducts = [...state.availableProducts];
      modifiedAvailableProducts[indexInAvailableProducts] = productToBeUpdated;
         
      return {
        ...state,
        availableProducts: modifiedAvailableProducts,
        userProducts: modifiedUserProducts,        
      }
  }
  return state;
}