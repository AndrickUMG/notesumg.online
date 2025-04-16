// Menú móvil
document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('nav-open');
});

// Carrusel funcional
function moveCarousel(carouselId, direction) {
  const track = document.getElementById(carouselId);
  const items = track.querySelectorAll('.carousel-item');
  const itemWidth = items[0].offsetWidth + 20;

  const currentPosition = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '') || 0);
  let newPosition = currentPosition + (direction * itemWidth);

  const maxScroll = -(items.length * itemWidth - track.parentElement.offsetWidth + 40);
  if (newPosition < maxScroll) newPosition = maxScroll;
  if (newPosition > 0) newPosition = 0;

  track.style.transform = `translateX(${newPosition}px)`;
}

// Soporte táctil para carrusel
document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel-track');

  carousels.forEach(carousel => {
    let startX, startScrollLeft, isDragging = false;

    carousel.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = parseInt(carousel.style.transform.replace('translateX(', '').replace('px)', '') || 0);
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - startX);
      carousel.style.transform = `translateX(${startScrollLeft + walk}px)`;
    });

    carousel.addEventListener('mouseup', function () {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseleave', function () {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('touchstart', function (e) {
      isDragging = true;
      startX = e.touches[0].pageX;
      startScrollLeft = parseInt(carousel.style.transform.replace('translateX(', '').replace('px)', '') || 0);
    }, { passive: true });

    carousel.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = (x - startX);
      carousel.style.transform = `translateX(${startScrollLeft + walk}px)`;
    }, { passive: true });

    carousel.addEventListener('touchend', function () {
      isDragging = false;
    });
  });
});
