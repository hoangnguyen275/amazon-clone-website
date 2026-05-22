import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateDeliveryDate } from '../data/deliveryOptions.js';
import { renderSearchBar } from "./utils/searchBar.js";
import { regularCart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { products, getProduct } from "../data/products.js";

renderTracking();

function renderTracking(){
  
  renderSearchBar();

  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  let matchingOrder;
  let matchingProduct;
  let productDetails;

  document.querySelector('.js-cart-quantity-tracking-page').innerHTML = `${regularCart.updateCartQuantity()}`;

  orders.forEach((order) => {
    if (order.id === orderId){
      matchingOrder = order;
    }
  });

  let productsInOrder = matchingOrder.products;

  productsInOrder.forEach((product) => {
      if (productId === product.productId){
        matchingProduct = product;
      }
    });

  const orderTime = dayjs(matchingOrder.orderTime);
  
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);

  const currentTime = dayjs();

  const deliveryOptionDays = deliveryTime.diff(orderTime, 'day');
  
  const deliveryDateString = calculateDeliveryDate(undefined, orderTime, deliveryOptionDays);

  productDetails = getProduct(matchingProduct.productId);

  const progressPercentage = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${deliveryTime <= currentTime ? `Delivered on` : `Arriving on`} ${deliveryDateString}
      </div>

      <div class="product-info">
        ${productDetails.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProduct.quantity}
      </div>

      <img class="product-image" src="${productDetails.image}">

      <div class="progress-labels-container">
        <div class="progress-label js-progress-preparing" ${(progressPercentage < 50) ? 'current-status' : ''}>
          Preparing
        </div>
        <div class="progress-label js-progress-shipped ${(progressPercentage >= 50 && progressPercentage < 100) ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label js-progress-delivered ${(progressPercentage > 100) ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${progressPercentage}%;"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-main').innerHTML = trackingHTML;

}