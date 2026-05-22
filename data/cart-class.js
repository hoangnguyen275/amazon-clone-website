import { deliveryOptions } from "./deliveryOptions.js";

export class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

    if (!this.cartItems){
      this.cartItems = [];
    }
  }
  
  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity){
    let matchingItem;

    this.cartItems.forEach((cartItem) =>{
      if (productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if (matchingItem){
      matchingItem.quantity += quantity;
    } else{
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateCartQuantity(){
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) =>{
      cartQuantity += cartItem.quantity;
    });
    if (cartQuantity === 0){
      return '';
    }
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity){
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId){
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    let productFound = false;
    let deliveryOptionFound = false;
    this.cartItems.forEach((cartItem) =>{
      if (productId === cartItem.productId){
        matchingItem = cartItem;
        productFound = true;
      }
    });
    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOptionId === deliveryOption.id){
        deliveryOptionFound = true;
      }
    });

    if (productFound && deliveryOptionFound){
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    } else {
      return;
    }
    
  }
}

export const regularCart = new Cart('regularCart');
















