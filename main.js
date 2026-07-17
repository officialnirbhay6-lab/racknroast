/* ==========================================================================
   RACK N ROAST - INTERACTIVE LOGIC (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. PAGE PRELOADER (Inspiration from ballenacabo.com)
     ========================================== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Trigger split-entrance animation
    setTimeout(() => {
      preloader.classList.add('preloader-active');
    }, 150);

    // Exit function
    let exited = false;
    function exitPreloader() {
      if (exited) return;
      exited = true;
      
      setTimeout(() => {
        preloader.classList.add('preloader-exit');
        document.body.classList.remove('preloader-loading');
        
        // Remove from DOM after slide up completes
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }, 900); // Hold for 0.9 seconds of brand appreciation
    }

    // Exit on load
    window.addEventListener('load', exitPreloader);

    // Failsafe exit after 2.4 seconds
    setTimeout(exitPreloader, 2400);
  }

  /* ==========================================
     1. MENU DATABASE
     ========================================== */
  const MENU_ITEMS = [
    // Quick Bites
    { id: 'q1', name: 'French Fries', price: 120, category: 'quick_bites', type: 'veg', desc: 'Golden, crispy potato fries lightly salted.' },
    { id: 'q2', name: 'Peri Peri Fries', price: 140, category: 'quick_bites', type: 'veg', desc: 'Crispy fries tossed in spicy African Peri-Peri seasoning.' },
    { id: 'q3', name: 'Cheese Fries', price: 180, category: 'quick_bites', type: 'veg', special: true, desc: 'Fries layered with rich melted cheese and cream sauce.' },
    { id: 'q4', name: 'Garlic Bread', price: 150, category: 'quick_bites', type: 'veg', desc: 'Toasted baguette slices brushed with garlic butter and herbs.' },
    { id: 'q5', name: 'Nachos with Cheese Dip', price: 220, category: 'quick_bites', type: 'veg', desc: 'Crispy corn tortilla chips served with warm creamy cheese dip.' },
    { id: 'q6', name: 'Onion Rings', price: 160, category: 'quick_bites', type: 'veg', desc: 'Crumbed and deep-fried sweet onion rings served with dip.' },

    // Burgers & Sandwiches
    { id: 'b1', name: 'Veg Burger', price: 160, category: 'burgers_sandwiches', type: 'veg', desc: 'Juicy vegetable patty, fresh lettuce, tomato, and house mayo.' },
    { id: 'b2', name: 'Cheese Burger', price: 190, category: 'burgers_sandwiches', type: 'veg', special: true, desc: 'Veggie patty layered with double cheddar cheese and pickle relish.' },
    { id: 'b3', name: 'Grilled Veg Sandwich', price: 170, category: 'burgers_sandwiches', type: 'veg', desc: 'Mint chutney, seasonal vegetables, and spices grilled in sandwich bread.' },
    { id: 'b4', name: 'Club Sandwich', price: 240, category: 'burgers_sandwiches', type: 'veg', special: true, desc: 'Triple decker sandwich packed with vegetables, cheese slices, and coleslaw.' },

    // Pizzas
    { id: 'p1', name: 'Margherita Pizza', price: 250, category: 'pizzas', type: 'veg', desc: 'Rich tomato sauce, fresh mozzarella, olive oil, and fresh basil.' },
    { id: 'p2', name: 'Farm Fresh Pizza', price: 320, category: 'pizzas', type: 'veg', desc: 'Loaded with capsicum, onion, tomatoes, sweet corn, and mushrooms.' },
    { id: 'p3', name: 'Paneer Tikka Pizza', price: 350, category: 'pizzas', type: 'veg', special: true, desc: 'Tandoori paneer tikka cubes, red onions, capsicum, and coriander.' },
    { id: 'p4', name: 'Veg Supreme Pizza', price: 390, category: 'pizzas', type: 'veg', desc: 'Assorted premium vegetables, black olives, jalapenos, and extra cheese.' },

    // Pasta
    { id: 'pa1', name: 'White Sauce Pasta', price: 250, category: 'pasta', type: 'veg', desc: 'Penne pasta tossed in rich, buttery, cheesy Alfredo sauce.' },
    { id: 'pa2', name: 'Red Sauce Pasta', price: 240, category: 'pasta', type: 'veg', desc: 'Penne pasta cooked in spicy tomato sauce, garlic, and red chili flakes.' },

    // Wraps & Rolls
    { id: 'w1', name: 'Paneer Tikka Wrap', price: 220, category: 'wraps_rolls', type: 'veg', desc: 'Grilled paneer tikka wrapped with crisp onions and mint mayo.' },
    { id: 'w2', name: 'Veg Wrap', price: 180, category: 'wraps_rolls', type: 'veg', desc: 'Crispy veggie fingers wrapped with salsa and fresh coleslaw.' },

    // Main Snacks
    { id: 's1', name: 'Paneer Chilli', price: 280, category: 'main_snacks', type: 'veg', special: true, desc: 'Paneer cubes tossed with bell peppers, green chilies, and dark soy sauce.' },
    { id: 's2', name: 'Veg Manchurian', price: 240, category: 'main_snacks', type: 'veg', desc: 'Crispy fried veg balls in sweet, tangy, and slightly spicy gravy.' },

    // Desserts
    { id: 'd1', name: 'Brownie with Ice Cream', price: 220, category: 'desserts', type: 'veg', desc: 'Warm sizzling chocolate brownie topped with vanilla ice cream scoop.' },
    { id: 'd2', name: 'Chocolate Lava Cake', price: 180, category: 'desserts', type: 'veg', special: true, desc: 'Molten liquid chocolate core inside a soft chocolate cake casing.' },
    { id: 'd3', name: 'Cheesecake', price: 250, category: 'desserts', type: 'veg', special: true, desc: 'Rich, smooth cream cheese cake base with sweet berry compote drizzle.' },

    // Hot Beverages
    { id: 'h1', name: 'Espresso', price: 80, category: 'hot_beverages', type: 'veg', desc: 'Strong, rich, and aromatic shot of pure dark roast coffee.' },
    { id: 'h2', name: 'Americano', price: 100, category: 'hot_beverages', type: 'veg', desc: 'Espresso shots topped up with hot water for full coffee aroma.' },
    { id: 'h3', name: 'Cappuccino', price: 120, category: 'hot_beverages', type: 'veg', desc: 'Espresso balanced with steamed milk and thick layer of silky foam.' },
    { id: 'h4', name: 'Café Latte', price: 130, category: 'hot_beverages', type: 'veg', desc: 'Milky coffee featuring rich espresso layered with steamed milk.' },
    { id: 'h5', name: 'Mocha', price: 150, category: 'hot_beverages', type: 'veg', desc: 'Espresso combined with dark chocolate sauce, steamed milk, and foam.' },
    { id: 'h6', name: 'Hot Chocolate', price: 150, category: 'hot_beverages', type: 'veg', special: true, desc: 'Velvety melted chocolate drink topped with fine cocoa powder dust.' },
    { id: 'h7', name: 'Masala Tea', price: 60, category: 'hot_beverages', type: 'veg', desc: 'Traditional Indian tea infused with crushed ginger, cardamom, and herbs.' },
    { id: 'h8', name: 'Green Tea', price: 70, category: 'hot_beverages', type: 'veg', desc: 'Healthy antioxidant green tea leaves brewed to perfection.' },

    // Cold Beverages
    { id: 'c1', name: 'Cold Coffee', price: 140, category: 'cold_beverages', type: 'veg', desc: 'Chilled blended milk, espresso, sugar, and cream vanilla scoop.' },
    { id: 'c2', name: 'Iced Latte', price: 150, category: 'cold_beverages', type: 'veg', desc: 'Iced espresso poured over chilled milk with caramel flavor.' },
    { id: 'c3', name: 'Chocolate Shake', price: 180, category: 'cold_beverages', type: 'veg', desc: 'Rich chocolate ice cream milkshake topped with syrup shavings.' },
    { id: 'c4', name: 'Oreo Shake', price: 190, category: 'cold_beverages', type: 'veg', desc: 'Vanilla shake blended with crushed Oreo cookies and whipped cream.' },
    { id: 'c5', name: 'Vanilla Shake', price: 170, category: 'cold_beverages', type: 'veg', desc: 'Classic thick shake blended with pure Madagascar vanilla extract.' },
    { id: 'c6', name: 'Fresh Lime Soda', price: 90, category: 'cold_beverages', type: 'veg', desc: 'Sparkling soda water mixed with fresh lime juice, sugar, and salt.' },
    { id: 'c7', name: 'Mojito (Virgin)', price: 140, category: 'cold_beverages', type: 'veg', special: true, desc: 'Refreshing splash of fresh mint leaves, lime wedges, sugar, and sparkling club soda.' }
  ];

  /* State Variables */
  let cart = {}; // Tracks item quantities by id: { q3: 1, b4: 2 }
  let currentCategory = 'quick_bites';
  let searchQuery = '';

  /* ==========================================
     2. NAVIGATION & DOM TRIGGERS
     ========================================== */
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Shrink Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile Drawer Toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Close Mobile nav when clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Smooth scroll links active state highlighting
  function updateActiveNavLink() {
    let scrollPos = window.scrollY + 120;
    document.querySelectorAll('section').forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================
     3. HERO BACKGROUND SLIDER
     ========================================== */
  const slides = document.querySelectorAll('.hero-bg-slider .slide');
  let currentSlide = 0;
  
  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000); // Transitions slide every 4 seconds (automatically switches to second image)
  }

  /* ==========================================
     4. PLAY ZONE CALCULATOR
     ========================================== */
  const rates = {
    pool: 200,
    ps: 250,
    snooker: 300
  };

  const poolInput = document.getElementById('calc-pool');
  const psInput = document.getElementById('calc-ps');
  const snookerInput = document.getElementById('calc-snooker');
  const calcTotalVal = document.getElementById('calc-total-val');
  const calcButtons = document.querySelectorAll('.qty-selector button');

  // Wire up custom plus/minus quantity selector buttons
  calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-input');
      const input = document.getElementById(inputId);
      if (!input) return;

      let value = parseInt(input.value) || 0;
      if (btn.classList.contains('plus')) {
        value = Math.min(value + 1, 12);
      } else {
        value = Math.max(value - 1, 0);
      }
      input.value = value;
      calculateGamingTotal();
    });
  });

  // Calculate dynamic gaming hours costs
  function calculateGamingTotal() {
    const poolHours = parseInt(poolInput.value) || 0;
    const psHours = parseInt(psInput.value) || 0;
    const snookerHours = parseInt(snookerInput.value) || 0;

    const total = (poolHours * rates.pool) + (psHours * rates.ps) + (snookerHours * rates.snooker);
    calcTotalVal.textContent = total;
  }

  // Listen to manual typing changes
  [poolInput, psInput, snookerInput].forEach(input => {
    if (input) {
      input.addEventListener('change', () => {
        let val = parseInt(input.value);
        if (isNaN(val) || val < 0) input.value = 0;
        if (val > 12) input.value = 12;
        calculateGamingTotal();
      });
    }
  });

  /* ==========================================
     5. DIGITAL MENU RENDERING & FILTERS
     ========================================== */
  const menuGrid = document.getElementById('menu-items-grid');
  const menuSearch = document.getElementById('menu-search-input');
  const clearSearch = document.getElementById('menu-clear-search');
  const menuTabs = document.getElementById('menu-tabs');
  const noResults = document.getElementById('menu-no-results');

  // Render digital menu items
  function renderMenu() {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    // Filter database
    const filteredItems = MENU_ITEMS.filter(item => {
      const matchesCategory = (searchQuery.trim() !== '' || item.category === currentCategory);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
      noResults.style.display = 'block';
      menuGrid.style.display = 'none';
      return;
    }

    noResults.style.display = 'none';
    menuGrid.style.display = 'grid';

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = "menu-card"; // Removed reveal-up so dynamic cards are always visible immediately
      card.setAttribute('data-id', item.id);
      
      const qtyInCart = cart[item.id] || 0;
      
      // Badges
      let badgeHTML = '';
      if (item.special) {
        badgeHTML = `<span class="item-badge badge-special"><i class="fa-solid fa-star"></i> Chef's Choice</span>`;
      } else if (item.type === 'veg') {
        badgeHTML = `<span class="item-badge badge-veg"><i class="fa-solid fa-circle"></i> Veg</span>`;
      } else {
        badgeHTML = `<span class="item-badge badge-nonveg"><i class="fa-solid fa-circle"></i> Non-Veg</span>`;
      }

      // Quantity action controls template
      let controlsHTML = '';
      if (qtyInCart > 0) {
        controlsHTML = `
          <div class="item-qty-selector">
            <button type="button" class="btn-item-qty minus" data-id="${item.id}">-</button>
            <span>${qtyInCart}</span>
            <button type="button" class="btn-item-qty plus" data-id="${item.id}">+</button>
          </div>
        `;
      } else {
        controlsHTML = `
          <button type="button" class="btn-add-item" data-id="${item.id}">Add <i class="fa-solid fa-plus"></i></button>
        `;
      }

      card.innerHTML = `
        <div class="menu-card-header">
          <h4>${item.name} <span class="veg-badge-inline" title="Pure Veg"><span class="veg-dot"></span></span></h4>
          <span class="item-price">₹${item.price}</span>
        </div>
        <div class="menu-card-body">
          <p>${item.desc}</p>
        </div>
        <div class="menu-card-footer">
          ${badgeHTML}
          <div class="item-order-controls">
            ${controlsHTML}
          </div>
        </div>
      `;

      menuGrid.appendChild(card);
    });

    // Wire up listeners inside newly rendered elements
    wireMenuActionListeners();
  }

  // Handle Add, Plus, Minus clicks on menu cards
  function wireMenuActionListeners() {
    const addBtns = document.querySelectorAll('.btn-add-item');
    const qtyBtns = document.querySelectorAll('.btn-item-qty');

    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        cart[id] = 1;
        updateCartState();
        renderMenu();
      });
    });

    qtyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const isPlus = btn.classList.contains('plus');
        
        let qty = cart[id] || 0;
        if (isPlus) {
          qty += 1;
        } else {
          qty = Math.max(0, qty - 1);
        }

        if (qty === 0) {
          delete cart[id];
        } else {
          cart[id] = qty;
        }
        
        updateCartState();
        renderMenu();
      });
    });
  }

  // Category Tab Switches
  if (menuTabs) {
    menuTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.getAttribute('data-category');
      renderMenu();
    });
  }

  // Search Input Handler
  if (menuSearch) {
    menuSearch.addEventListener('input', () => {
      searchQuery = menuSearch.value.trim();
      if (searchQuery.length > 0) {
        clearSearch.style.display = 'block';
      } else {
        clearSearch.style.display = 'none';
      }
      renderMenu();
    });
  }

  // Clear Search button
  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      menuSearch.value = '';
      searchQuery = '';
      clearSearch.style.display = 'none';
      renderMenu();
    });
  }

  /* ==========================================
     6. FLOATING CART MANAGEMENT
     ========================================== */
  const floatingCart = document.getElementById('floating-cart');
  const cartItemCount = document.getElementById('cart-item-count');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const clearCartBtn = document.getElementById('btn-clear-cart');

  // Update floating checkout bar
  function updateCartState() {
    let itemCount = 0;
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
      const qty = cart[id];
      const menuItem = MENU_ITEMS.find(item => item.id === id);
      if (menuItem) {
        itemCount += qty;
        subtotal += (menuItem.price * qty);
      }
    });

    if (itemCount > 0) {
      cartItemCount.textContent = itemCount;
      cartSubtotalVal.textContent = subtotal;
      floatingCart.classList.add('active');
    } else {
      floatingCart.classList.remove('active');
    }
  }

  // Clear entire cart
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = {};
      updateCartState();
      renderMenu();
    });
  }

  /* ==========================================
     7. FORM SUBMISSION INQUIRY SIMULATION
     ========================================== */
  const bookingCenter = document.getElementById('booking-center');
  const reservationForm = document.getElementById('reservation-form');
  const successAlert = document.getElementById('form-success-alert');

  if (reservationForm && bookingCenter) {
    // Set tomorrow's date as default in form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    // 1. Tab Switching Logic
    const tabs = bookingCenter.querySelectorAll('.booking-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const activeTab = tab.getAttribute('data-tab');
        bookingCenter.setAttribute('data-active-tab', activeTab);
      });
    });

    // 2. Select Package click logic from Celebrations section
    const selectPackageBtns = document.querySelectorAll('.btn-select-package');
    selectPackageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = btn.getAttribute('data-package');
        // Switch tab to birthday
        const birthdayTab = bookingCenter.querySelector('.booking-tab[data-tab="birthday"]');
        if (birthdayTab) birthdayTab.click();
        
        // Select corresponding dropdown option
        const packageSelect = document.getElementById('form-package');
        if (packageSelect) {
          packageSelect.value = pkg;
        }

        // Scroll to form card
        bookingCenter.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // 3. Select Gaming triggers from calculator / combos
    const bookGamingBtn = document.querySelector('.btn-book-gaming');
    if (bookGamingBtn) {
      bookGamingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const gamingTab = bookingCenter.querySelector('.booking-tab[data-tab="gaming"]');
        if (gamingTab) gamingTab.click();
        bookingCenter.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const bookGamingComboBtn = document.querySelector('.btn-book-gaming-combo');
    if (bookGamingComboBtn) {
      bookGamingComboBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const gamingTab = bookingCenter.querySelector('.booking-tab[data-tab="gaming"]');
        if (gamingTab) gamingTab.click();
        
        const gameSelect = document.getElementById('form-game');
        if (gameSelect) gameSelect.value = 'combo-unlimited';
        
        bookingCenter.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const bookVipComboBtn = document.querySelector('.btn-book-vip-combo');
    if (bookVipComboBtn) {
      bookVipComboBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const gamingTab = bookingCenter.querySelector('.booking-tab[data-tab="gaming"]');
        if (gamingTab) gamingTab.click();
        
        const gameSelect = document.getElementById('form-game');
        if (gameSelect) gameSelect.value = 'combo-unlimited';
        
        bookingCenter.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // 4. Form Submit Handler
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const date = document.getElementById('form-date').value;
      const time = document.getElementById('form-time').value;
      const notes = document.getElementById('form-message').value;
      const activeTab = bookingCenter.getAttribute('data-active-tab');

      // Compile booking details message
      let message = 'Hello Rack n Roast! 🎮🍽️\n';
      
      if (activeTab === 'gaming') {
        const gameSelect = document.getElementById('form-game');
        const gameText = gameSelect.options[gameSelect.selectedIndex].text;
        const durationSelect = document.getElementById('form-game-hours');
        const durationText = durationSelect.options[durationSelect.selectedIndex].text;
        const players = document.getElementById('form-gaming-guests').value;

        message += 'I would like to book a Gaming Arena Slot:\n\n';
        message += `• Name: ${name}\n`;
        message += `• Phone: ${phone}\n`;
        message += `• Date: ${date}\n`;
        message += `• Time: ${time}\n`;
        message += `• Arena Game: ${gameText}\n`;
        message += `• Slot Duration: ${durationText}\n`;
        message += `• Number of Players: ${players}\n`;
      } 
      else if (activeTab === 'dining') {
        const guests = document.getElementById('form-dining-guests').value;
        const seatingSelect = document.getElementById('form-seating');
        const seatingText = seatingSelect.options[seatingSelect.selectedIndex].text;

        message += 'I would like to book a Rooftop Dining Table:\n\n';
        message += `• Name: ${name}\n`;
        message += `• Phone: ${phone}\n`;
        message += `• Date: ${date}\n`;
        message += `• Time: ${time}\n`;
        message += `• Number of Guests: ${guests} People\n`;
        message += `• Seating Preference: ${seatingText}\n`;
      } 
      else if (activeTab === 'birthday') {
        const packageSelect = document.getElementById('form-package');
        const packageText = packageSelect.options[packageSelect.selectedIndex].text;
        const guests = document.getElementById('form-birthday-guests').value;
        
        // Gather selected add-ons
        let selectedAddons = [];
        if (document.getElementById('addon-reel').checked) selectedAddons.push('Professional Reels (₹1,000)');
        if (document.getElementById('addon-decor').checked) selectedAddons.push('Premium Theme Decoration (₹2,000)');
        if (document.getElementById('addon-cake').checked) selectedAddons.push('Cake Arrangement (₹1,000)');
        if (document.getElementById('addon-photo').checked) selectedAddons.push('Photography Coverage');
        
        const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None Selected';

        message += 'I would like to book a Birthday / Anniversary Package:\n\n';
        message += `• Name: ${name}\n`;
        message += `• Phone: ${phone}\n`;
        message += `• Date: ${date}\n`;
        message += `• Time: ${time}\n`;
        message += `• Selected Package: ${packageText}\n`;
        message += `• Number of Guests: ${guests} People\n`;
        message += `• Selected Add-Ons: ${addonsText}\n`;
      }

      if (notes.trim()) {
        message += `• Special Instructions: ${notes}\n`;
      }

      // Add pre-ordered food items if present
      if (Object.keys(cart).length > 0) {
        message += '\n[Pre-ordered Food Items]:\n';
        Object.keys(cart).forEach(id => {
          const qty = cart[id];
          const menuItem = MENU_ITEMS.find(item => item.id === id);
          if (menuItem) {
            message += `  - ${qty}x ${menuItem.name}\n`;
          }
        });
        message += `  Estimated Subtotal: ₹${cartSubtotalVal.textContent}\n`;
      }

      message += '\nPlease confirm my booking request. Thank you!';

      // Encode and open WhatsApp URL
      const whatsappUrl = `https://wa.me/919801984585?text=${encodeURIComponent(message)}`;

      // Construct pretty UI confirmation
      successAlert.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <p><strong><i class="fa-solid fa-circle-check"></i> Redirecting to WhatsApp...</strong></p>
          <p>Hi ${name}, we are opening WhatsApp to send your booking details directly to Rack n Roast!</p>
          <p>If the window doesn't open automatically, please <a href="${whatsappUrl}" target="_blank" style="color: var(--color-primary); text-decoration: underline;">click here</a>.</p>
        </div>
      `;
      successAlert.style.display = 'flex';
      reservationForm.style.display = 'none';

      // Open WhatsApp chat
      window.open(whatsappUrl, '_blank');

      // Auto restore form after 15 seconds
      setTimeout(() => {
        reservationForm.reset();
        reservationForm.style.display = 'block';
        successAlert.style.display = 'none';
        
        // Reset active tab to gaming
        const gamingTab = bookingCenter.querySelector('.booking-tab[data-tab="gaming"]');
        if (gamingTab) gamingTab.click();
        
        // Clear cart
        cart = {};
        updateCartState();
        renderMenu();
      }, 15000);
    });
  }

  // Handle WhatsApp Food Ordering from Floating Cart
  const cartWhatsappBtn = document.getElementById('btn-cart-whatsapp');
  if (cartWhatsappBtn) {
    cartWhatsappBtn.addEventListener('click', () => {
      if (Object.keys(cart).length === 0) return;

      // Compile food items in cart
      let message = 'Hello Rack n Roast! 🎮🍔\nI would like to place a food order:\n\n';
      let totalItems = 0;
      
      Object.keys(cart).forEach(id => {
        const qty = cart[id];
        const menuItem = MENU_ITEMS.find(item => item.id === id);
        if (menuItem) {
          message += `• ${qty}x ${menuItem.name} (₹${menuItem.price} each)\n`;
          totalItems += qty;
        }
      });
      
      message += `\nTotal Items: ${totalItems}\n`;
      message += `Estimated Subtotal: ₹${cartSubtotalVal.textContent}\n\n`;
      message += 'Please confirm my order and let me know the preparation time. Thank you!';

      // Encode and open WhatsApp URL
      const whatsappUrl = `https://wa.me/919801984585?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  /* ==========================================
     8. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-hidden');
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      threshold: 0.01, // Trigger as soon as 1% of the element is in view
      rootMargin: '0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-hidden'); // Only hide if IntersectionObserver is active
      revealObserver.observe(el);
    });
  } else {
    // Fallback: if observer not supported, show immediately
    revealElements.forEach(el => {
      el.classList.add('reveal-active');
    });
  }

  /* Initialize page render */
  renderMenu();
});
