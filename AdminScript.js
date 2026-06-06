// --- Admin Console Core Engine ---

let authToken = localStorage.getItem('token') || null;
let currentUser = null;
let menuItems = [];
let orders = [];
let bookings = [];

// DOM References
const DOM = {
    adminName: document.getElementById('admin-name'),
    avatarChar: document.getElementById('avatar-char'),
    adminLogoutBtn: document.getElementById('admin-logout-btn'),
    
    // Tabs & Panels
    tabBtns: document.querySelectorAll('.admin-tab-btn'),
    panels: document.querySelectorAll('.admin-panel'),
    
    // Stats
    statsMenuCount: document.getElementById('stats-menu-count'),
    statsOrdersCount: document.getElementById('stats-orders-count'),
    statsTotalRevenue: document.getElementById('stats-total-revenue'),
    statsBookingsCount: document.getElementById('stats-bookings-count'),
    
    // Tables
    menuTableBody: document.getElementById('menu-table-body'),
    ordersTableBody: document.getElementById('orders-table-body'),
    bookingsTableBody: document.getElementById('bookings-table-body'),
    
    // Modal & Form controls
    addDelicacyBtn: document.getElementById('add-delicacy-btn'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    delicacyModal: document.getElementById('delicacy-modal'),
    delicacyForm: document.getElementById('delicacy-form'),
    modalTitle: document.getElementById('modal-title'),
    formAction: document.getElementById('form-action'),
    itemIdInput: document.getElementById('item-id'),
    itemNameInput: document.getElementById('item-name'),
    itemPriceInput: document.getElementById('item-price'),
    itemCategoryInput: document.getElementById('item-category'),
    itemDescInput: document.getElementById('item-description'),
    
    // File upload elements
    uploadBtn: document.getElementById('upload-btn'),
    uploadBtnText: document.getElementById('upload-btn-text'),
    fileInput: document.getElementById('file-input'),
    imagePreview: document.getElementById('image-preview'),
    imageUrlHidden: document.getElementById('item-image-url')
};

// --- API Utility Handler ---
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
            throw new Error(data.msg || 'API call failed');
        }
        return data;
    } catch (err) {
        console.error(`Admin API error for ${endpoint}:`, err.message);
        throw err;
    }
}

// Bootloader Initialization
document.addEventListener('DOMContentLoaded', () => {
    validateAdminSession();
});

// Validate session and retrieve profile
async function validateAdminSession() {
    if (!authToken) {
        redirectToHome("Please sign in first.");
        return;
    }

    try {
        currentUser = await apiCall('/api/auth/me', 'GET');
        
        if (currentUser.role !== 'admin') {
            redirectToHome("Access denied: Administrative privileges required.");
            return;
        }

        // Draw admin UI profile
        DOM.adminName.textContent = currentUser.username;
        DOM.avatarChar.textContent = currentUser.username.charAt(0);

        setupEventListeners();
        loadConsoleData();
    } catch (err) {
        console.error('Session validation failed:', err.message);
        redirectToHome("Session expired. Please login again.");
    }
}

function redirectToHome(message) {
    alert(message);
    window.location.href = 'index.html';
}

// Load inventory, orders, and bookings data from database APIs
async function loadConsoleData() {
    try {
        // Load menu items
        menuItems = await apiCall('/api/menu', 'GET');
        renderMenuTable();

        // Load orders queue
        orders = await apiCall('/api/admin/orders', 'GET');
        renderOrdersTable();

        // Load bookings list
        bookings = await apiCall('/api/admin/bookings', 'GET');
        renderBookingsTable();

        // Calculate and display statistics counts
        updateDashboardStats();
    } catch (err) {
        showAdminToast(err.message || "Failed to load dashboard data.", "error");
    }
}

// Dashboard statistics totals calculations
function updateDashboardStats() {
    DOM.statsMenuCount.textContent = menuItems.length;
    DOM.statsOrdersCount.textContent = orders.length;
    DOM.statsBookingsCount.textContent = bookings.length;

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    DOM.statsTotalRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

// Setup Admin UI Event Listeners
function setupEventListeners() {
    // Logout trigger
    DOM.adminLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    // Tab switcher panels triggers
    DOM.tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = e.target.getAttribute('data-tab');
            
            DOM.tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            DOM.panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Menu modal open triggers
    DOM.addDelicacyBtn.addEventListener('click', () => openDelicacyModal('create'));
    DOM.closeModalBtn.addEventListener('click', closeDelicacyModal);
    
    // File selector triggers
    DOM.uploadBtn.addEventListener('click', () => DOM.fileInput.click());
    DOM.fileInput.addEventListener('change', handleImageUploadSelection);

    // Form submit handlers
    DOM.delicacyForm.addEventListener('submit', handleDelicacyFormSubmit);
}

// Render Menu items table
function renderMenuTable() {
    DOM.menuTableBody.innerHTML = "";
    
    if (menuItems.length === 0) {
        DOM.menuTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px;">No delicacies exist in menu. Add one above.</td></tr>`;
        return;
    }

    menuItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="table-img"></td>
            <td style="font-weight: 700;">${item.id}</td>
            <td style="font-weight: 600; color: #ffffff;">${item.name}</td>
            <td>${formatCategoryBadge(item.category)}</td>
            <td style="font-weight: 700; color: var(--accent-light);">₹${item.price.toFixed(2)}</td>
            <td><i class="fa-solid fa-star" style="color: var(--accent-ghee); font-size: 0.8rem;"></i> ${item.rating} (${item.reviews})</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-icon-edit" onclick="editMenuItem('${item.id}')" title="Edit Delicacy">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon btn-icon-delete" onclick="deleteMenuItem('${item.id}')" title="Delete Delicacy">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        DOM.menuTableBody.appendChild(tr);
    });
}

// Render Customer Orders table
function renderOrdersTable() {
    DOM.ordersTableBody.innerHTML = "";

    if (orders.length === 0) {
        DOM.ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px;">No kitchen orders found.</td></tr>`;
        return;
    }

    orders.forEach(order => {
        const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });

        // Loop items string
        const itemsListHtml = order.items.map(item => `
            <div class="order-item-pill">
                <span>${item.name}</span>
                <span class="qty-badge">x${item.quantity}</span>
            </div>
        `).join('');

        const email = order.userId ? order.userId.email : 'Guest Customer';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:700; color: var(--accent-light);">${order.tokenId}</td>
            <td>${date}</td>
            <td>${email}</td>
            <td>
                <div class="order-items-list">
                    ${itemsListHtml}
                </div>
            </td>
            <td>₹${order.subtotal.toFixed(2)}</td>
            <td style="font-weight: 700; color: #ffffff;">₹${order.total.toFixed(2)}</td>
            <td><span class="badge-status status-pending">${order.estimatedPrepTime}</span></td>
        `;
        DOM.ordersTableBody.appendChild(tr);
    });
}

// Render Booking Reservations table
function renderBookingsTable() {
    DOM.bookingsTableBody.innerHTML = "";

    if (bookings.length === 0) {
        DOM.bookingsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px;">No reservation bookings logged.</td></tr>`;
        return;
    }

    bookings.forEach(booking => {
        const date = new Date(booking.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });

        let typeClass = 'type-table';
        if (booking.bookingType === 'catering') typeClass = 'type-catering';
        if (booking.bookingType === 'delivery') typeClass = 'type-delivery';
        if (booking.bookingType === 'feedback') typeClass = 'type-feedback';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 700; color:#ffffff;">${booking.name}</td>
            <td>${booking.mobile}</td>
            <td><span class="booking-type-badge ${typeClass}">${booking.bookingType}</span></td>
            <td>${date}</td>
            <td><span style="font-size: 0.85rem; line-height: 1.4; display: block;">${booking.details}</span></td>
        `;
        DOM.bookingsTableBody.appendChild(tr);
    });
}

// Reset and open modal panel
function openDelicacyModal(action, id = '') {
    DOM.delicacyForm.reset();
    DOM.imagePreview.innerHTML = `<i class="fa-regular fa-image"></i>`;
    DOM.imageUrlHidden.value = '';
    DOM.uploadBtnText.textContent = 'Choose File...';

    DOM.formAction.value = action;

    if (action === 'create') {
        DOM.modalTitle.textContent = "Add New Delicacy";
        DOM.itemIdInput.disabled = false;
    } else {
        DOM.modalTitle.textContent = "Edit Delicacy Specs";
        DOM.itemIdInput.disabled = true;
        
        // Populate inputs
        const item = menuItems.find(i => i.id === id);
        if (item) {
            DOM.itemIdInput.value = item.id;
            DOM.itemNameInput.value = item.name;
            DOM.itemPriceInput.value = item.price;
            DOM.itemCategoryInput.value = item.category;
            DOM.itemDescInput.value = item.description;
            DOM.imageUrlHidden.value = item.image;
            DOM.imagePreview.innerHTML = `<img src="${item.image}" alt="Preview">`;
        }
    }

    DOM.delicacyModal.classList.add('active');
}

function closeDelicacyModal() {
    DOM.delicacyModal.classList.remove('active');
}

// Convert chosen image to base64, submit to backend REST API, receive CDN link
function handleImageUploadSelection(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading spinner preview
    DOM.imagePreview.innerHTML = `<div class="spinner"></div>`;
    DOM.uploadBtnText.textContent = "Uploading...";
    DOM.uploadBtn.disabled = true;

    const reader = new FileReader();
    reader.onload = async function (event) {
        const base64Data = event.target.result; // Complete base64 data string (includes headers)

        try {
            const data = await apiCall('/api/admin/upload', 'POST', {
                image: base64Data,
                fileName: `${Date.now()}-${file.name}`
            });

            // Store url, draw preview image
            DOM.imageUrlHidden.value = data.url;
            DOM.imagePreview.innerHTML = `<img src="${data.url}" alt="Uploaded image">`;
            DOM.uploadBtnText.textContent = "Upload Complete!";
            DOM.uploadBtn.disabled = false;
            showAdminToast("Image uploaded successfully to ImageKit CDN!", "info");
        } catch (err) {
            console.error('Image upload failed:', err);
            DOM.imagePreview.innerHTML = `<i class="fa-regular fa-image" style="color: #e74c3c;"></i>`;
            DOM.uploadBtnText.textContent = "Choose File...";
            DOM.uploadBtn.disabled = false;
            showAdminToast(err.message || "File upload failed.", "error");
        }
    };
    reader.readAsDataURL(file);
}

// Create/Update Delicacy API submission
async function handleDelicacyFormSubmit(e) {
    e.preventDefault();

    const action = DOM.formAction.value;
    const id = DOM.itemIdInput.value;
    const name = DOM.itemNameInput.value;
    const price = Number(DOM.itemPriceInput.value);
    const category = DOM.itemCategoryInput.value;
    const description = DOM.itemDescInput.value;
    const image = DOM.imageUrlHidden.value;

    if (!image) {
        showAdminToast("Please upload an item image first.", "error");
        return;
    }

    const payload = {
        id,
        name,
        price,
        category,
        description,
        image
    };

    try {
        if (action === 'create') {
            await apiCall('/api/admin/menu', 'POST', payload);
            showAdminToast(`Successfully created ${name}!`, "success");
        } else {
            await apiCall(`/api/admin/menu/${id}`, 'PUT', payload);
            showAdminToast(`Successfully updated ${name}!`, "success");
        }

        closeDelicacyModal();
        loadConsoleData();
    } catch (err) {
        showAdminToast(err.message || "Failed to save menu changes.", "error");
    }
}

// CRUD Edit callback
window.editMenuItem = function (id) {
    openDelicacyModal('update', id);
};

// CRUD Delete callback
window.deleteMenuItem = async function (id) {
    if (!confirm(`Are you sure you want to delete menu item ID: ${id}?`)) return;

    try {
        await apiCall(`/api/admin/menu/${id}`, 'DELETE');
        showAdminToast("Menu item deleted successfully.", "success");
        loadConsoleData();
    } catch (err) {
        showAdminToast(err.message || "Failed to delete item.", "error");
    }
};

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
