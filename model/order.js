import moment from 'moment';

class order {
  constructor(id, cartItems, totalAmount, date) {
    this.id = id, 
    this.cartItems = cartItems, 
    this.totalAmount = totalAmount, 
    this.date = date
  }
  
  get readableDate() {    
    //this does not work on android, hence use "moment" npm pakcage to display user friendly date
    // return this.date.toLocaleDateString('en-En', {
    //   year : 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });

    return moment(this.date).format('MMMM Do YYYY, hh:mm') // February 9th 2020 08:35
    //return moment(this.date, 'MMMM Do YYYY, hh:mm').fromNow(); // few seconds ago // 30 minutes ago // 6 hours ago //etc//
  }
}

export default order;