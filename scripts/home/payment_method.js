export const paymentMethod = {
  mobilepay: false,
  card: false,
  contactless: false,
};

export function getPaymentMethod() {
  document.querySelectorAll(".payment_icon").forEach((button) => {
    button.addEventListener("click", () => {
      const all_payment_buttons = document.querySelectorAll(".payment_icon path");
      console.log(all_payment_buttons);
      all_payment_buttons;
      all_payment_buttons.forEach(function (button) {
        button.style.fill = "#343331";
      });

      checkIfBasketIsEmpty();

      paymentMethod[button.dataset.payment] = true;

      document.querySelector(`[data-payment=${button.dataset.payment}]`).classList.add("chosen");

      const chosen_button = document.querySelectorAll(`[data-payment=${button.dataset.payment}] path`);
      chosen_button.forEach(function (button) {
        button.style.fill = "white";
      });

      document.querySelectorAll(".payment_icon").forEach((method) => {
        if (button.dataset.payment !== method.dataset.payment) {
          method.classList.remove("chosen");
          paymentMethod[method.dataset.payment] = false;
        }
      });
    });
  });
}

function checkIfBasketIsEmpty() {
  const basketList = document.querySelectorAll(".added_beers ul li");

  for (let i = 0; i <= basketList.length; i++) {
    if (basketList.length >= 1) {
      document.querySelector(".basket_pay").style.opacity = 1;
    }
  }
}
