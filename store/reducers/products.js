import PRODUCTS from '../../data/dummy-data';
import * as productActions  from '../../store/actions/products';
import Product from '../../model/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, action) => {    
  console.log('actino is' + action.type);
  switch(action.type) {
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
      const uuidv4 = require('uuid/v4');
      id = uuidv4();
      
      return {
        ...state,         
        availableProducts: state.availableProducts.push(
          new Product(id, "u1", product.title, product.imageUrl, product.description, product.price)),
        userProducts: state.userProducts.push(
          new Product(id, "u1", product.title, product.imageUrl, product.description, product.price)),              
      }
    case productActions.EDIT_PRODUCT:     
    console.log(action.product);
      const updatedProduct = action.product;
      const productToBeUpdated = state.userProducts.find(x => x.id === updatedProduct.id);
      const indexInUserProducts = state.userProducts.findIndex(product => product.id === updatedProduct.id);
      const indexInAvailableProducts = state.userProducts.findIndex(product => product.id == updatedProduct.id)
      
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
        userProducts: modifiedUserProducts,
        availableProducts: modifiedAvailableProducts
      }
  }
  return state;
}