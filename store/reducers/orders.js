import * as orderActions from '../actions/order';
import Order from '../../model/order';

const initialState = {
  orders: []
}

export default (state = initialState, action) => {    
  switch(action.type){
    case orderActions.PLACE_AN_ORDER:
      const newOrder = new Order(new Date().toString(), action.orderData.cartItems, action.orderData.totalAmount, Date);
      return {
        ...state.orders, 
        orders: state.orders.concat(newOrder)
      }
  }
  return state;
}