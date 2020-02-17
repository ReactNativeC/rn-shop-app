import * as orderActions from '../actions/order';
import Order from '../../model/order';

const initialState = {
  orders: []
}

export default (state = initialState, action) => {      
  switch(action.type){
    case orderActions.SET_ORODERS:   
      return {
        orders: action.orders
      }
    case orderActions.PLACE_AN_ORDER:
      const newOrder = new Order(
        action.orderData.id, 
        action.orderData.cartItems, 
        action.orderData.totalAmount, 
        action.orderData.date);
      return {
        ...state.orders, 
        orders: state.orders.concat(newOrder)
      }
  }
  return state;
}