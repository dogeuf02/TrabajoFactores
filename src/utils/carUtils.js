// Cart utilities
export const cartUtils = {
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  },

  addToCart(product) {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  updateQuantity(index, quantity) {
    const cart = this.getCart();
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  updateItem(index, item) {
    const cart = this.getCart();
    cart[index] = { ...cart[index], ...item };
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  cleanText(text) {
    console.log("Texto limpio: ", text);
    return text ? text.replace(/^"(.+)"$/, '$1') : '';
  },
};