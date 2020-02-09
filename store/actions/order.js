export const PLACE_AN_ORDER = 'PLACE_AN_ORDER';

export const placeAnOrder = (cartItems, totalAmount) => {
  return {
    type: PLACE_AN_ORDER, 
    orderData: {
      cartItems: cartItems, 
      totalAmount: totalAmount
    }
  }
}