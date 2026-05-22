import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { regularCart } from "../../data/cart-class.js";
import { loadProducts, loadProductFetch } from "../../data/products.js";
//import {loadFromStorage, cart} from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll( async () => {
    await loadProductFetch();
  });
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-check-out"></div>
    `;

    regularCart.cartItems = [{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    renderOrderSummary();

  });

  it('display the cart', () => {
    expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$10.90');

    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('removes a product', () =>{
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(regularCart.cartItems.length).toEqual(1);
    expect(regularCart.cartItems[0].productId).toEqual(productId2);
    
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
    expect(regularCart.cartItems.length).toEqual(2);
    renderPaymentSummary();
    expect(document.querySelector('.js-shipping-price').innerText).toEqual(`$14.98`);    
    document.querySelector('.js-test-container').innerHTML = ``;
  });
});