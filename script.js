let scrollSpeed = 0.1; 
let damping = 0.08;

let currentScroll = window.scrollY;
let targetScroll = window.scrollY;

let isMobile = window.matchMedia("(max-width: 1440px)").matches;

if (!isMobile) {
  
  function mouseScroll(event) {
    event.preventDefault();

    let scrollAmount = window.innerHeight * scrollSpeed;
    
    if (event.deltaY > 0) {
      targetScroll += scrollAmount;
    }
    else {
      targetScroll -= scrollAmount;
    }
  }

  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * damping;

    if (Math.abs(targetScroll - currentScroll) < 0.1) {
      currentScroll = targetScroll;
    }

    window.scrollTo(0, currentScroll);
    requestAnimationFrame(smoothScroll);
  }

  window.addEventListener("wheel", mouseScroll, { passive: false });

  smoothScroll();  
}


document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.carousel .card1, .carousel .card2, .carousel .card3, .carousel .card4');
  const totalCards = cards.length;

  function moveRight() {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  AOS.init();

  function updateButtons() {
    const rightArrow = document.querySelector('.right-arrow');
    const leftArrow = document.querySelector('.left-arrow');

    if (currentIndex === totalCards - 1) {
      rightArrow.style.opacity = "0.5";
      rightArrow.style.pointerEvents = "none";
    } else {
      rightArrow.style.opacity = "1";
      rightArrow.style.pointerEvents = "auto";
    }

    if (currentIndex === 0) {
      leftArrow.style.opacity = "0.5";
      leftArrow.style.pointerEvents = "none";
    } else {
      leftArrow.style.opacity = "1";
      leftArrow.style.pointerEvents = "auto";
    }
  }

  function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const cardWidth = cards[0].offsetWidth + 20; 
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtons();
  }

  updateCarousel();

  document.querySelector('.left-arrow').addEventListener('click', moveLeft);
  document.querySelector('.right-arrow').addEventListener('click', moveRight);
});







