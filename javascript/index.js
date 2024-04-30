const slider = document.querySelector(".resize");
const cards = document.querySelectorAll(".size");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // Adjust scrolling speed
  slider.scrollLeft = scrollLeft - walk;
});

// --------------------external carousel--------------
let currentIndex = 0;

function moveSlider(direction) {
  const slider = document.querySelector(".card-slider");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth;
  const maxIndex = cards.length - 1;

  currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
  const newPosition = -currentIndex * cardWidth;
  slider.style.transform = `translateX(${newPosition}px)`;
}

// -------------video-------

window.onload = function () {
  var videoIframe = document.querySelector("#video iframe");
  videoIframe.src += "&autoplay=1";
};

const carouselInner = document.querySelector(".carousel-inner");
const carouselItems = document.querySelectorAll(".carousel-item");
const carouselItemWidth = carouselItems[0].clientWidth;

let counter = 0;

// function moveCarousel() {
//   counter++;
//   if (counter >= carouselItems.length) {
//     counter = 0;
//   }
//   carouselInner.style.transform = `translateX(-${
//     counter * carouselItemWidth
//   }px)`;
// }

// setInterval(moveCarousel, 1000); // Change slide every 3 seconds

// ----------------------------dynamic data feed-------------------------------------
