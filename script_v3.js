/* ============================================================
   SCRIPT.JS – The Journey of Clow Landing Page
   ============================================================ */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MOBILE NAV TOGGLE ----
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

const toggleMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
  if (navOverlay) navOverlay.classList.toggle('open', isOpen);
};

const closeMenu = () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('open');
};

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeMenu);
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (navToggle && navLinks) {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && (!navOverlay || !navOverlay.contains(e.target))) {
      closeMenu();
    }
  }
});


// ---- INTERSECTION OBSERVER – fade in on scroll ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = ''; // Transition directly to stylesheet transform
      
      // Clean up inline styles after the transition ends to allow CSS hovers to work
      const cleanUpStyles = (e) => {
        if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          entry.target.style.transition = '';
          entry.target.removeEventListener('transitionend', cleanUpStyles);
        }
      };
      entry.target.addEventListener('transitionend', cleanUpStyles);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply staggered reveal to various card elements
const animatableSelectors = [
  '.target-card',
  '.benefit-card',
  '.req-card',
  '.fact-item',
  '.price-card',
];

animatableSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
    observer.observe(el);
  });
});

// Also observe section titles/tags
document.querySelectorAll('.section-title, .section-tag, .section-desc').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`;
  observer.observe(el);
});

// ---- SPARKLE PARTICLES on hero ----
function createSparkle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const sparkle = document.createElement('div');
  sparkle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 4 + 1}px;
    height: ${Math.random() * 4 + 1}px;
    background: rgba(232,112,164,${Math.random() * 0.6 + 0.2});
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    pointer-events: none;
    z-index: 1;
    animation: sparkle-fade ${Math.random() * 2 + 1.5}s ease forwards;
  `;
  hero.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 3500);
}

// Add sparkle keyframes dynamically
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkle-fade {
    0%   { opacity: 0; transform: scale(0) translateY(0); }
    30%  { opacity: 1; transform: scale(1) translateY(-10px); }
    100% { opacity: 0; transform: scale(0.5) translateY(-40px); }
  }
`;
document.head.appendChild(sparkleStyle);

setInterval(createSparkle, 400);

// ---- SMOOTH ACTIVE NAV on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!navLink) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
      navLink.classList.add('active-link');
    }
  });
}, { passive: true });

// ===== COMPREHENSIVE COLOR OVERRIDE – purple/gold palette =====
const colorOverrideStyle = document.createElement('style');
colorOverrideStyle.textContent = `
  /* Force ALL nav links white, NO teal/blue */
  .nav-links a,
  .nav-links li a,
  header .nav-links a {
    color: rgba(255, 255, 255, 0.88) !important;
  }
  .nav-links a.active-link,
  .nav-links a:hover {
    color: #E8B88A !important;
  }
  .nav-links a::after {
    background: linear-gradient(90deg, #7B3FAE, #D4935A) !important;
  }
  .nav-links a.active-link::after,
  .nav-links a:hover::after {
    transform: scaleX(1) !important;
    background: linear-gradient(90deg, #7B3FAE, #D4935A) !important;
  }

  /* Section tags – gold not teal */
  .section-tag { color: #D4935A !important; }
  .section-tag::before { background: linear-gradient(90deg, transparent, #D4935A) !important; }
  .section-tag::after  { background: linear-gradient(90deg, #B080D8, transparent) !important; }

  /* Kill all remaining teal/cyan color usages */
  :root {
    --teal:       #7B3FAE !important;
    --teal-light: #C090E0 !important;
    --teal-dark:  #5A2D88 !important;
    --pink:       #9B60C8 !important;
    --pink-light: #E8B88A !important;
    --blue:       #5A2D88 !important;
    --blue-light: #8A5CC0 !important;
  }
`;
document.head.appendChild(colorOverrideStyle);

// ---- COUNTER ANIMATION for hero stats ----
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  const suffix = el.textContent.replace(/[0-9]/g, '');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[0-9]/g, '');
      if (num) animateCounter(el, num, 1800);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

// ---- REGISTER FORM SUBMISSION (GOOGLE SHEETS) ----
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIhmlBC5TXKoXSa2XPUdHStElLhTCSlhe_-cO4GHPlNYm8gLQCZdU_pqXIbvAG8mH7UA/exec';

let pendingFormData = null;

function handleRegisterSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('reg-form');
  const submitBtn = document.getElementById('reg-submit');
  const paymentStep = document.getElementById('payment-step');
  
  // Lấy lựa chọn khoá học và hình thức đóng phí
  const courseOption = document.getElementById('reg-course').selectedOptions[0];
  const payment = document.getElementById('reg-payment').value;
  const amount = Number(payment === 'Trả góp' ? courseOption?.dataset.deposit : courseOption?.dataset.price);
  if (!Number.isFinite(amount) || amount <= 0) return;

  // Lấy thêm số điện thoại để làm nội dung chuyển khoản
  const phone = document.getElementById('reg-phone').value;
  const courseStr = courseOption.dataset.title;
  const transferContent = encodeURIComponent(`${courseStr} ${phone}`);

  // Cập nhật số tiền và mã QR
  const amountText = new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  document.getElementById('payment-amount').innerText = amountText;
  document.getElementById('payment-content').innerText = `${courseStr} ${phone}`;
  document.getElementById('qr-image').src = `https://img.vietqr.io/image/tpbank-0969302801-compact2.png?amount=${amount}&addInfo=${transferContent}&accountName=PHAN%20THAI%20BAO`;

  // Lưu dữ liệu form vào biến toàn cục để gửi sau khi thanh toán
  pendingFormData = new URLSearchParams();
  for (const pair of new FormData(form)) {
    pendingFormData.append(pair[0], pair[1]);
  }
  pendingFormData.append('amount', amountText);

  // Ẩn form và hiện bước Thanh Toán ngay lập tức (Chưa gửi form)
  form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  form.style.opacity = '0';
  form.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    form.style.display = 'none';
    paymentStep.style.display = 'block';
    paymentStep.style.opacity = '0';
    paymentStep.style.transition = 'opacity 0.5s ease';
    void paymentStep.offsetWidth;
    paymentStep.style.opacity = '1';
  }, 400);
}

// Logic cho nút "Đã thanh toán"
document.addEventListener('DOMContentLoaded', () => {
  const btnPaid = document.getElementById('btn-paid');
  const paymentStep = document.getElementById('payment-step');
  const successStep = document.getElementById('success-step');
  const btnReturnHome = document.getElementById('btn-return-home');

  if (btnPaid) {
    btnPaid.addEventListener('click', () => {
      if (!pendingFormData) return;
      
      const originalBtnText = btnPaid.innerHTML;
      btnPaid.innerHTML = 'Đang xử lý...';
      btnPaid.disabled = true;

      // Lúc này mới chính thức gửi POST request đến Google Script
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: pendingFormData
      })
      .then(() => {
        paymentStep.style.opacity = '0';
        setTimeout(() => {
          paymentStep.style.display = 'none';
          successStep.style.display = 'block';
          successStep.style.opacity = '0';
          successStep.style.transition = 'opacity 0.5s ease';
          void successStep.offsetWidth;
          successStep.style.opacity = '1';
        }, 400);
      })
      .catch(error => {
        console.error('Lỗi khi gửi form:', error);
        alert('Có lỗi xảy ra khi xác nhận, vui lòng thử lại sau!');
        btnPaid.innerHTML = originalBtnText;
        btnPaid.disabled = false;
      });
    });
  }

  if (btnReturnHome) {
    btnReturnHome.addEventListener('click', () => {
      window.location.reload();
    });
  }
});

// ---- PRE-SELECT COURSE FROM PRICING BUTTONS ----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#register"][data-course]');
  if (!btn) return;
  const courseSelect = document.getElementById('reg-course');
  if (!courseSelect) return;
  courseSelect.value = btn.dataset.course;
  courseSelect.dispatchEvent(new Event('change'));
});

// ---- TOGGLE PAYMENT INSTALLMENT DESCRIPTION ----
document.addEventListener('DOMContentLoaded', () => {
  const courseSelect = document.getElementById('reg-course');
  const paymentSelect = document.getElementById('reg-payment');
  const installmentDesc = document.getElementById('payment-installment-desc');
  const courseNote = document.getElementById('payment-course-note');
  if (!courseSelect || !paymentSelect || !installmentDesc || !courseNote) return;
  const installmentOption = Array.from(paymentSelect.options).find(option => option.value === 'Trả góp');
  const updatePayment = () => {
    const hasDeposit = Boolean(courseSelect.selectedOptions[0]?.dataset.deposit);
    installmentOption.disabled = !hasDeposit;
    if (!hasDeposit && paymentSelect.value === 'Trả góp') paymentSelect.value = '';
    installmentDesc.style.display = hasDeposit && paymentSelect.value === 'Trả góp' ? 'block' : 'none';
    courseNote.style.display = courseSelect.value && !hasDeposit ? 'block' : 'none';
  };
  courseSelect.addEventListener('change', updatePayment);
  paymentSelect.addEventListener('change', updatePayment);
  updatePayment();
});

// ============================================
// BENEFITS VIDEO BACKGROUND (LAZY LOAD)
// ============================================
(function () {
  const videoBg = document.querySelector('.benefits-video-bg');
  if (!videoBg) return;

  videoBg.muted = true;
  videoBg.volume = 0;
  
  let isVideoLoaded = false;

  const tryPlayVideo = () => {
    const p = videoBg.play();
    if (p !== undefined) {
      p.catch(() => {
        const resume = () => {
          videoBg.play().catch(() => {});
          ['click', 'scroll', 'touchstart'].forEach(ev =>
            document.removeEventListener(ev, resume)
          );
        };
        ['click', 'scroll', 'touchstart'].forEach(ev =>
          document.addEventListener(ev, resume, { once: true })
        );
      });
    }
  };

  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isVideoLoaded) {
          // Trigger the video load only when in view
          videoBg.load();
          isVideoLoaded = true;
        }
        tryPlayVideo();
      } else {
        // Pause to save resources when out of view
        videoBg.pause();
      }
    });
  }, { rootMargin: "200px 0px" });

  videoObserver.observe(videoBg);
})();

// ============================================
// BACKGROUND MUSIC LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  let musicStarted = false;

  if (bgMusic && musicToggle) {
    // Attempt to play music automatically
    const tryPlayMusic = () => {
      if (!musicStarted) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            musicStarted = true;
            musicToggle.classList.remove('paused');
          }).catch(err => {
            console.log("Autoplay blocked by browser. Waiting for user interaction...");
            musicToggle.classList.add('paused');
          });
        }
      }
    };

    tryPlayMusic();

    // If blocked, try to play on any user interaction
    const startOnInteraction = () => {
      if (!musicStarted) {
        bgMusic.play().then(() => {
          musicStarted = true;
          musicToggle.classList.remove('paused');
        }).catch(e => console.log(e));
      }
      // Remove listeners after first interaction
      ['click', 'scroll', 'touchstart'].forEach(event => {
        document.removeEventListener(event, startOnInteraction);
      });
    };

    ['click', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, startOnInteraction, { once: true });
    });

    // Toggle button logic
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.remove('paused');
        musicStarted = true;
      } else {
        bgMusic.pause();
        musicToggle.classList.add('paused');
      }
    });

    // Update UI when music ends naturally
    bgMusic.addEventListener('ended', () => {
      musicToggle.classList.add('paused');
    });
  }
});

// ============================================
// ADDITIONAL INTERACTIVE EFFECTS & ANIMATIONS
// ============================================

// 1. SCROLL PROGRESS INDICATOR
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const percentage = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${percentage}%`;
    } else {
      scrollProgress.style.width = '0%';
    }
  }, { passive: true });
}

// 2. AMBIENT FLOATING PARTICLES
const ambientParticlesContainer = document.getElementById('ambient-particles');
if (ambientParticlesContainer) {
  const createAmbientParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';
    const size = Math.random() * 8 + 4; // 4px to 12px
    const left = Math.random() * 100; // 0% to 100%
    const top = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * -15; // random start offset
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const driftX = Math.random() * 60 - 30; // -30px to 30px
    const driftR = Math.random() * 360 - 180; // -180deg to 180deg
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--dur', `${duration}s`);
    particle.style.setProperty('--drift-x', `${driftX}px`);
    particle.style.setProperty('--drift-r', `${driftR}deg`);
    
    ambientParticlesContainer.appendChild(particle);
  };
  
  // Create 20 ambient particles
  for (let i = 0; i < 20; i++) {
    createAmbientParticle();
  }
}

// 3. TWINKLING STARS in Hero Section
const heroSectionForStars = document.querySelector('.hero');
if (heroSectionForStars) {
  const createTwinkleStar = () => {
    const star = document.createElement('div');
    star.className = 'star-twinkle';
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() * 3 + 1; // 1px to 4px
    const delay = Math.random() * -5;
    const duration = Math.random() * 3 + 2; // 2s to 5s
    const colors = ['rgba(255,255,255,0.85)', 'rgba(232,112,164,0.85)', 'rgba(244,188,126,0.8)', 'rgba(155,126,212,0.75)', 'rgba(46,200,216,0.75)', 'rgba(245,174,206,0.7)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--dur', `${duration}s`);
    star.style.setProperty('--color', color);
    
    heroSectionForStars.appendChild(star);
  };
  
  // Create 15 twinkling stars in hero
  for (let i = 0; i < 15; i++) {
    createTwinkleStar();
  }
}

// 4. CURSOR TRAIL MAGIC DOTS
document.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.25) { // throttle frequency
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    
    // Add small offset to center the dot around cursor
    dot.style.left = `${e.clientX - 3}px`;
    dot.style.top = `${e.clientY - 3}px`;
    
    // Randomize size slightly
    const size = Math.random() * 4 + 4; // 4px to 8px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    
    document.body.appendChild(dot);
    
    // Remove after CSS animation ends (0.5s)
    setTimeout(() => {
      dot.remove();
    }, 500);
  }
});

// 5. SCROLL TO TOP BUTTON
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    // Show button when scrolled past half of the page height
    const scrollThreshold = document.documentElement.scrollHeight / 2;
    if (window.scrollY > scrollThreshold) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 6. FALLING CARDS IN COMPARE & PRICING SECTIONS
function createFallingCards() {
  const wrapper = document.getElementById('falling-cards-container');
  if (!wrapper) return;

  const cardImages = ['labai1.jpg', 'labai2.jpg', 'labai3.jpg', 'labai4.jpg', 'labai5.jpg', 'labai6.jpg', 'labai7.jpg'];
  const numCards = 18; // Reduced number to avoid visual clutter

  for (let i = 0; i < numCards; i++) {
    const card = document.createElement('img');
    const randomImg = cardImages[Math.floor(Math.random() * cardImages.length)];
    card.src = `hinh/${randomImg}`;
    card.className = 'falling-card';
    
    // Randomize properties
    const size = Math.random() * 50 + 70; // 70px to 120px (slightly smaller)
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 60 + 50; // 50s to 110s (much slower fall)
    const delay = Math.random() * -110; // Negative delay so they are already falling
    
    // Randomize rotation direction
    const animName = Math.random() > 0.5 ? 'fall-down' : 'fall-down-reverse';
    
    card.style.width = `${size}px`;
    card.style.left = `${left}%`;
    card.style.animationName = animName;
    card.style.animationDuration = `${duration}s`;
    card.style.animationDelay = `${delay}s`;

    wrapper.appendChild(card);
  }
}

createFallingCards();

// ============================================
// SWIPER INIT FOR TESTIMONIALS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.feedback-swiper');
  if (!gallery || typeof Swiper === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  new Swiper(gallery, {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: reduceMotion ? 0 : 520,
    slideToClickedSlide: true,
    keyboard: { enabled: true, onlyInViewport: true },
    coverflowEffect: {
      rotate: 54,
      depth: 84,
      scale: 0.92,
      slideShadows: false,
    },
    a11y: {
      prevSlideMessage: 'Cảm nhận trước',
      nextSlideMessage: 'Cảm nhận tiếp theo',
      paginationBulletMessage: 'Xem cảm nhận {{index}}',
    },
    pagination: {
      el: gallery.querySelector('.swiper-pagination'),
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: gallery.querySelector('.swiper-button-next'),
      prevEl: gallery.querySelector('.swiper-button-prev'),
    },
  });
});

// ============================================
// DYNAMIC FORM LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const courseSelect = document.getElementById('reg-course');
  const modeSelect = document.getElementById('reg-mode');

  if (courseSelect && modeSelect) {
    const updateModeOptions = () => {
      const isBeginner = courseSelect.value === 'beginner';
      
      // Get all offline options and optgroups
      const offlineOptgroup = modeSelect.querySelector('optgroup[label="Offline"]');
      const offlineOptions = modeSelect.querySelectorAll('option[value*="offline"]');
      
      if (isBeginner) {
        // Disable and hide offline options
        if (offlineOptgroup) offlineOptgroup.style.display = 'none';
        offlineOptions.forEach(opt => {
          opt.disabled = true;
          opt.hidden = true;
        });
        
        // If current selection is offline, reset it
        if (modeSelect.value && modeSelect.value.includes('offline')) {
          modeSelect.value = '';
        }
      } else {
        // Enable and show offline options
        if (offlineOptgroup) offlineOptgroup.style.display = '';
        offlineOptions.forEach(opt => {
          opt.disabled = false;
          opt.hidden = false;
        });
      }
    };

    courseSelect.addEventListener('change', updateModeOptions);
    // Run on init in case a value is pre-selected
    updateModeOptions();
  }
});
