class order {
  constructor(id, cartItems, totalAmount, date) {
    this.id = id, 
    this.cartItems = cartItems, 
    this.totalAmount = totalAmount, 
    this.date = date
  }
  
  get readableDate() {
    return this.date.toLocaleDateString('en-En', {
      year : 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export default order;