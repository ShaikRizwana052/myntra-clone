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

// Initialize carousel
var myCarousel = document.getElementById("carouselExampleControls");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000, // Set the interval to 2000 milliseconds (2 seconds)
});


  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.easy');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const cardWidth = document.querySelector('.size').offsetWidth;
    const totalCards = document.querySelectorAll('.size').length;
    const visibleCards = Math.floor(document.querySelector('.resize').offsetWidth / cardWidth);

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalCards - visibleCards) {
        currentIndex++;
        updateSlider();
      }
    });

    function updateSlider() {
      const offset = -(currentIndex * cardWidth);
      slider.style.transform = `translateX(${offset}px)`;
    }
  });
