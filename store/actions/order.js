export const PLACE_AN_ORDER = 'PLACE_AN_ORDER';
export const SET_ORODERS = 'SET_ORDERS';
import Config from '../../secrets/config';
import Order from '../../model/order';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
    //Get orders from database
    const userId = getState().auth.userId;
    const response = await fetch(`${Config.database}/orders/${userId}.json?`);
    //if there is authentication issues or any other issues, firebase may not throw the error but just return a a non-200 code 
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.error);
    }

    const resData = await response.json();
    let loadedOrders = [];
    for (const key in resData) {
      loadedOrders.push(new Order(
        key,        
        resData[key].cartItems,
        resData[key].totalAmount,
        resData[key].date,
      )
      );
    }
 
    dispatch({
      type: SET_ORODERS,
      orders: loadedOrders
    })    
  } catch(err) {
    throw err
  }

  }
}

export const placeAnOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const date = new Date().toISOString();
            
      const response = await fetch(`${Config.database}/orders/${userId}.json?auth=${getState().auth.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({          
          cartItems,
          totalAmount,
          date,
        })
      }); 
      if(!response.ok) {
        const res = await response.json();
        throw new Error(res.error);
      }
      const resData = await response.json();
      const orderId = resData.name;      
      dispatch({
        type: PLACE_AN_ORDER,
        orderData: {
          id: orderId,          
          cartItems: cartItems,
          totalAmount: totalAmount,
          date: date
        }
      })
    } catch (err) {
      throw err;
    }
  }
}