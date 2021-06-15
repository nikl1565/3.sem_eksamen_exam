import { basket } from "./order";
export function displayTotal() {
  let priceCount = 0;

  document.querySelectorAll(".subtotal").forEach((element) => {
    let itemTotal = parseInt(element.textContent);
    priceCount += itemTotal;
  });

  document.querySelector(".total_price").textContent = `${priceCount},-`;
  getBasketNumber(priceCount);
}

function getBasketNumber(priceCount) {
  let basketNumber = priceCount / 40;

  if (basketNumber < 1) {
    document.querySelector(".basket_number").classList.add("hidden");
  } else {
    document.querySelector(".basket_number").classList.remove("hidden");
    document.querySelector(".basket_number").textContent = basketNumber;
  }
}

export function calculateBasketAmount(basket_item_name) {
  document.querySelector(`.${basket_item_name} .plus_basket`).addEventListener("click", () => plusBasket());
  document.querySelector(`.${basket_item_name} .minus_basket`).addEventListener("click", () => minusBasket());

  let basketCounter = document.querySelector(`.${basket_item_name} .basket_amount`);
  let basketCount = basketCounter.value;

  function plusBasket() {
    basketCount++;
    basketCounter.value = basketCount;

    let newBasketPrice = 40 * basketCount;
    let newnewPrice = newBasketPrice.toString();

    document.querySelector(`.${basket_item_name} .subtotal`).textContent = `${newnewPrice},-`;
    document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "white";

    displayTotal();
  }
  function minusBasket() {
    if (basketCount > 1) {
      basketCount--;
      basketCounter.value = basketCount;

      let newBasketPrice = 40 * basketCount;
      let newnewPrice = newBasketPrice.toString();

      document.querySelector(`.${basket_item_name} .subtotal`).textContent = `${newnewPrice},-`;

      displayTotal();

      if (basketCount < 2) {
        document.querySelector(`.${basket_item_name} .minus_basket`).style.backgroundColor = "#f4f4f4";
        displayTotal();
      }
    }
  }
}

export function removeBasketItem(basketItem, basket_item_name) {
  document.querySelector(`.remove_${basket_item_name}`).removeEventListener("click", removeBasketItem);

  // animate item out
  document.querySelector(`.${basket_item_name}`).classList.add("backOutRight");

  setTimeout(() => {
    basketItem.remove();
  }, 1000);

  basket[basketItem.dataset.field] = false;

  checkIfBasketIsEmpty();
  displayTotal();
}

export function createAddedElement(beer, basket_item_name) {
  const price = 40 * document.querySelector(".amount").value + ",-";

  const li = document.createElement("li");
  li.classList.add(basket_item_name);
  li.dataset.field = beer.name;

  const content = document.createElement("div");
  content.classList.add("content");

  const img = document.createElement("img");
  img.src = `beer_images_with_circle/${beer.name}.png`;
  content.append(img);

  const div_text = document.createElement("div");
  const div_amount = document.createElement("div");
  content.append(div_text);
  div_text.append(div_amount);

  let text = ["40,-", beer.name];
  text.forEach(function (el) {
    const p = document.createElement("p");
    p.textContent = el;
    p.classList.add("basket_text");
    div_text.append(p);
  });

  const totalAmount = document.createElement("p");
  totalAmount.textContent = price;
  totalAmount.classList.add("subtotal");
  content.append(totalAmount);

  const minus_button = document.createElement("button");
  minus_button.textContent = "-";
  minus_button.classList.add("plus_minus", "minus_basket");
  div_amount.append(minus_button);

  const input = document.createElement("input");
  const amount = document.querySelector(".amount").value;
  input.classList.add("basket_amount");
  div_amount.append(input);

  input.value = amount;
  input.disabled = true;

  const plus_button = document.createElement("button");
  plus_button.textContent = "+";
  plus_button.classList.add("plus_minus", "plus_basket");
  div_amount.append(plus_button);

  const button = document.createElement("button");
  button.classList.add("remove_added_beer", `remove_${basket_item_name}`);
  content.append(button);

  li.append(content);

  return li;
}

function checkIfBasketIsEmpty() {
  const basketListItems = document.querySelectorAll(".added_beers ul li");
  console.log(basketListItems);

  for (let i = 0; i <= basketListItems.length; i++) {
    if (basketListItems.length === 1) {
      document.querySelector(".basket_pay").style.opacity = 0.2;

      setTimeout(() => {
        document.querySelector(".empty_basket").style.display = "block";
      }, 1000);
    }
  }
}
