$(window).on("load", function() {
    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
  });
/* Check the location of each element */
$('.content').each( function(i){
  
    var bottom_of_object= $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).height();
    
    if( bottom_of_object > bottom_of_window){
      $(this).addClass('hidden');
    }
  });
  
  
  $(window).scroll( function(){
      /* Check the location of each element hidden */
      $('.hidden').each( function(i){
        
          var bottom_of_object = $(this).offset().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();
        
          /* If the object is completely visible in the window, fadeIn it */
          if( bottom_of_window > bottom_of_object ){
            $(this).animate({'opacity':'1'},700);
          }
      });
  });
  
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        window.location.href = this.getAttribute('data-url');
    });
});

function animateCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const count = +counter.innerText.replace(/[^\d]/g, '');
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('%') ? '%' : '+');
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
      }
    };
    updateCount();
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkCounters() {
  const counterWrapper = document.querySelector('.counter-wrapper');
  if (isElementInViewport(counterWrapper)) {
    counterWrapper.classList.remove('hidden');
    animateCounters();
    window.removeEventListener('scroll', checkCounters);
  }
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('DOMContentLoaded', checkCounters);

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.add('scrolled');
      if (entry.target.classList.contains('counter-wrapper')) {
        animateCounters();
      }
      observer.unobserve(entry.target); // Прибираємо спостерігача після спрацьовування
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
});

document.querySelectorAll('.h1-text, .timeline h1, .wrapper h1, .section-head h1, .counter-wrapper').forEach(target => {
  observer.observe(target);
});
