export const PLACE_AN_ORDER = 'PLACE_AN_ORDER';
import Config from '../../secrets/config';

export const placeAnOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    try {
      const date = new Date().toISOString();
      const response = await fetch(`${Config.database}/orders.json`, {
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
      console.log(response.status);
      if(!response.ok) {
        throw new Error("Something went wrong!");
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