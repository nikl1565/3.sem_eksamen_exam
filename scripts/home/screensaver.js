import { startStaggerAnimation, startBasketAnimation } from "./animation";

export function addEventListenerToScreensaver() {
  document.querySelector("#screensaver").addEventListener("click", removeScreensaver);

  function removeScreensaver() {
    document.querySelector("#screensaver").classList.add("hidden_fade");
    document.querySelector("#screensaver").removeEventListener("click", removeScreensaver);

    startStaggerAnimation();
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth >= 1000) {
      startBasketAnimation();
    }
  }
}
