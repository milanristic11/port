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