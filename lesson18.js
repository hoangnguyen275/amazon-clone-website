import { regularCart } from "./data/cart-class.js";
import { products } from "./data/products.js";

console.log(regularCart.cartItems);
console.log(products);

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  //console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').then((response) => {
  return response.text();
}).then((result) => {
  //console.log(result);
});


async function function1(){
  const respone = await fetch('https://supersimplebackend.dev/greeting');
  const result = await respone.text();
  //console.log(result);
}
function1();

async function sendRequest(){
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: 'siuNhanGao'})
  });
  const result = await response.text();
  //console.log(result);
}
sendRequest();

async function getAmazon(){
  try{
    const response = await fetch('https://amazon.com');
    const text = await response.text();
    console.log(text);
  } catch(error){
    console.log('CORS error.');
  }
}
getAmazon();

async function function18g(){
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status >= 400){
      throw response;
    }
    
    const text = await response.text();
    console.log(text);

  } catch(error){
    if (error.status === 400){
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else{
      console.log('Network error. Please try again later.');
    }
  }
 
}
function18g();