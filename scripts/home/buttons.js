import { animationOnPages } from "./animation";
let filter = "flavor";

export function addEventListenerToButtons() {
  document.querySelectorAll(".description_tabs button").forEach((btn) => {
    btn.addEventListener("click", filterDesc);
  });

  document.querySelector(".basket_icon").addEventListener("click", function () {
    document.querySelector("#basket").style.display = "block";

    animationOnPages(`#basket`, `1`);
    animationOnPages(`#help_body`, `0`);

    document.querySelector(".basket_icon").classList.add("chosen");
    document.querySelector(".home_icon").classList.remove("chosen");
    document.querySelector(".help_icon").classList.remove("chosen");
  });
  document.querySelector(".help_icon").addEventListener("click", function () {
    animationOnPages(`#help_body`, `1`);
    animationOnPages(`#basket`, `0`);

    document.querySelector(".help_icon").classList.add("chosen");
    document.querySelector(".home_icon").classList.remove("chosen");
    document.querySelector(".basket_icon").classList.remove("chosen");
  });
  document.querySelector(".home_icon").addEventListener("click", function () {
    animationOnPages(`#help_body`, `0`);
    animationOnPages(`#basket`, `0`);

    document.querySelector("#singleview").style.display = "none";
    document.querySelector(".home_icon").classList.add("chosen");
    document.querySelector(".help_icon").classList.remove("chosen");
    document.querySelector(".basket_icon").classList.remove("chosen");
  });
  document.querySelector(".help_logo").addEventListener("click", function () {
    animationOnPages(`#help_body`, `1`);

    document.querySelector("#help_body").style.display = "flex";
    document.querySelector(".close_helpview").addEventListener("click", goBack);
  });

  function goBack() {
    animationOnPages(`#help_body`, `0`);

    document.querySelector(".back").removeEventListener("click", goBack);
  }
}

function filterDesc() {
  filter = this.dataset.field;

  document.querySelectorAll(".description_tabs button").forEach((btn) => {
    btn.classList.remove("chosen_desc");
  });

  document.querySelectorAll(".desc_wrapper p").forEach((p) => {
    p.classList.add("hidden");
  });

  this.classList.add("chosen_desc");

  document.querySelector(`.${filter}_desc`).classList.remove("hidden");
}
