// Auto Slide Show
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
  document.querySelector(".slides").style.transform = `translateX(-${index * 100}%)`;
  index = (index + 1) % slides.length;
}

setInterval(showSlides, 3000);
