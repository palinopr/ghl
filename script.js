// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Sticky Navigation Background
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Set minimum date to today for date inputs
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Quick Booking Form Handler
const quickBookingForm = document.getElementById('quickBookingForm');
quickBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(quickBookingForm);
    const bookingData = Object.fromEntries(formData);
    
    // Redirect to main booking form with pre-filled data
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill main booking form
    if (bookingData['boat-type']) {
        document.getElementById('boat-selection').value = bookingData['boat-type'];
    }
    if (bookingData['date']) {
        document.getElementById('booking-date').value = bookingData['date'];
    }
    if (bookingData['duration']) {
        document.getElementById('booking-duration').value = bookingData['duration'];
    }
    if (bookingData['guests']) {
        document.getElementById('guest-count').value = bookingData['guests'].replace('+', '');
    }
});

// Main Booking Form Multi-Step Handler
let currentStep = 1;
const totalSteps = 3;
const formSteps = document.querySelectorAll('.form-step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

function showStep(step) {
    formSteps.forEach((formStep, index) => {
        if (index === step - 1) {
            formStep.classList.add('active');
        } else {
            formStep.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    
    updateBookingSummary();
}

function validateStep(step) {
    const currentFormStep = formSteps[step - 1];
    const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = '#ff6b35';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
});

// Update Booking Summary
function updateBookingSummary() {
    const summaryDiv = document.getElementById('bookingSummary');
    const boatSelect = document.getElementById('boat-selection');
    const dateInput = document.getElementById('booking-date');
    const durationSelect = document.getElementById('booking-duration');
    const guestInput = document.getElementById('guest-count');
    
    if (boatSelect.value && dateInput.value && durationSelect.value) {
        const boatPrices = {
            'yacht-55': 850,
            'speedboat-38': 450,
            'sailboat-42': 350
        };
        
        const boatNames = {
            'yacht-55': '55\' Luxury Yacht',
            'speedboat-38': '38\' Speed Boat',
            'sailboat-42': '42\' Sailboat'
        };
        
        const price = boatPrices[boatSelect.value] || 0;
        const duration = parseInt(durationSelect.value) || 0;
        const total = price * duration;
        
        summaryDiv.innerHTML = `
            <div class="summary-item">
                <strong>Boat:</strong> ${boatNames[boatSelect.value] || 'Not selected'}
            </div>
            <div class="summary-item">
                <strong>Date:</strong> ${new Date(dateInput.value).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div class="summary-item">
                <strong>Duration:</strong> ${duration} hours
            </div>
            ${guestInput.value ? `<div class="summary-item"><strong>Guests:</strong> ${guestInput.value}</div>` : ''}
            <hr style="margin: 1rem 0;">
            <div class="summary-total">
                <strong>Total:</strong> <span style="font-size: 1.5rem; color: var(--primary-color);">$${total.toLocaleString()}</span>
            </div>
            <small style="color: var(--gray-color);">* Taxes and fees included</small>
        `;
    }
}

// Update summary when form values change
document.getElementById('boat-selection').addEventListener('change', updateBookingSummary);
document.getElementById('booking-date').addEventListener('change', updateBookingSummary);
document.getElementById('booking-duration').addEventListener('change', updateBookingSummary);

// Main Booking Form Submission
const mainBookingForm = document.getElementById('mainBookingForm');
mainBookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    // Get all form data
    const formData = new FormData(mainBookingForm);
    const bookingData = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        // Generate booking reference
        const bookingRef = `LBE-2024-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        document.getElementById('bookingRef').textContent = bookingRef;
        
        // Show success modal
        document.getElementById('bookingModal').style.display = 'block';
        
        // Reset form
        mainBookingForm.reset();
        currentStep = 1;
        showStep(currentStep);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Complete Booking';
        
        // Store booking data (in real app, this would be sent to server)
        console.log('Booking Data:', bookingData);
        console.log('Booking Reference:', bookingRef);
    }, 2000);
});

// Modal Close Handler
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Newsletter Form Handler
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter signup
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    e.target.reset();
});

// Boat Selection from Fleet Cards
document.querySelectorAll('[data-boat]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const boatType = button.getAttribute('data-boat');
        
        // Scroll to booking form
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select the boat
        setTimeout(() => {
            document.getElementById('boat-selection').value = boatType;
            updateBookingSummary();
        }, 500);
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Dynamic pricing based on date (weekends are 20% more)
document.getElementById('booking-date').addEventListener('change', (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay();
    
    // If weekend (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        // You could update prices here or show a weekend surcharge notice
        console.log('Weekend selected - premium rates apply');
    }
});

// Form validation feedback
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        if (field.hasAttribute('required') && !field.value) {
            field.style.borderColor = '#ff6b35';
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
    } else if (value.length >= 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    }
    e.target.value = value;
});

// Initialize first step
showStep(currentStep);