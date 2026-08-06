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
    // Main Course
    { id: 'mc1', name: 'Paneer Butter Masala', price: 240, category: 'main_course', type: 'veg', special: true, desc: 'Rich, creamy tomato gravy cooked with cottage cheese cubes & butter.' },
    { id: 'mc2', name: 'Paneer Do Pyaza', price: 260, category: 'main_course', type: 'veg', desc: 'Paneer cooked with double onions and aromatic ground spices.' },
    { id: 'mc3', name: 'Mushroom Masala', price: 260, category: 'main_course', type: 'veg', desc: 'Fresh mushrooms simmered in rich spiced onion tomato gravy.' },
    { id: 'mc4', name: 'Mushroom Do Pyaza', price: 260, category: 'main_course', type: 'veg', desc: 'Button mushrooms cooked with diced caramelized onions & Indian herbs.' },
    { id: 'mc5', name: 'Matar Paneer', price: 200, category: 'main_course', type: 'veg', desc: 'Classic North Indian curry of tender green peas and soft paneer.' },
    { id: 'mc6', name: 'Kashmiri Aloo Dum', price: 200, category: 'main_course', type: 'veg', desc: 'Baby potatoes slow cooked in rich spiced yoghurt & cashew gravy.' },
    { id: 'mc7', name: 'Shahi Paneer', price: 260, category: 'main_course', type: 'veg', special: true, desc: 'Royal paneer curry prepared in rich cashew nut cream gravy.' },

    // Roti & Paratha
    { id: 'r1', name: 'Tawa Roti', price: 14, category: 'roti', type: 'veg', desc: 'Freshly baked soft whole wheat flatbread on tawa.' },
    { id: 'r2', name: 'Lachha Paratha', price: 25, category: 'roti', type: 'veg', special: true, desc: 'Multi-layered flaky whole wheat bread baked with butter.' },

    // Rice & Biryani
    { id: 'rc1', name: 'Zeera Rice', price: 80, category: 'rice', type: 'veg', desc: 'Aromatic basmati rice tempered with cumin seeds & pure ghee.' },
    { id: 'rc2', name: 'Veg Biryani', price: 150, category: 'rice', type: 'veg', desc: 'Hyderabadi style spiced biryani rice cooked with garden vegetables.' },
    { id: 'rc3', name: 'Paneer Biryani', price: 170, category: 'rice', type: 'veg', special: true, desc: 'Fragrant long-grain basmati biryani topped with spiced paneer tikka.' },
    { id: 'rc4', name: 'Veg Pulao', price: 120, category: 'rice', type: 'veg', desc: 'Mildly seasoned rice cooked with fresh seasonal vegetables.' },
    { id: 'rc5', name: 'Kashmiri Pulao', price: 150, category: 'rice', type: 'veg', desc: 'Sweet & savory basmati rice garnished with raisins and cashews.' },
    { id: 'rc6', name: 'Veg Fried Rice', price: 130, category: 'rice', type: 'veg', desc: 'Wok-tossed rice with finely chopped veggies & Indo-Chinese seasonings.' },
    { id: 'rc7', name: 'Paneer Fried Rice', price: 150, category: 'rice', type: 'veg', desc: 'Wok-tossed fried rice cooked with paneer cubes & green onions.' },
    { id: 'rc8', name: 'Schezwan Fried Rice', price: 130, category: 'rice', type: 'veg', desc: 'Spicy wok-tossed rice infused with spicy homemade Schezwan sauce.' },

    // Starters & Snacks
    { id: 'st1', name: 'Cheese Corn Balls', price: 135, category: 'starters', type: 'veg', desc: 'Golden crispy balls stuffed with gooey melted cheese & sweet corn.' },
    { id: 'st2', name: 'Hot Cheesy Vegetable Logs', price: 145, category: 'starters', type: 'veg', desc: 'Crispy breaded vegetable logs filled with spicy melted cheese.' },
    { id: 'st3', name: 'Herbed Potato Wedges', price: 110, category: 'starters', type: 'veg', desc: 'Crispy fried potato wedges seasoned with herbs & sea salt.' },
    { id: 'st4', name: 'Nachos with Cheese', price: 225, category: 'starters', type: 'veg', special: true, desc: 'Crispy corn tortilla chips served with warm creamy cheese dip.' },
    { id: 'st5', name: 'Kung Pao Potatoes', price: 190, category: 'starters', type: 'veg', desc: 'Crispy potato cubes tossed in spicy & tangy Kung Pao sauce.' },
    { id: 'st6', name: 'Barbeque Paneer Satay', price: 240, category: 'starters', type: 'veg', special: true, desc: 'Grilled paneer skewers coated in smoky barbecue glaze.' },
    { id: 'st7', name: 'Indo Chinese Paneer Chilli', price: 220, category: 'starters', type: 'veg', desc: 'Fried paneer cubes tossed with bell peppers & garlic chili sauce.' },
    { id: 'st8', name: 'Manchurian', price: 200, category: 'starters', type: 'veg', desc: 'Crispy vegetable dumplings tossed in savory garlic soy Manchurian sauce.' },
    { id: 'st9', name: 'Chilli Babycorn', price: 185, category: 'starters', type: 'veg', desc: 'Crunchy babycorn pieces sautéed with green chillies & soy glaze.' },
    { id: 'st10', name: 'Chilli Potato', price: 135, category: 'starters', type: 'veg', desc: 'Crispy potato strips tossed in sweet & spicy honey chili sauce.' },

    // Burgers
    { id: 'bg1', name: 'Veggie Burger', price: 165, category: 'burgers', type: 'veg', desc: 'Juicy vegetable patty with lettuce, tomato & mayo in sesame bun.' },
    { id: 'bg2', name: 'Potato Cheese Blast Burger', price: 195, category: 'burgers', type: 'veg', special: true, desc: 'Crispy potato patty with cheese burst center & spicy sauce.' },
    { id: 'bg3', name: 'Paneer Patty Burger', price: 200, category: 'burgers', type: 'veg', desc: 'Thick grilled paneer patty topped with fresh veggies & herb sauce.' },
    { id: 'bg4', name: 'Double Patty Mega Burger', price: 300, category: 'burgers', type: 'veg', special: true, desc: 'Loaded double veggie patties layered with double cheese slices.' },

    // Pizzas
    { id: 'pz1', name: 'Margherita Pizza', price: 185, category: 'pizzas', type: 'veg', desc: 'Classic pizza with fresh tomato sauce, mozzarella cheese & basil.' },
    { id: 'pz2', name: 'Veggie Lover Pizza', price: 200, category: 'pizzas', type: 'veg', desc: 'Loaded with capsicum, onion, tomatoes, sweet corn & mozzarella.' },
    { id: 'pz3', name: 'Corn Pizza', price: 200, category: 'pizzas', type: 'veg', desc: 'Golden sweet corn kernels baked over melted cheese base.' },
    { id: 'pz4', name: 'Indo Masala Paneer Pizza', price: 225, category: 'pizzas', type: 'veg', special: true, desc: 'Tandoori paneer tikka, red onions, capsicum & Indian spices.' },
    { id: 'pz5', name: 'Mamamia Italian Pizza', price: 195, category: 'pizzas', type: 'veg', desc: 'Authentic Italian herbs, black olives, tomatoes & mozzarella cheese.' },
    { id: 'pz6', name: 'Hawaiian Pizza', price: 220, category: 'pizzas', type: 'veg', desc: 'Tangy pineapple chunks, spicy jalapenos & rich melted cheese.' },

    // Pasta
    { id: 'ps1', name: 'Arabbitta (Red Sauce)', price: 220, category: 'pasta', type: 'veg', desc: 'Penne pasta tossed in spicy garlic tomato sauce & oregano.' },
    { id: 'ps2', name: 'Alfredo (White Sauce)', price: 245, category: 'pasta', type: 'veg', desc: 'Penne pasta cooked in rich, buttery Alfredo cream sauce.' },
    { id: 'ps3', name: 'Tomato Cream (Pink Sauce)', price: 250, category: 'pasta', type: 'veg', special: true, desc: 'Delicious combination of tangy tomato sauce & creamy cheese sauce.' },

    // Momos (Steam & Fry)
    { id: 'ms1', name: 'Vegi Momos (Steam)', price: 150, category: 'momos', type: 'veg', desc: 'Steamed dumplings filled with finely chopped fresh vegetables.' },
    { id: 'ms2', name: 'Schezwan Momos (Steam)', price: 150, category: 'momos', type: 'veg', desc: 'Steamed momos tossed in spicy Schezwan chili garlic sauce.' },
    { id: 'ms3', name: 'Cheese and Corn Momos (Steam)', price: 160, category: 'momos', type: 'veg', desc: 'Steamed momos loaded with sweet corn & melted cheese.' },
    { id: 'ms4', name: 'Paneer Momos (Steam)', price: 160, category: 'momos', type: 'veg', desc: 'Steamed momos packed with seasoned paneer filling.' },
    { id: 'mf1', name: 'Vegi Momos (Fry)', price: 160, category: 'momos', type: 'veg', desc: 'Crispy deep-fried veg momos served with fiery chili dip.' },
    { id: 'mf2', name: 'Schezwan Momos (Fry)', price: 160, category: 'momos', type: 'veg', desc: 'Crispy fried momos coated in hot Schezwan glaze.' },
    { id: 'mf3', name: 'Cheese and Corn Momos (Fry)', price: 180, category: 'momos', type: 'veg', desc: 'Deep-fried golden momos stuffed with corn & cheese.' },
    { id: 'mf4', name: 'Paneer Momos (Fry)', price: 180, category: 'momos', type: 'veg', desc: 'Crunchy deep-fried momos filled with spiced cottage cheese.' },

    // Rolls & Kathi
    { id: 'rl1', name: 'Veg Roll', price: 80, category: 'rolls', type: 'veg', desc: 'Crispy vegetable filling wrapped in soft flatbread with mint sauce.' },
    { id: 'rl2', name: 'Paneer Roll', price: 100, category: 'rolls', type: 'veg', desc: 'Spiced cottage cheese filling wrapped in warm roti.' },
    { id: 'rl3', name: 'Paneer Cheese Roll', price: 130, category: 'rolls', type: 'veg', special: true, desc: 'Melted cheese and paneer cubes rolled in fresh flatbread.' },
    { id: 'rl4', name: 'Veg Kathi Roll', price: 185, category: 'rolls', type: 'veg', desc: 'Kolkata style spiced veg kathi roll with mint chutney & onions.' },
    { id: 'rl5', name: 'Paneer Kathi Roll', price: 280, category: 'rolls', type: 'veg', special: true, desc: 'Richly marinated paneer kathi roll with onions & spices.' },

    // Subway, Hot Dogs & Salads
    { id: 'sb1', name: 'Aloo Subway', price: 150, category: 'subway', type: 'veg', desc: 'Spiced potato patty sub loaded with fresh veggies & sauces.' },
    { id: 'sb2', name: 'Vegi Subway', price: 150, category: 'subway', type: 'veg', desc: 'Fresh crunchy vegetables & cheese dressings in subway bread.' },
    { id: 'sb3', name: 'Paneer Subway', price: 190, category: 'subway', type: 'veg', desc: 'Grilled paneer cubes layered with cheese & subway dressings.' },
    { id: 'hd1', name: 'Saucy Veg Hot Dog', price: 110, category: 'subway', type: 'veg', desc: 'Soft hotdog bun filled with saucy veggie sausage & mustard.' },
    { id: 'hd2', name: 'Paneer Hot Dog', price: 135, category: 'subway', type: 'veg', desc: 'Paneer hotdog stuffed with melted cheese & chili mayo.' },
    { id: 'hd3', name: 'Mushroom Hot Dog', price: 135, category: 'subway', type: 'veg', desc: 'Grilled mushroom hotdog bun with caramelized onions.' },
    { id: 'sl1', name: 'Watermelon Feta Salad', price: 145, category: 'subway', type: 'veg', desc: 'Juicy watermelon cubes, fresh mint & crumbled feta cheese.' },
    { id: 'sl2', name: 'Classic Greek Salad', price: 160, category: 'subway', type: 'veg', desc: 'Cucumbers, tomatoes, olives, bell peppers & olive oil dressing.' },
    { id: 'sl3', name: 'Mediterranean Harvest Salad', price: 160, category: 'subway', type: 'veg', desc: 'Roasted veggies, chickpea, mixed greens & zesty lemon dressing.' },

    // Soups
    { id: 'sp1', name: 'Cream of Tomato', price: 140, category: 'soup', type: 'veg', desc: 'Rich, smooth ripe tomato soup served with crispy croutons.' },
    { id: 'sp2', name: 'Manchow Soup', price: 145, category: 'soup', type: 'veg', desc: 'Spicy Indo-Chinese veg soup topped with crispy fried noodles.' },
    { id: 'sp3', name: 'Sweet Corn Soup', price: 125, category: 'soup', type: 'veg', desc: 'Comforting soup with sweet corn kernels & garden vegetables.' },

    // Hot Beverages
    { id: 'hb1', name: 'Espresso', price: 100, category: 'hot_beverages', type: 'veg', desc: 'Strong, rich, and aromatic shot of pure dark roast coffee.' },
    { id: 'hb2', name: 'Americano', price: 120, category: 'hot_beverages', type: 'veg', desc: 'Espresso shots topped up with hot water for full coffee aroma.' },
    { id: 'hb3', name: 'Cappuccino', price: 120, category: 'hot_beverages', type: 'veg', desc: 'Espresso balanced with steamed milk and thick layer of silky foam.' },
    { id: 'hb4', name: 'Cafe Latte', price: 140, category: 'hot_beverages', type: 'veg', desc: 'Milky coffee featuring rich espresso layered with steamed milk.' },
    { id: 'hb5', name: 'Hot Chocolate', price: 150, category: 'hot_beverages', type: 'veg', special: true, desc: 'Velvety melted chocolate drink topped with fine cocoa powder dust.' },

    // Cold Beverages
    { id: 'cb1', name: 'Cold Coffee', price: 150, category: 'cold_beverages', type: 'veg', special: true, desc: 'Chilled blended milk, espresso, sugar, and cream vanilla scoop.' },
    { id: 'cb2', name: 'Chocolate Shake', price: 150, category: 'cold_beverages', type: 'veg', desc: 'Rich chocolate ice cream milkshake topped with syrup shavings.' },
    { id: 'cb3', name: 'Fresh Lime Soda', price: 90, category: 'cold_beverages', type: 'veg', desc: 'Sparkling soda water mixed with fresh lime juice, sugar, and salt.' },
    { id: 'cb4', name: 'Mojito', price: 140, category: 'cold_beverages', type: 'veg', special: true, desc: 'Refreshing splash of fresh mint leaves, lime wedges, sugar & sparkling club soda.' },

    // Jain Foods
    { id: 'jn1', name: 'Jain Fried Rice', price: 185, category: 'jain_foods', type: 'jain', desc: 'Pure Jain rice cooked without onion or garlic with mild spices.' },
    { id: 'jn2', name: 'Jain Hakka Noodles', price: 185, category: 'jain_foods', type: 'jain', desc: 'Jain style wok-tossed noodles with cabbage, capsicum & soy sauce.' },
    { id: 'jn3', name: 'Jain Cheese Corn Balls', price: 145, category: 'jain_foods', type: 'jain', desc: 'Crispy corn and cheese balls prepared according to Jain norms.' },
    { id: 'jn4', name: 'Jain Alfredo Pasta', price: 255, category: 'jain_foods', type: 'jain', desc: 'Creamy white sauce pasta prepared without onion or garlic.' },
    { id: 'jn5', name: 'Jain Veggie Lover Pizza', price: 210, category: 'jain_foods', type: 'jain', desc: 'Jain pizza topped with capsicum, sweet corn & mozzarella.' },
    { id: 'jn6', name: 'Jain Margherita Pizza', price: 195, category: 'jain_foods', type: 'jain', desc: 'Classic Jain tomato sauce and fresh mozzarella pizza.' },
    { id: 'jn7', name: 'Jain Indo Masala Paneer Pizza', price: 235, category: 'jain_foods', type: 'jain', desc: 'Jain marinated paneer cubes on crispy pizza crust.' },
    { id: 'jn8', name: 'Jain Vegetable Cheese Sandwich', price: 155, category: 'jain_foods', type: 'jain', desc: 'Grilled sandwich with Jain vegetable filling & melted cheese.' },
    { id: 'jn9', name: 'Jain Heavenly Nutella Toast', price: 155, category: 'jain_foods', type: 'jain', desc: 'Toasted bread topped with rich Nutella cocoa hazelnut spread.' },
    { id: 'jn10', name: 'Jain Manchow Soup', price: 160, category: 'jain_foods', type: 'jain', desc: 'Flavorful Jain style soup topped with crunchy fried noodles.' },
    { id: 'jn11', name: 'Jain Saucy Veg Hot Dog', type: 'jain', price: 130, category: 'jain_foods', desc: 'Jain veggie hotdog bun served with mild tomato dip.' },
    { id: 'jn12', name: 'Jain Paneer Hot Dog', price: 155, category: 'jain_foods', type: 'jain', desc: 'Soft hotdog bun filled with fresh Jain paneer & cheese.' }
  ];

  /* State Variables */
  let cart = {}; // Tracks item quantities by id: { q3: 1, b4: 2 }
  let currentCategory = 'main_course';
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

  // PC Category Tabs Arrow Navigation & Mouse Wheel Scrolling
  const tabPrevBtn = document.getElementById('menu-tab-prev');
  const tabNextBtn = document.getElementById('menu-tab-next');
  const tabsContainer = document.getElementById('tabs-scroll-container');

  if (tabPrevBtn && tabsContainer) {
    tabPrevBtn.addEventListener('click', () => {
      tabsContainer.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }

  if (tabNextBtn && tabsContainer) {
    tabNextBtn.addEventListener('click', () => {
      tabsContainer.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  if (tabsContainer) {
    tabsContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        tabsContainer.scrollBy({ left: e.deltaY > 0 ? 180 : -180, behavior: 'smooth' });
      }
    }, { passive: false });
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
    revealElements.forEach(el => {
      el.classList.add('reveal-active');
    });
  }

  /* ==========================================
     FULL 8-PAGE MENU CARD MODAL LIGHTBOX
     ========================================== */
  function initMenuCardModal() {
    const modal = document.getElementById('menu-card-modal');
    const openBtn = document.getElementById('open-menu-modal');
    const closeBtn = document.getElementById('close-menu-modal');
    const prevBtn = document.getElementById('prev-menu-page');
    const nextBtn = document.getElementById('next-menu-page');
    const modalImg = document.getElementById('menu-modal-img');
    const pageIndicator = document.getElementById('menu-modal-page-indicator');
    const modalThumbs = document.querySelectorAll('.modal-thumb');
    const gridThumbs = document.querySelectorAll('.menu-card-thumb');

    if (!modal || !modalImg) return;

    let currentPage = 1;
    const totalPages = 8;

    function updateModalPage(page) {
      currentPage = page;
      modalImg.src = `./assets/images/menu_card_page_${currentPage}.jpg`;
      if (pageIndicator) pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

      modalThumbs.forEach(thumb => {
        const pageNum = parseInt(thumb.getAttribute('data-page'));
        if (pageNum === currentPage) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
    }

    function openModal(page = 1) {
      updateModalPage(page);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', () => openModal(1));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    gridThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const page = parseInt(thumb.getAttribute('data-page')) || 1;
        openModal(page);
      });
    });

    modalThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const page = parseInt(thumb.getAttribute('data-page')) || 1;
        updateModalPage(page);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevPage = currentPage > 1 ? currentPage - 1 : totalPages;
        updateModalPage(prevPage);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
        updateModalPage(nextPage);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') {
        const prevPage = currentPage > 1 ? currentPage - 1 : totalPages;
        updateModalPage(prevPage);
      }
      if (e.key === 'ArrowRight') {
        const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
        updateModalPage(nextPage);
      }
    });
  }

  initMenuCardModal();

  /* Initialize page render */
  renderMenu();
});
