// OPEN & CLOSE CART 
const cartIcon = document.querySelector(".cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".closeCart");
const bottomNav = document.querySelector(".bottom-nav");

cartIcon.addEventListener("click", ()=> {
    cart.classList.add("active");
});

closeCart.addEventListener("click", ()=> {
    cart.classList.remove("active");
});
//  function sop2() {
//     cart.classList.remove("active");
// }
// Start When The Document Is Ready 
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

// =========================== START =============== 

function start() {
    addEvents();
}

// =========================== UPDATE & RERENDER =============== 

function update() {
    addEvents();
    updateTotal();
}

// =========================== ADD EVENTS =============== 
function addEvents() {
    // Remove items from cart 
    let cartRemove_btn = document.querySelectorAll(".remove");
    cartRemove_btn.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}
// ==================== HANDEL EVENTS FUNCTION ==================
// let itemsAdded ;
// let sophy = 0;
if (localStorage.mah != null) {
    itemsAdded = JSON.parse(localStorage.mah);
    alert();
} else {
let itemsAdded = [];
}
function handle_addCartItem() {
    alert("تم إضافة عنصر إلي السلة")
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    
    // handel item is already exist
     if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
     } else {
        sophyButton();
        itemsAdded.push(newToAdd);
        localStorage.setItem("mah",  JSON.stringify(itemsAdded))
        console.log(itemsAdded);
     }
     sophyShow();
    update();
}


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el )=> el.title !=
         this.parentElement.querySelector('.cart-product-title').innerHTML
        );
        if (isNaN(sophy) || sophy <= 0) {
            sophy = 0;
        }else{
        sophy --;
        let sophy1 = document.querySelector(".sophy1");
        sophy1.innerHTML = sophy;
        sophy1.style.display = "block";
        }
    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There's No Order To Place Yet! \nPlease Make an Order First..");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is Placed Successfully :)");
    itemsAdded = [];
    update();
}

// =========================== UPDATE & RERENDER =============== 
function updateTotal() {
   let cartBoxes = document.querySelectorAll('.cart-box');
   const totalElement = cart.querySelector('.total-price');
   let total = 0;
   cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
   });

   // Keep 2 digits after the decimal point
   total = total.toFixed(2);
   // or you can use also
//    total = Math.round(total * 100) / 100;

   totalElement.innerHTML = "$" + total;
}

// =============== HTML COMPONENTS ===============
function sophyShow() {
    let show = "";
    for (let i = 0; i < itemsAdded.length; i++) {
    show += `<div class="cart-box">
                <img src=${itemsAdded[i].imgSrc} alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${itemsAdded[i].title}</div>
                    <div class="cart-price">${itemsAdded[i].price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <!-- REMOVE CART  -->
                <button class="remove"><i class="fa fa-trash-alt cart-remove"></i></button>
            </div>`;
    }
    document.querySelector(".cart-content").innerHTML = show;
}
sophyShow();
if (localStorage.mah1 != null) {
    sophy = JSON.parse(localStorage.mah1)
} else {
    let sophy = 0;
}
function sophyButton() {
    sophy ++;
    let sophy1 = document.querySelector(".sophy1");
    sophy1.innerHTML = sophy;
    sophy1.style.display = "block";
    localStorage.setItem("mah1",   JSON.stringify(sophy));
}
sophyButton();
// 58:27