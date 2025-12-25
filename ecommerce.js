const darkmode = document.querySelector(".darkmode");
const body = document.body;
darkmode.addEventListener("click",()=>{
  body.classList.toggle("dark:bg-neutral-900");
  body.classList.toggle("dark:text-neutral-100");
});

const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart-close");
cartIcon.addEventListener("click",()=>{
  cart.classList.toggle("-right-200");
  cart.classList.toggle("right-0");
});
cartClose.addEventListener("click",()=>{
  cart.classList.toggle("-right-200");
  cart.classList.toggle("right-0");
});


const addCartBtns = document.querySelectorAll(".add-cart");
addCartBtns.forEach(btn=>{
  btn.addEventListener("click", event=>{
    const productBox = event.target.closest(".product-box")
    addToCart(productBox)
    updatePrice();
  })
})

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox =>{
  
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".product-price").textContent;
  const cartItems = document.querySelectorAll('.cart-title')
  for(let item of cartItems){
    if(item.textContent === productTitle){
      alert("This item already Exist");
      return;
    }
  }
  const cartBox = document.createElement('div');
  cartBox.innerHTML = `
    <div class="cart-box flex max-w-max items-center mt-1 gap-4 rounded">
      <img src="${productImgSrc}" class="cart-img object-cover size-30 rounded-sm"/>
      <div class="cart-details grid gap-1 mr-auto">
        <h3 class="cart-title font-serif text-2xl text-gray-100 font-bold">${productTitle}</h3>
        <span class="cart-price text-gray-100">${productPrice}</span>
        <div class="cart-quantity border-2 border-white flex justify-evenly rounded cursor-pointer bg-white text-neutral-900 active:text-neutral-200 active:bg-transparent active:opacity transition-transform">
          <button class="increment">+</button>
          <span class="number flex justify-center items-center border-x-2 border-white px-2 text-neutral-200 bg-neutral-800 opacity-100">1</span>
          <button class="decrement">-</button>
        </div>
      </div>
      <img src="https://i.ibb.co/DDGZ8mQx/close.png" class="cart-remove size-4 bg-white cursor-pointer"/>
    </div>
  `;
  cartContent.appendChild(cartBox);
  cartBox.querySelector('.cart-remove').addEventListener('click',()=>{
    cartBox.remove();
    updatePrice();
    updateItemCount(-1)
  })
  cartBox.querySelector('.cart-quantity').addEventListener('click', event =>{
    const decrementButton = cartBox.querySelector('.decrement')
    const incrementButton = cartBox.querySelector('.increment')
    const numberElement = cartBox.querySelector('.number')
    let quantity = parseInt(numberElement.textContent)
    if(event.target.classList.contains('decrement') && quantity > 1){
      quantity--
      
      if(quantity === 1){
        decrementButton.style.color = "#999"
        updateItemCount(-1)
      }
    }else if(event.target.classList.contains('increment')){
      quantity++
      incrementButton.style.color = "#333"
      decrementButton.style.color = "#333"
      updateItemCount(1)
    }
    numberElement.textContent = quantity
    updatePrice();
    
  })
  updateItemCount(1)
}
const updatePrice = () =>{
  const cartBoxes = document.querySelectorAll('.cart-box');
  let total = 0;
  const cart = document.querySelector(".cart");
  const totalPrice = cart.querySelector('.total-price');
  cartBoxes.forEach(cartBox =>{
    const cartPrice = cartBox.querySelector('.cart-price');
    const numberElement = cartBox.querySelector('.number');
    const price = parseFloat(cartPrice.textContent.replace("$", ""));
    const quantity = parseInt(numberElement.textContent);
    total += quantity * price;
  });
  totalPrice.textContent = `$${total.toFixed(2)}`;
};
let cartCount = 0;
const updateItemCount = change => {
  const countItemBadge = document.querySelector('.countbadge');
  cartCount += change;
  if (cartCount > 0) {
    countItemBadge.classList.remove("hidden");
    countItemBadge.classList.add("block");
    countItemBadge.textContent = cartCount;
  } else {
    countItemBadge.classList.remove("block");
    countItemBadge.classList.add("hidden");
    countItemBadge.textContent = "";
  }
}
const buyBtn = document.querySelector('.btn-buy')
buyBtn.addEventListener('click',()=>{
  const cartBoxes = document.querySelectorAll('.cart-box')
  if(cartBoxes.length===0){
    alert('Your Cart is empty, Please purchase')
    return
  }
  cartBoxes.forEach(cartbox=> cartbox.remove())
  cartCount = 0
  updateItemCount(0)
  updatePrice()
  alert('Thank You for your Purchase')
})
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("opacity-100","translate-x-0")
      entry.target.classList.remove("opacity-0","translate-x-64")
    }
  })
},{})
const products = document.querySelectorAll(".product-box")
products.forEach(product=>observer.observe(product))
