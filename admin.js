// Get DOM elements
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.admin-section');
const addProductBtn = document.querySelector('.add-product-btn');
const productForm = document.querySelector('.product-form');
const productSubmitBtn = document.querySelector('.submit-btn');
const productCancelBtn = document.querySelector('.cancel-btn');
const logoutBtn = document.querySelector('.logout-btn');

// Menu navigation
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items and sections
        menuItems.forEach(i => i.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked menu item and corresponding section
        item.classList.add('active');
        const targetSection = document.getElementById(item.dataset.section);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Product form handling
if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
        productForm.style.display = 'block';
        addProductBtn.style.display = 'none';
    });
}

if (productCancelBtn) {
    productCancelBtn.addEventListener('click', () => {
        productForm.style.display = 'none';
        addProductBtn.style.display = 'block';
        productForm.reset();
    });
}

if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(productForm);
        const productData = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your backend
        console.log('Product data:', productData);
        
        // Reset form and show success message
        productForm.reset();
        productForm.style.display = 'none';
        addProductBtn.style.display = 'block';
        
        alert('Product added successfully!');
    });
}

// Table actions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('action-btn')) {
        const action = e.target.dataset.action;
        const itemId = e.target.closest('tr').dataset.id;
        
        if (action === 'edit') {
            // Handle edit action
            console.log('Edit item:', itemId);
        } else if (action === 'delete') {
            // Handle delete action
            if (confirm('Are you sure you want to delete this item?')) {
                console.log('Delete item:', itemId);
                // Here you would typically send a delete request to your backend
                e.target.closest('tr').remove();
            }
        }
    }
});

// Settings form handling
const settingsForm = document.querySelector('.settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(settingsForm);
        const settingsData = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your backend
        console.log('Settings data:', settingsData);
        
        alert('Settings saved successfully!');
    });
}

// Logout confirmation
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Here you would typically handle the logout process
            window.location.href = 'login.html';
        }
    });
}

// Stats animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            element.textContent = end;
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statValues = document.querySelectorAll('.stat-info p');
let animated = false;

function checkStatsVisibility() {
    if (!animated && statValues.length > 0) {
        const statsSection = document.querySelector('.stats-grid');
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            statValues.forEach(stat => {
                const endValue = parseInt(stat.dataset.value || stat.textContent);
                animateValue(stat, 0, endValue, 1000);
            });
            animated = true;
        }
    }
}

window.addEventListener('scroll', checkStatsVisibility);
checkStatsVisibility(); // Check on page load 