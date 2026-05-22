import { renderSearchBar } from './utils/searchBar.js';
import {regularCart} from '../data/cart-class.js'
//import {addToCart, updateCartQuantity} from '../data/cart.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

//loadProducts(renderProductGrid);
//await loadProductsFetch();

renderProductGrid();

function renderProductGrid(){

  renderSearchBar();

  const url = new URL(window.location.href);

  const searchProduct = url.searchParams.get('search');

  let productsHTML = '';

  let filterProducts = products;

  document.querySelector('.js-cart-quantity-main-page')
    .innerHTML = regularCart.updateCartQuantity();
  
  if (searchProduct){
    filterProducts = products.filter((product) => {
      return (product.name).toLowerCase().includes(searchProduct.toLowerCase()) ||
              (product.keywords).some((keyword) => { 
                return searchProduct.toLowerCase().includes(keyword.toLowerCase())});
    });
  } 

  filterProducts.forEach((product) =>{
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image} ">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}
        ${product.instructionInfoHTML()}
        ${product.warrantyInfoHTML()}

        <div class="product-spacer"></div>

        <div class="js-added-to-cart-${product.id} added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;



  function addedToCartVisible(productId, addMessageTimoutId){
    let addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCartElement.classList.add('added-to-cart-visible');    

    if (addMessageTimoutId){
      clearTimeout(addMessageTimoutId);
    }

    addMessageTimoutId = setTimeout(() => {
      addedToCartElement.classList.remove('added-to-cart-visible');
    }, 2000);
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {

      let addMessageTimoutId;

      button.addEventListener('click', () => {

        const productId = button.dataset.productId;
        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        regularCart.addToCart(productId, quantity);
        document.querySelector('.js-cart-quantity-main-page')
          .innerHTML = regularCart.updateCartQuantity();
        addedToCartVisible(productId,addMessageTimoutId);
        
      });
    });

}

