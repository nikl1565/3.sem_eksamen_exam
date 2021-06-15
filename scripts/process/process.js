import "../../sass/index.scss";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getData();
}

async function getData() {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com";
  let jsonData = await fetch(url);
  jsonData = await jsonData.json();

  getOrderId(jsonData);

  setTimeout(function () {
    getData();
  }, 5000);
}

function getOrderId(jsonData) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const orderId = parseInt(urlParams.get("id"));

  trackOrder(jsonData, orderId);
  showOrderId(orderId);
}

function showOrderId(orderId) {
  document.querySelector(".order_number").textContent = " #" + orderId;
}

function trackOrder(jsonData, orderId) {
  const queue = jsonData["queue"];
  const serving = jsonData["serving"];

  let orderInQueue;
  let servingOrder;

  setCircleTransition();
  setQueueStatus();
  SetServingStatus();
  setOrderDoneStatus();

  function setQueueStatus() {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id == orderId) {
        orderInQueue = true;
      }
    }

    if (orderInQueue === true) {
      console.log("order is in queue");

      setTimeout(() => {
        document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 33.33) / 100)";
      }, 500);
    }
  }

  function SetServingStatus() {
    for (let i = 0; i < serving.length; i++) {
      if (serving[i].id == orderId) {
        servingOrder = true;
        orderInQueue = false;
      } else {
        servingOrder = false;
      }
    }

    if (servingOrder === true) {
      console.log("order is being served");

      document.querySelector(".ill").src = "/preparing-order.svg";
      document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 66.66) / 100)";
    }
  }

  function setOrderDoneStatus() {
    if (orderInQueue === false && servingOrder === false) {
      console.log("order is done");
      document.querySelector(".ill").src = "/order-done.svg";
      document.querySelector("#process_main svg circle:nth-child(2)").style.strokeDashoffset = "calc(530px - (530px * 100) / 100)";

      document.querySelector("#process_body_wrapper").addEventListener("click", returnToHome);
      setTimeout(() => {
        returnToHome();
      }, 15000);
    }
  }
}

function setCircleTransition() {
  document.querySelector("#process_main > div.percent > svg > circle:nth-child(2)").style.transition = "stroke-dashoffset 1s linear";
}

function returnToHome() {
  document.querySelector("#process_body_wrapper").removeEventListener("click", returnToHome);

  window.location.href = `index.html`;
}
