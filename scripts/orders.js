import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateDeliveryDate } from '../data/deliveryOptions.js';
import { renderSearchBar } from "./utils/searchBar.js";
import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import { getProduct, products } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { regularCart } from "../data/cart-class.js";

//await loadProductsFetch();
renderOrdersGrid();
function renderOrdersGrid(){

  renderSearchBar();

  document.querySelector('.js-cart-quantity-orders-page').innerHTML = `${regularCart.updateCartQuantity()}`;

  let ordersHTML = '';

  orders.forEach((order) => {
    if (order.errorMessage){
      return;
    }
    const orderId = order.id;

    const orderDate = dayjs(order.orderTime);

    const dateString = new Date(order.orderTime).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    
    const products = order.products;
    
    const totalCostCents = order.totalCostCents;
    
    ordersHTML += `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderProducts(products, orderId, orderDate)}
        </div>
      </div>

    `
  });
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}


function renderProducts(products, orderId, orderDate){
  let html =  ``;
  products.forEach((product) => {
    const productId = product.productId;

    const matchingProduct = getProduct(productId);

    const quantity = Number(product.quantity);

    const deliveryDate = dayjs(product.estimatedDeliveryTime);

    const currentDate = dayjs();

    const deliveryOptionDays = deliveryDate.diff(orderDate, 'day');

    const deliveryDateString = calculateDeliveryDate(undefined, orderDate, deliveryOptionDays);

    html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          ${deliveryDate.isBefore(currentDate) || deliveryDate.isSame(currentDate) ? `Delivered on` : `Arriving on`}: ${deliveryDateString}
        </div>
        <div class="product-quantity">
          Quantity: ${quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" 
                data-product-id="${matchingProduct.id}" data-quantity=${quantity}>
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  });

  return html;
}

document.querySelectorAll('.js-buy-again-button').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, quantity} = element.dataset;
    regularCart.addToCart(productId, Number(quantity));
    document.querySelector('.js-cart-quantity-orders-page').innerHTML = `${regularCart.updateCartQuantity()}`;
    window.location.href = 'checkout.html';
  });
});