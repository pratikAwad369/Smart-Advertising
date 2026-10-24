/**
 * SMART ADVERTISING FLEX PRINTING - GALLERY & LIGHTBOX
 * Categorized filtering and full-featured accessible lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  let currentVisibleItems = Array.from(galleryItems);
  let currentIndex = -1;

  // 1. Filtering Logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update currently visible items list for lightbox navigation
      currentVisibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  // 2. Lightbox Open
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visibleIndex = currentVisibleItems.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visibleIndex = currentVisibleItems.indexOf(item);
        if (visibleIndex !== -1) openLightbox(visibleIndex);
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || !currentVisibleItems[index]) return;
    currentIndex = index;
    const targetItem = currentVisibleItems[currentIndex];
    const imgEl = targetItem.querySelector('img');
    const captionEl = targetItem.querySelector('.gallery-item-caption');
    const tagEl = targetItem.querySelector('.gallery-item-tag');

    lightboxImg.src = imgEl ? (targetItem.getAttribute('data-full') || imgEl.src) : '';
    lightboxImg.alt = imgEl ? imgEl.alt : 'Gallery Image';
    lightboxTitle.textContent = captionEl ? captionEl.textContent : 'Print Showcase';
    lightboxCategory.textContent = tagEl ? tagEl.textContent : '';

    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-image-wrap')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});
