//import { updateCartQuantity } from "../../data/cart.js";
import { regularCart } from "../../data/cart-class.js";
export function renderCheckoutHeader(){
      document.querySelector('.js-check-out')
    .innerHTML = `${regularCart.updateCartQuantity()} items`;
  
}