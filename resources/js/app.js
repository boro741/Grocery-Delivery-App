import axios from 'axios'
import Noty from 'noty'
// import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(grocery) {
   axios.post('/update-cart', grocery).then(res => {
       cartCounter.innerText = res.data.totalQty
       console.log(cartCounter.innerText)
       new Noty({
           type: 'success',
           timeout: 1000,
           text: 'Item added to cart',
           progressBar: false,
       }).show();
   }).catch(err => {
       new Noty({
           type: 'error',
           timeout: 1000,
           text: 'Something went wrong',
           progressBar: false,
       }).show();
   })
}

addToCart.forEach((btn) => {
   btn.addEventListener('click', (e) => {
       console.log(btn.dataset.grocery)
       let grocery = JSON.parse(btn.dataset.grocery)
       updateCart(grocery)
   })
})

// Remove alert message after X seconds 
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
   setTimeout(() => {
       alertMsg.remove()
   }, 2000)
}

// initAdmin()
