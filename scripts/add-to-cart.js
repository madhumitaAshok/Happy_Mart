let homeCart = document.getElementById("homeCart");
let cateCart = document.getElementById("cateCart");
let searchCart = document.getElementById("searchCart");
let profileCart = document.getElementById("profileCart");
let checkoutCart = document.getElementById("checkoutCart");

async function addToCart(product, btnId, qtyId) {
  let goodName = product.toLowerCase();
  let category;
  if (groceryArray.includes(goodName)) {
    category = "grocery";
  } else if (fruitsArray.includes(goodName)) {
    category = "fruits";
  }
  if (vegetablesArray.includes(goodName)) {
    category = "vegetables";
  }
  if (houseHoldArray.includes(goodName)) {
    category = "houseHold";
  }
  let uniqueData = await getUniqueUserDetails();
  if (uniqueData[category][goodName].cart === true) {
    uniqueData[category][goodName].cart = false;
    btnId.innerHTML = "Add To Cart";
    uniqueData[category][goodName].qty = 0;
    btnId.classList.remove("btnColor");
  } else {
    uniqueData[category][goodName].cart = true;
    btnId.innerHTML = "Remove from Cart";
    btnId.classList.add("btnColor");
  }
  await updatedData(uniqueData);
  fetchQuantityDetails(qtyId, product);
  let ans = await checkCart();
  if (ans === 0) {
    noItemCart();
  } else {
    addedCart();
  }
}

async function addToCartFromHome(element, product) {
  displayNone(element);
  searchPage.style.display = "flex";
  searchItem.classList.add("showBox");
  createCard(product);
  addedCart();
}

function addedCart() {
  homeCart.src = "./assets/addedCart.png";
  cateCart.src = "./assets/addedCart.png";
  searchCart.src = "./assets/addedCart.png";
  profileCart.src = "./assets/addedCart.png";
  checkoutCart.src = "./assets/addedCart.png";
}

function noItemCart() {
  homeCart.src = "./assets/shopping-cart.png";
  cateCart.src = "./assets/shopping-cart.png";
  searchCart.src = "./assets/shopping-cart.png";
  profileCart.src = "./assets/shopping-cart.png";
  checkoutCart.src = "./assets/shopping-cart.png";
}

async function fetchQuantityDetails(id, value) {
  let goodName = value.toLowerCase();
  let category;
  if (groceryArray.includes(goodName)) {
    category = "grocery";
  } else if (fruitsArray.includes(goodName)) {
    category = "fruits";
  }
  if (vegetablesArray.includes(goodName)) {
    category = "vegetables";
  }
  if (houseHoldArray.includes(goodName)) {
    category = "houseHold";
  }
  let uniqueData = await getUniqueUserDetails();
  if (uniqueData[category][goodName].cart === true) {
    uniqueData[category][goodName].qty = parseInt(id.value);
    await updatedData(uniqueData);
  }
}

function updateQty(qty, id) {
  id.value = qty;
}
