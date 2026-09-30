// Yash Paradkar Single-Page Smooth Scrolling & Interactive Systems
window.openProjectModal = window.openProjectModal || function() {};
window.closeProjectModal = window.closeProjectModal || function() {};
window.copyModalCred = window.copyModalCred || function() {};

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar-wrapper');
  const sections = document.querySelectorAll('.portfolio-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // 1. Navbar Scroll Shrink & Active Section Highlighting
  function updateActiveNavOnScroll() {
    const scrollPos = window.scrollY + 120;

    // Toggle Scrolled Glass Background Class
    if (window.scrollY > 30) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }

    // Determine current active section
    let currentSectionId = 'home';
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    // Update Desktop Nav
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Mobile Drawer Nav
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
  updateActiveNavOnScroll();

  // 2. Smooth Click Scrolling for Nav Links & Drawer Auto-Close
  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove('open');
    }
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
  }

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.add('open');
    }
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
  }

  function handleNavClick(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      closeMobileDrawer();
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  navLinks.forEach(link => link.addEventListener('click', handleNavClick));
  mobileLinks.forEach(link => link.addEventListener('click', handleNavClick));

  // 3. Mobile Toggle Drawer & Overlay Handlers
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileDrawer();
      });
    }

    if (mobileDrawerBackdrop) {
      mobileDrawerBackdrop.addEventListener('click', () => {
        closeMobileDrawer();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileDrawer();
      }
    });
  }

  // 4. Work Section Filter Pills
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterCards = document.querySelectorAll('.work-large-card, .work-medium-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      filterCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Modal Handler
  const projectModalData = {
    'jewel-bot': {
      title: 'Jewel Bot — AI-Powered Jewellery Assistant',
      tag: 'AI / E-Commerce / Full-Stack',
      image: 'portfolio-asset-pack/projects/jewel-bot-project-preview.png',
      liveUrl: 'https://jewel-bota.vercel.app/',
      description: 'Jewel Bot is a specialized conversational AI assistant and visual discovery platform tailored for luxury jewelry retail. It matches user aesthetic preferences with product catalogs in real-time.',
      features: [
        'Natural Language semantic jewelry recommendation engine',
        'Visual interactive catalog with metal, carat & gemstone filters',
        'Integrated product enquiry and admin catalog dashboard',
        'High-performance responsive UI optimized for conversion'
      ],
      credentials: {
        badge: "Owner's Vault — Demo Access",
        note: "Visitors can use these owner credentials to log in on the live site and unlock the protected Owner's Vault & admin controls:",
        email: 'yashparadkar4@gmail.com',
        password: '1234567'
      }
    },
    'bt-templates': {
      title: 'BT Templates — Modern Website Templates & Design Library',
      tag: 'Web Platform / UI/UX / Template Marketplace',
      image: 'portfolio-asset-pack/projects/ChatGPT Image Sep 30, 2026, 03_05_17 PM-2.png',
      liveUrl: 'https://bt-templates.vercel.app/',
      description: 'A curated marketplace and responsive UI library featuring production-ready templates for SaaS dashboards, agency landing pages, and modern digital storefronts.',
      features: [
        'Live interactive template previews with multi-viewport toggles',
        'Categorized library: SaaS dashboards, agency portfolios & e-commerce',
        'Real-time search bar & instant design asset download bundles',
        'Engineered with modern responsive layouts and fluid interactions'
      ]
    },
    'rajwadi': {
      title: 'Rajwadi — Luxury Ethnic Fashion E-Commerce Storefront',
      tag: 'E-Commerce / Traditional Fashion / Luxury Retail',
      image: 'portfolio-asset-pack/projects/ChatGPT Image Sep 30, 2026, 03_05_18 PM-3.png',
      liveUrl: 'https://www.rajwadirajputiposhak.com/',
      description: 'An elegant ethnic wear e-commerce experience celebrating heritage fashion. Features artisanal showcases for Sarees, Lehengas, Men’s Royal Attire, and luxury accessories.',
      features: [
        'Immersive high-resolution fabric lookbooks and zoom inspections',
        'Curated collection filtering for bridal, occasion & festive wear',
        'Seamless bag, wishlist, and bespoke size customizer workflows',
        'Mobile-first responsive storefront optimized for ultra-fast load times'
      ]
    }
  };

  const modal = document.getElementById('projectDetailModal');
  const modalBody = document.getElementById('modalDynamicBody');

  // ponytail: minimal clipboard copy with execCommand fallback for local file:// previews
  function copyModalCred(text, btn) {
    const applySuccess = () => {
      const orig = btn.innerText;
      btn.innerText = 'Copied! ✓';
      btn.style.background = '#C9FB55';
      btn.style.color = '#0c1012';
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.background = 'rgba(201, 251, 85, 0.15)';
        btn.style.color = '#C9FB55';
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(applySuccess).catch(() => {
        fallbackCopy(text, applySuccess);
      });
    } else {
      fallbackCopy(text, applySuccess);
    }
  }

  function fallbackCopy(text, cb) {
    const el = document.createElement('input');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(el);
    cb();
  }

  window.copyModalCred = copyModalCred;

  function openProjectModal(key) {
    const data = projectModalData[key];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-project-img-box">
        <img src="${data.image}" alt="${data.title}" class="modal-project-img">
        ${data.credentials ? `
          <div class="modal-vault-floating-badge">
            <span class="vault-pulse-dot"></span>
            <span class="vault-floating-text">Owner Vault Demo Access</span>
          </div>
        ` : ''}
      </div>
      <div class="modal-project-content">
        <span class="modal-project-tag">${data.tag}</span>
        <h2 class="modal-project-title">${data.title}</h2>
        <p class="modal-project-desc">${data.description}</p>
        
        <div class="modal-capabilities-box">
          <h4 class="modal-section-subtitle">Key Capabilities</h4>
          <ul class="modal-features-list">
            ${data.features.map(f => `<li><span class="lime-check">&#10003;</span> ${f}</li>`).join('')}
          </ul>
        </div>

        ${data.credentials ? `
          <div class="modal-vault-box">
            <div class="modal-vault-header">
              <div class="modal-vault-header-title">
                <span class="vault-key-icon">&#128272;</span>
                <span class="vault-title-text">${data.credentials.badge}</span>
              </div>
              <span class="modal-vault-role-pill">Public Demo Role</span>
            </div>
            <p class="modal-vault-note">${data.credentials.note}</p>
            
            <div class="modal-vault-grid">
              <div class="modal-vault-card">
                <div class="vault-card-info">
                  <div class="vault-card-label">Email (Owner Login)</div>
                  <div class="vault-card-value">${data.credentials.email}</div>
                </div>
                <button type="button" class="btn-copy-cred" onclick="copyModalCred('${data.credentials.email}', this)">Copy</button>
              </div>

              <div class="modal-vault-card">
                <div class="vault-card-info">
                  <div class="vault-card-label">Password</div>
                  <div class="vault-card-value">${data.credentials.password}</div>
                </div>
                <button type="button" class="btn-copy-cred" onclick="copyModalCred('${data.credentials.password}', this)">Copy</button>
              </div>
            </div>
            <div class="modal-vault-hint">
              <span class="hint-bulb">&#128161;</span> Click <strong>Visit Live Website &nearr;</strong> below, go to Login, and use these credentials to access the Owner's Vault.
            </div>
          </div>
        ` : ''}

        <div class="modal-actions-row">
          <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary modal-action-btn">Visit Live Website &nearr;</a>
          <a href="#contact" class="btn-secondary modal-action-btn" onclick="closeProjectModal()">Discuss Similar Project &nearr;</a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openProjectModal = openProjectModal;
  window.closeProjectModal = closeProjectModal;

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
});

// Contact Form Submit Handler
function handleContactSubmit() {
  const successBanner = document.getElementById('contactFormSuccess');
  const form = document.getElementById('portfolioContactForm');
  if (successBanner) {
    successBanner.style.display = 'block';
    if (form) form.reset();
    setTimeout(() => {
      successBanner.style.display = 'none';
    }, 5000);
  }
}

// =============================================================
// SCROLL REVEAL — IntersectionObserver (no library)
// =============================================================
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
