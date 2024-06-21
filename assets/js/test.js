// OPEN & CLOSE CART 
const cartIcon = document.querySelector(".cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".closeCart");

cartIcon.addEventListener("click", ()=> {
    cart.classList.add("active");
});


closeCart.addEventListener("click", ()=> {
    cart.classList.remove("active");
});

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
let itemsAdded = [];
function handle_addCartItem() {
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
        localStorage.setItem('item', JSON.stringify(itemsAdded));
        alert("تم إضافة عنصر إلي السلة");
        // console.log(itemsAdded);
     }
    shoeItem();
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el )=> el.title !=
         this.parentElement.querySelector('.cart-product-title').innerHTML
        );
        if (isNaN(number1) || number1 <= 0) {
            number1 = 0;
        }else{
        number1 --;
        let sophy1 = document.querySelector(".sophy1");
        sophy1.textContent = number1;
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
function shoeItem() {
    var storedItem = localStorage.getItem('item');
    if (storedItem) {
         item = JSON.parse(localStorage.item);
        let show = "";
        for (let i = 0; i < item.length; i++) {
        show += `<div class="cart-box">
                    <img src=${item[i].imgSrc} alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${item[i].title}</div>
                        <div class="cart-price">${item[i].price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!-- REMOVE CART  -->
                    <button class="remove"><i class="fa fa-trash-alt cart-remove"></i></button>
                </div>`;
        }
        document.querySelector(".cart-content").innerHTML = show;
    } else {
       alert("no item here") 
    }
   
}
let key = "mah1";
let number1 = localStorage.getItem(key);
if (number1 !== null) {
    number1 = parseInt(number1);
} else {
     number1 = 0;
}
function sophyButton() {
    number1 += 1;
    let sophy1 = document.querySelector(".sophy1");
    sophy1.textContent = number1;
    sophy1.style.display = "block";
    localStorage.setItem(key,  number1);
}
sophyButton();
shoeItem();
document.addEventListener('DOMContentLoaded', function () {
    let images = document.querySelectorAll('.product-box img');
    let title = document.querySelectorAll('.product-box .product-title');
    let price = document.querySelectorAll('.product-box span');
    let popup = document.querySelector('.popup');
    let popupImg = document.querySelector('.popupImg');
    let copyprice = document.querySelectorAll('.copyprice');
    let copytitle = document.querySelectorAll('.copytitle');
    images.forEach(Boxs => {
        Boxs.addEventListener('click', function () {
            popupImg.src = Boxs.src;
            popup.classList.add('active');
        });
    });
    popup.addEventListener('click', function () {
        popup.classList.remove('active');
    });
})
// 58:27