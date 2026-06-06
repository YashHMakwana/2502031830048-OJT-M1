/* Rangilu Kathiyawad - Dynamic Shop Engine */

// --- Exhaustive Kathiyawadi Menu Database ---
let MENU_ITEMS = [];;

// --- State Variables ---
let cart = [];
let activeCategory = "all";
let searchTerm = "";
let sortBy = "default";
let currentUser = null;
let authToken = localStorage.getItem('token') || null;

// --- DOM References ---
const DOM = {
    navbar: document.querySelector('.navbar'),
    menuGrid: document.getElementById('menu-grid'),
    categoryFilters: document.getElementById('category-filters'),
    searchInput: document.getElementById('menu-search'),
    sortSelect: document.getElementById('menu-sort'),

    // Cart Controls
    cartBtn: document.getElementById('cart-btn'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartCountBadge: document.getElementById('cart-count'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    emptyCartMessage: document.getElementById('empty-cart'),
    cartFooter: document.getElementById('cart-footer'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTax: document.getElementById('cart-tax'),
    cartDelivery: document.getElementById('cart-delivery'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    shopNowBtn: document.getElementById('shop-now-btn'),

    // Mobile Nav
    mobileToggle: document.getElementById('mobile-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    footerCategoryLinks: document.querySelectorAll('.cat-footer-link'),

    // Forms
    contactForm: document.getElementById('contact-form'),
    newsletterForm: document.getElementById('newsletter-form'),

    // Modal
    successModal: document.getElementById('success-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    modalOrderId: document.getElementById('modal-order-id'),
    modalDeliveryTime: document.getElementById('modal-delivery-time'),

    // Auth Elements
    authBtn: document.getElementById('auth-btn'),
    closeAuthModalBtn: document.getElementById('close-auth-modal-btn'),
    authModal: document.getElementById('auth-modal'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    userProfileBadge: document.getElementById('user-profile-badge'),
    userDisplayName: document.getElementById('user-display-name'),
    userAvatarChar: document.getElementById('user-avatar-char'),
    logoutBtn: document.getElementById('logout-btn'),
    adminNavLink: document.getElementById('admin-nav-link')
};

// --- Application Bootloader ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulate visual page setup for content shimmer skeletons by fetching menu items
    setTimeout(() => {
        loadMenuItems();
    }, 800);

    // 2. Validate current session and fetch remote cart
    checkAuthSession();

    // 3. Attach Event Handlers
    setupEventListeners();
});

// --- Event Handlers Core ---
function setupEventListeners() {
    // Sticky Scroll
    window.addEventListener('scroll', handleNavbarScroll);

    // Category Tabs Filter
    if (DOM.categoryFilters) {
        DOM.categoryFilters.addEventListener('click', handleCategoryFilter);
    }

    // Live Search input
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase().trim();
            renderMenu();
        });
    }

    // Price Sorter drop down
    if (DOM.sortSelect) {
        DOM.sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            renderMenu();
        });
    }

    // Drawer triggers
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', toggleCart);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', toggleCart);
    if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', toggleCart);
    if (DOM.shopNowBtn) DOM.shopNowBtn.addEventListener('click', toggleCart);

    // Mobile Navigation burger toggles
    if (DOM.mobileToggle) {
        DOM.mobileToggle.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
            const icon = DOM.mobileToggle.querySelector('i');
            if (DOM.navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Nav links and close mobile navigation on click
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (DOM.navMenu.classList.contains('active')) {
                DOM.navMenu.classList.remove('active');
                DOM.mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // Footer categories shortcut bindings
    DOM.footerCategoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            const cat = link.getAttribute('data-cat');
            const pills = DOM.categoryFilters.querySelectorAll('.filter-pill');
            pills.forEach(p => {
                p.classList.remove('active');
                if (p.getAttribute('data-category') === cat) {
                    p.classList.add('active');
                }
            });
            activeCategory = cat;
            renderMenu();
        });
    });

    // Cart adjust quantities & delete buttons
    if (DOM.cartItemsContainer) {
        DOM.cartItemsContainer.addEventListener('click', handleCartItemAction);
    }

    // Place order
    if (DOM.checkoutBtn) {
        DOM.checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Modal dismiss
    if (DOM.closeModalBtn) {
        DOM.closeModalBtn.addEventListener('click', () => {
            DOM.successModal.classList.remove('active');
        });
    }

    // Form handlers
    if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('booking-name').value;
            const mobile = document.getElementById('booking-mobile').value;
            const bookingType = document.getElementById('booking-type').value;
            const details = document.getElementById('booking-details').value;

            try {
                await apiCall('/api/bookings', 'POST', {
                    name,
                    mobile,
                    bookingType,
                    details
                });
                showEthnicToast("Catering inquiry logged! Persisted to database.", "success");
                DOM.contactForm.reset();
            } catch (err) {
                showEthnicToast(err.message || "Failed to submit reservation.", "error");
            }
        });
    }

    if (DOM.newsletterForm) {
        DOM.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showEthnicToast("Welcome to Rasoi Club! Check mail for seasonal discounts.", "success");
            DOM.newsletterForm.reset();
        });
    }

    // Authentication UI Event Handlers
    if (DOM.authBtn) DOM.authBtn.addEventListener('click', toggleAuthModal);
    if (DOM.closeAuthModalBtn) DOM.closeAuthModalBtn.addEventListener('click', toggleAuthModal);
    if (DOM.logoutBtn) DOM.logoutBtn.addEventListener('click', handleLogout);

    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', switchAuthTab);
    });

    if (DOM.loginForm) DOM.loginForm.addEventListener('submit', handleLogin);
    if (DOM.registerForm) DOM.registerForm.addEventListener('submit', handleRegister);
}

// --- Sticky Scroll Triggers ---
function handleNavbarScroll() {
    if (window.scrollY > 40) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }
}

// --- Menu Rendering Core ---
function renderMenu() {
    // 1. Filtering matching active Category Pill and search strings
    let items = MENU_ITEMS.filter(item => {
        const matchesCategory = (activeCategory === "all" || item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    // 2. Sorting matched dataset
    if (sortBy === "price-low") {
        items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        items.sort((a, b) => b.price - a.price);
    }

    // 3. Purge container
    DOM.menuGrid.innerHTML = "";

    // 4. Handle empty records
    if (items.length === 0) {
        DOM.menuGrid.innerHTML = `
            <div class="no-results-msg text-center" style="grid-column: 1 / -1; padding: 4rem 1rem;">
                <i class="fa-solid fa-fire-burner" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem; display: block;"></i>
                <h3 style="margin-bottom: 0.5rem; font-family: var(--font-heading);">Rasoi records are empty</h3>
                <p style="color: var(--text-secondary);">No match found. Try typing a different search word.</p>
            </div>
        `;
        return;
    }

    // 5. Append cards
    items.forEach(item => {
        const stars = generateRatingStars(item.rating);
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.setAttribute('data-id', item.id);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                <span class="card-badge">${formatCategoryBadge(item.category)}</span>
            </div>
            <div class="card-content">
                <div class="card-header-info">
                    <h3 class="card-title">${item.name}</h3>
                    <div class="card-rating">
                        ${stars}
                        <span>(${item.reviews})</span>
                    </div>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">₹${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" aria-label="Add ${item.name} to order" onclick="addToCart('${item.id}')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        DOM.menuGrid.appendChild(card);
    });
}

// --- Category Badge Names Formatter ---
function formatCategoryBadge(category) {
    switch (category) {
        case "breakfast": return "Breakfast";
        case "starters": return "Starter / Farsan";
        case "shaak": return "Main Curry";
        case "rotla": return "Rotla / Flatbread";
        case "rice": return "Rice & Khichdi";
        case "sweets": return "Desi Sweet";
        case "sides": return "Accompaniments";
        default: return "Kathiyawad Special";
    }
}

// --- Star Rating Generator ---
function generateRatingStars(rating) {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star" style="color: var(--text-muted)"></i>';
        }
    }
    return starsHtml;
}

// --- Category Tab Selector Engine ---
function handleCategoryFilter(e) {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;

    const pills = DOM.categoryFilters.querySelectorAll('.filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    activeCategory = pill.getAttribute('data-category');
    renderMenu();
}

// --- Toggle Slide-in Shopping Cart Sidebar Drawer ---
function toggleCart() {
    DOM.cartSidebar.classList.toggle('active');
    DOM.cartOverlay.classList.toggle('active');

    if (DOM.cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// --- API Utility & Authentication Engines ---

// Standard Async API Fetch Caller
async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
        method,
        headers
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Something went wrong');
        }
        return data;
    } catch (err) {
        console.error(`API Call failed for ${endpoint}:`, err.message);
        throw err;
    }
}

// Convert Mongoose Schema DB items to script-compatible cart structures
function mapDBCartToLocal(dbCart) {
    return dbCart.map(dbItem => {
        let product = MENU_ITEMS.find(item => item.id === dbItem.itemId);
        if (!product) {
            product = {
                id: dbItem.itemId,
                name: dbItem.name,
                price: dbItem.price,
                image: dbItem.image,
                description: 'Synced from server'
            };
        }
        return {
            product: product,
            quantity: dbItem.quantity
        };
    });
}

// Auth modal window state triggers
function toggleAuthModal() {
    DOM.authModal.classList.toggle('active');
    if (DOM.authModal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        DOM.loginForm.reset();
        DOM.registerForm.reset();
    }
}

// Switching tab panes inside Authentication Dialog
function switchAuthTab(e) {
    const tab = e.target.closest('.auth-tab');
    if (!tab) return;

    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetTab = tab.getAttribute('data-tab');
    if (targetTab === 'login') {
        DOM.loginForm.style.display = 'block';
        DOM.loginForm.classList.add('active');
        DOM.registerForm.style.display = 'none';
        DOM.registerForm.classList.remove('active');
    } else {
        DOM.loginForm.style.display = 'none';
        DOM.loginForm.classList.remove('active');
        DOM.registerForm.style.display = 'block';
        DOM.registerForm.classList.add('active');
    }
}

// Submit Sign In fields
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const data = await apiCall('/api/auth/login', 'POST', { email, password });
        
        authToken = data.token;
        localStorage.setItem('token', authToken);
        currentUser = data.user;

        // Sync local guest items to user profile
        await syncGuestCartToDB();

        // Retrieve full merged cart from server
        const dbCart = await apiCall('/api/cart', 'GET');
        cart = mapDBCartToLocal(dbCart);
        
        updateAuthUI();
        updateCartUI();
        toggleAuthModal();
        showEthnicToast(`Welcome back, ${currentUser.username}!`, "success");
    } catch (err) {
        showEthnicToast(err.message || 'Login failed. Try again.', "error");
    }
}

// Submit Sign Up fields
async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPass = document.getElementById('register-confirm-password').value;

    if (password !== confirmPass) {
        showEthnicToast("Passwords do not match!", "error");
        return;
    }

    try {
        const data = await apiCall('/api/auth/register', 'POST', { username, email, password });
        
        authToken = data.token;
        localStorage.setItem('token', authToken);
        currentUser = data.user;

        // Sync local guest items to user profile
        await syncGuestCartToDB();

        // Retrieve full cart
        const dbCart = await apiCall('/api/cart', 'GET');
        cart = mapDBCartToLocal(dbCart);

        updateAuthUI();
        updateCartUI();
        toggleAuthModal();
        showEthnicToast(`Account created! Welcome, ${currentUser.username}.`, "success");
    } catch (err) {
        showEthnicToast(err.message || 'Registration failed.', "error");
    }
}

// Log out user
function handleLogout() {
    localStorage.removeItem('token');
    authToken = null;
    currentUser = null;
    cart = [];
    
    updateAuthUI();
    updateCartUI();
    showEthnicToast("Logged out successfully. See you soon!", "info");
}

// Check current user details from JWT token on load
async function checkAuthSession() {
    if (!authToken) return;

    try {
        currentUser = await apiCall('/api/auth/me', 'GET');
        updateAuthUI();
        
        // Sync any items currently in local memory guest cart
        await syncGuestCartToDB();

        // Load complete server cart
        const dbCart = await apiCall('/api/cart', 'GET');
        cart = mapDBCartToLocal(dbCart);
        updateCartUI();
    } catch (err) {
        console.error('Invalid token or network failure:', err.message);
        // Clean stale local info
        localStorage.removeItem('token');
        authToken = null;
        currentUser = null;
        updateAuthUI();
    }
}

// Sync guest cart contents to DB
async function syncGuestCartToDB() {
    if (cart.length > 0 && authToken) {
        for (const item of cart) {
            try {
                await apiCall('/api/cart/add', 'POST', {
                    itemId: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    image: item.product.image,
                    quantity: item.quantity
                });
            } catch (err) {
                console.error(`Failed to sync ${item.product.name} item:`, err);
            }
        }
    }
}

// Refresh Authentication Display
function updateAuthUI() {
    if (currentUser) {
        if (DOM.authBtn) DOM.authBtn.style.display = 'none';
        if (DOM.userProfileBadge) {
            DOM.userProfileBadge.style.display = 'inline-flex';
            DOM.userDisplayName.textContent = currentUser.username;
            DOM.userAvatarChar.textContent = currentUser.username.charAt(0);
        }
        if (DOM.adminNavLink) {
            if (currentUser.role === 'admin') {
                DOM.adminNavLink.style.display = 'inline-block';
            } else {
                DOM.adminNavLink.style.display = 'none';
            }
        }
    } else {
        if (DOM.authBtn) DOM.authBtn.style.display = 'inline-flex';
        if (DOM.userProfileBadge) DOM.userProfileBadge.style.display = 'none';
        if (DOM.adminNavLink) DOM.adminNavLink.style.display = 'none';
    }
}

// Fetch menu items from API dynamically
async function loadMenuItems() {
    try {
        const items = await apiCall('/api/menu', 'GET');
        MENU_ITEMS = items;
        renderMenu();
    } catch (err) {
        console.error("Failed to load delicacies from backend:", err);
        showEthnicToast("Failed to load delicacies. Try reloading.", "error");
    }
}

// --- Cart Actions ---
async function addToCart(id) {
    const product = MENU_ITEMS.find(item => item.id === id);
    if (!product) return;

    if (authToken) {
        try {
            const res = await apiCall('/api/cart/add', 'POST', {
                itemId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            cart = mapDBCartToLocal(res);
            showEthnicToast(`Added ${product.name} to Rasoi order!`, "food");
            updateCartUI();
        } catch (err) {
            showEthnicToast(err.message || 'Error adding to cart', 'error');
        }
    } else {
        const cartItem = cart.find(item => item.product.id === id);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({
                product: product,
                quantity: 1
            });
        }

        showEthnicToast(`Added ${product.name} to Rasoi order!`, "food");
        updateCartUI();
    }
}

function handleCartItemAction(e) {
    const itemRow = e.target.closest('.cart-item');
    if (!itemRow) return;

    const productId = itemRow.getAttribute('data-id');

    if (e.target.closest('.qty-btn-plus')) {
        adjustItemQuantity(productId, 1);
    }
    else if (e.target.closest('.qty-btn-minus')) {
        adjustItemQuantity(productId, -1);
    }
    else if (e.target.closest('.remove-item-btn')) {
        removeFromCart(productId);
    }
}

async function adjustItemQuantity(id, delta) {
    const item = cart.find(item => item.product.id === id);
    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
        await removeFromCart(id);
    } else {
        if (authToken) {
            try {
                const res = await apiCall('/api/cart/update', 'PUT', {
                    itemId: id,
                    quantity: newQty
                });
                cart = mapDBCartToLocal(res);
                updateCartUI();
            } catch (err) {
                showEthnicToast(err.message || 'Error updating quantity', 'error');
            }
        } else {
            item.quantity = newQty;
            updateCartUI();
        }
    }
}

async function removeFromCart(id) {
    const item = cart.find(item => item.product.id === id);
    const itemName = item ? item.product.name : "Item";

    if (authToken) {
        try {
            const res = await apiCall(`/api/cart/remove/${id}`, 'DELETE');
            cart = mapDBCartToLocal(res);
            showEthnicToast(`Removed ${itemName} from order`, "info");
            updateCartUI();
        } catch (err) {
            showEthnicToast(err.message || 'Error removing item', 'error');
        }
    } else {
        cart = cart.filter(item => item.product.id !== id);
        showEthnicToast(`Removed ${itemName} from order`, "info");
        updateCartUI();
    }
}

// --- Update Drawer Content ---
function updateCartUI() {
    const totalCount = cart.reduce((accum, item) => accum + item.quantity, 0);
    DOM.cartCountBadge.textContent = totalCount;

    DOM.cartBtn.classList.add('pulse');
    setTimeout(() => DOM.cartBtn.classList.remove('pulse'), 400);

    const emptyMsg = DOM.emptyCartMessage;
    DOM.cartItemsContainer.innerHTML = "";
    DOM.cartItemsContainer.appendChild(emptyMsg);

    if (cart.length === 0) {
        DOM.emptyCartMessage.style.display = "flex";
        DOM.cartFooter.style.display = "none";
        document.getElementById('cart-items-count').textContent = "(0 items)";
        return;
    }

    DOM.emptyCartMessage.style.display = "none";
    DOM.cartFooter.style.display = "flex";
    document.getElementById('cart-items-count').textContent = `(${totalCount} item${totalCount !== 1 ? 's' : ''})`;

    // Render item rows
    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.setAttribute('data-id', item.product.id);

        itemRow.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">₹${item.product.price.toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn qty-btn-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn qty-btn-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="remove-item-btn" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;

        DOM.cartItemsContainer.appendChild(itemRow);
    });

    // Calculate sums
    const subtotal = cart.reduce((accum, item) => accum + (item.product.price * item.quantity), 0);
    const taxRate = 0.05; // 5% GST on Restaurant orders
    const tax = subtotal * taxRate;
    const delivery = 40.00; // Flat packaging & delivery charge (INR)
    const total = subtotal + tax + delivery;

    DOM.cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    DOM.cartTax.textContent = `₹${tax.toFixed(2)}`;
    DOM.cartDelivery.textContent = `₹${delivery.toFixed(2)}`;
    DOM.cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// --- Order Checkout Engine ---
async function handleCheckout() {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((accum, item) => accum + (item.product.price * item.quantity), 0);
    const taxRate = 0.05; // 5% GST on Restaurant orders
    const tax = subtotal * taxRate;
    const delivery = 40.00; // Flat packaging & delivery charge (INR)
    const total = subtotal + tax + delivery;

    const tokenIdStr = `#KATH-${Math.floor(10000 + Math.random() * 90000)}`;
    const prepTimeMinutes = `${Math.floor(20 + Math.random() * 10)} - ${Math.floor(35 + Math.random() * 10)} minutes`;

    const orderItems = cart.map(item => ({
        itemId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
    }));

    try {
        // Submit order payload to the backend API
        await apiCall('/api/orders', 'POST', {
            items: orderItems,
            subtotal,
            tax,
            delivery,
            total,
            tokenId: tokenIdStr,
            estimatedPrepTime: prepTimeMinutes
        });
    } catch (err) {
        showEthnicToast(err.message || 'Could not place order in kitchen database', 'error');
        return; // Prevent modal popup on database failure
    }

    DOM.modalOrderId.textContent = tokenIdStr;
    DOM.modalDeliveryTime.textContent = prepTimeMinutes;

    toggleCart();

    setTimeout(() => {
        DOM.successModal.classList.add('active');
        cart = [];
        updateCartUI();
    }, 450);
}

// --- Global UI Ethnic Toast Notification Engine ---
function showEthnicToast(message, type = "success") {
    const existing = document.querySelector('.aura-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `aura-toast toast-${type}`;

    let iconClass = "fa-circle-check";
    if (type === "food") iconClass = "fa-fire-burner";
    if (type === "info") iconClass = "fa-circle-info";
    if (type === "error") iconClass = "fa-circle-exclamation";

    toast.innerHTML = `
        <div class="toast-body">
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Dynamically insert CSS rules if missing
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .aura-toast {
                position: fixed;
                bottom: 30px;
                left: 30px;
                z-index: 9999;
                background: rgba(25, 18, 13, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid var(--accent);
                color: #ffffff;
                padding: 14px 24px;
                border-radius: 50px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(211, 84, 0, 0.2);
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .aura-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            .toast-body {
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 600;
                font-size: 0.95rem;
            }
            .toast-icon {
                color: var(--accent-light);
                font-size: 1.2rem;
            }
            .toast-info .toast-icon {
                color: #3498db;
            }
            .toast-error .toast-icon {
                color: #e74c3c;
            }
            @keyframes pulseGlow {
                0% { transform: scale(1); }
                50% { transform: scale(1.06); }
                100% { transform: scale(1); }
            }
            .cart-toggle-btn.pulse {
                animation: pulseGlow 0.4s ease;
            }
            @media (max-width: 480px) {
                .aura-toast {
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border-radius: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}