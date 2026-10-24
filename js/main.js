/**
 * SMART ADVERTISING FLEX PRINTING - MAIN JS
 * Owner: Anand Awad | Contact: 8888086602 | Punawale, Pune
 * Shared interactions, mobile navigation, scroll header, home hero slider, and enquiry handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================
  // 1. Mobile Menu Drawer Toggle
  // ========================================================
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking a nav link
    navDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navDrawer.contains(e.target) && !menuToggle.contains(e.target) && navDrawer.classList.contains('is-open')) {
        navDrawer.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========================================================
  // 2. Sticky Header Elevation on Scroll
  // ========================================================
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // ========================================================
  // 3. Highlight Current Active Nav Link
  // ========================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========================================================
  // 4. Hero Slide Bar / Carousel (Home Page)
  // ========================================================
  const sliderContainer = document.getElementById('heroSlider');
  if (sliderContainer) {
    const slides = sliderContainer.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const counterCurrent = document.getElementById('slideCurrentIndex');
    const counterTotal = document.getElementById('slideTotalCount');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;
    const autoPlayInterval = 4500; // 4.5 seconds

    if (counterTotal) counterTotal.textContent = String(totalSlides).padStart(2, '0');

    // Create pagination dots dynamically if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlideUI() {
      slides.forEach((slide, idx) => {
        if (idx === currentSlide) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }

      if (counterCurrent) {
        counterCurrent.textContent = String(currentSlide + 1).padStart(2, '0');
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlideUI();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlideUI();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlideUI();
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Keyboard support
    sliderContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      }
    });

    // Touch / Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
        resetAutoPlay();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
        resetAutoPlay();
      }
    }

    // Start auto slider
    startAutoPlay();
  }

  // ========================================================
  // 5. Contact Enquiry Form to WhatsApp (Phone: 8888086602)
  // ========================================================
  const contactForm = document.getElementById('contactEnquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim() || 'Valued Customer';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const service = document.getElementById('contactService')?.value || 'Flex Printing';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!phone) {
        alert('Please enter your phone or WhatsApp number.');
        return;
      }

      const whatsappText = `Hello Smart Advertising,\n\nI would like to inquire about printing services:\n- *Customer Name*: ${name}\n- *Contact Phone*: ${phone}\n- *Service*: ${service}\n- *Requirements / Size*: ${message || 'Please share quote and turnaround details.'}\n\nPlease share the quote. Thank you!`;
      
      const whatsappUrl = `https://wa.me/918888086602?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
