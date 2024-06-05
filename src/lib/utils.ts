// @ts-nocheck
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* use case:
button.addEventListener(
  'click',
  throttle(function () {
    throwBall();
  }, 500)
);
*/
export function throttle(func, duration) {
  let shouldWait = false;

  return function (...args) {
    if (!shouldWait) {

      shouldWait = true;
      func.apply(this, args);

      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
}

/* use case:
button.addEventListener(
  'click', 
  debounce(function () {
    throwBall();
  }, 500)
);
*/
export function debounce(func, duration) {
  let timeout;

  return function (...args) {

    clearTimeout(timeout);

    const effect = () => {
      timeout = null;
      func.apply(this, args);
    }
    timeout = setTimeout(effect, duration);
  };
}