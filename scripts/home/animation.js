import { gsap } from "gsap";

export function startStaggerAnimation() {
  gsap.from(".card", {
    duration: 0.5,
    scale: 0.5,
    opacity: 0,
    delay: 0.5,
    stagger: 0.2,
    ease: "ease-in-out",
    force3D: true,
  });
}

export function startBasketAnimation() {
  gsap.to("#basket", { duration: 1, x: 0 });
}
export function animationOnPages(element, measure) {
  if (measure === "0") {
    document.querySelector(`${element}`).style.pointerEvents = "none";
  } else {
    document.querySelector(`${element}`).style.pointerEvents = "all";
  }
  gsap.to(`${element}`, { duration: 0.2, opacity: `${measure}` });
}
