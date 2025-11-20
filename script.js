// Mobile Menu Toggle
const mobileMenu = () => {
    const menu = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav_menu');
    
    if (menu && navMenu) {
        menu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menu.classList.toggle('is-active');
        });
    }
};

// Tabs Functionality for Impact & Statistics Section
const initTabs = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = btn.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                if (tabPane) {
                    tabPane.classList.add('active');
                }
            });
        });
    }
};

// Animated Counter for Statistics
const initAnimatedCounters = () => {
    const counters = document.querySelectorAll('.card-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace('+', ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    // Intersection Observer to trigger animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
};

// Smooth Scrolling for Navigation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors, not navigation links
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Team Member Card Interactions
const initTeamInteractions = () => {
    const teamCards = document.querySelectorAll('.info-box li');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0)';
        });
        
        // Click to highlight team member
        card.addEventListener('click', () => {
            teamCards.forEach(c => c.style.backgroundColor = '');
            card.style.backgroundColor = 'rgba(106, 27, 154, 0.1)';
            card.style.borderRadius = '5px';
            card.style.padding = '5px';
        });
    });
};

// Video Controls Enhancement
const initVideoControls = () => {
    const video = document.querySelector('video');
    if (!video) return;
    
    // Add custom video controls
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    
    // Add keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.target === video || document.activeElement === video) {
            if (e.key === ' ') {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    });
};

// Info Box Hover Effects
const initInfoBoxEffects = () => {
    const infoBoxes = document.querySelectorAll('.info-box');
    
    infoBoxes.forEach(box => {
        // Add click to expand/collapse functionality
        const header = box.querySelector('h2');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const content = box.querySelector('p, ul');
                if (content) {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });
};

// Scroll Progress Indicator
const initScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6a1b9a, #8e24aa);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    initTabs();
    initAnimatedCounters();
    initSmoothScroll();
    initTeamInteractions();
    initVideoControls();
    initInfoBoxEffects();
    initScrollProgress();
    
    console.log('About page JavaScript initialized successfully');
});



// Gallery Lightbox Functionality
const initLightbox = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);
    
    if (!lightbox || !galleryItems.length) return;
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Update lightbox content
    function updateLightbox() {
        if (!lightboxImg || !lightboxTitle || !lightboxDesc) return;
        
        const currentItem = images[currentImageIndex];
        const imgSrc = currentItem.querySelector('img').src;
        const title = currentItem.querySelector('h3').textContent;
        const description = currentItem.querySelector('p').textContent;
        const altText = currentItem.querySelector('img').alt;
        
        lightboxImg.src = imgSrc;
        lightboxImg.alt = altText;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
    }
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Navigate to previous image
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    // Navigate to next image
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    // Close lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Arrow key navigation
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            }
        }
    });
    
    // Close lightbox when clicking on backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// Search Functionality for Gallery
const initGallerySearch = () => {
    const searchInput = document.getElementById('gallerySearch');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!searchInput || !galleryItems.length) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const altText = item.querySelector('img').alt.toLowerCase();
            
            const shouldShow = title.includes(searchTerm) || 
                             description.includes(searchTerm) || 
                             altText.includes(searchTerm);
            
            item.style.display = shouldShow ? 'block' : 'none';
        });
        
        // Add animation to filtered items
        const visibleItems = document.querySelectorAll('.gallery-item[style="display: block"]');
        visibleItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            galleryItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('fade-in');
            });
        }
    });
};

// Image Loading and Error Handling
const initImageHandling = () => {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        // Add loading state
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.parentElement.classList.add('loaded');
        });
        
        // Handle image errors
        img.addEventListener('error', () => {
            console.warn('Image failed to load:', img.src);
            img.alt = 'Image not available';
            img.parentElement.innerHTML = `
                <div class="image-error">
                    <i class="fas fa-image"></i>
                    <p>Image not available</p>
                </div>
            `;
        });
        
        // Lazy loading for better performance
        img.loading = 'lazy';
    });
};

// Gallery Filter by Category
const initCategoryFilter = () => {
    // Create category filter buttons
    const categories = ['All', 'Awareness', 'Support', 'Education', 'Community', 'Legal'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            ${categories.map(category => 
                `<button class="filter-btn ${category === 'All' ? 'active' : ''}" data-filter="${category.toLowerCase()}">
                    ${category}
                </button>`
            ).join('')}
        </div>
    `;
    
    // Insert filter buttons after search box
    const searchBox = document.querySelector('.gallery-search-box');
    searchBox.parentNode.insertBefore(filterContainer, searchBox.nextSibling);
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                const matchesFilter = filter === 'all' || 
                                   title.includes(filter) || 
                                   description.includes(filter);
                
                item.style.display = matchesFilter ? 'block' : 'none';
                
                if (matchesFilter) {
                    item.classList.add('fade-in');
                }
            });
        });
    });
};

// Smooth Scrolling for Navigation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors, not navigation links
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Download Image Functionality
const initDownloadFeature = () => {
    // Add download button to lightbox
    const lightboxContent = document.querySelector('.lightbox-content');
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'lightbox-download';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBtn.title = 'Download image';
    
    lightboxContent.appendChild(downloadBtn);
    
    downloadBtn.addEventListener('click', () => {
        const lightboxImg = document.getElementById('lightbox-img');
        const imageUrl = lightboxImg.src;
        const imageTitle = document.getElementById('lightbox-title').textContent;
        
        // Create temporary link for download
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `voiceforall-${imageTitle.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'download-confirmation';
        confirmation.textContent = 'Download started!';
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 2000);
    });
};

// Social Sharing Functionality
const initSocialSharing = () => {
    // Add share button to lightbox
    const lightboxContent = document.querySelector('.lightbox-content');
    const shareBtn = document.createElement('button');
    shareBtn.className = 'lightbox-share';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.title = 'Share image';
    
    lightboxContent.appendChild(shareBtn);
    
    shareBtn.addEventListener('click', () => {
        const lightboxImg = document.getElementById('lightbox-img');
        const imageUrl = lightboxImg.src;
        const imageTitle = document.getElementById('lightbox-title').textContent;
        const pageUrl = window.location.href;
        
        // Create share text
        const shareText = `Check out this image from VoiceForAll: ${imageTitle}`;
        
        // Simple alert with share options (in real implementation, use Web Share API)
        if (navigator.share) {
            navigator.share({
                title: imageTitle,
                text: shareText,
                url: pageUrl
            });
        } else {
            alert(`Share this image:\n${shareText}\n\nImage URL: ${imageUrl}`);
        }
    });
};

// Keyboard Navigation for Gallery
const initKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        
        if (!lightbox.classList.contains('active')) {
            // Gallery grid navigation when lightbox is closed
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const visibleItems = Array.from(document.querySelectorAll('.gallery-item[style="display: block"]'));
                const focusedElement = document.activeElement;
                
                if (focusedElement.classList.contains('gallery-item')) {
                    const currentIndex = visibleItems.indexOf(focusedElement);
                    let nextIndex;
                    
                    if (e.key === 'ArrowRight') {
                        nextIndex = (currentIndex + 1) % visibleItems.length;
                    } else {
                        nextIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                    }
                    
                    visibleItems[nextIndex].focus();
                }
            }
        }
    });
    
    // Make gallery items focusable
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.setAttribute('tabindex', '0');
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    initLightbox();
    initGallerySearch();
    initImageHandling();
    initCategoryFilter();
    initSmoothScroll();
    initDownloadFeature();
    initSocialSharing();
    initKeyboardNavigation();
    
    console.log('Gallery page JavaScript initialized successfully');
});

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mobileMenu,
        initLightbox,
        initGallerySearch,
        initImageHandling,
        initCategoryFilter
    };
}

// Form Validation for Enquiry Form
const initEnquiryForm = () => {
    const form = document.getElementById('enquiryForm');
    
    if (!form) return;
    
    // Form elements
    const nameInput = document.getElementById('enquiryName');
    const emailInput = document.getElementById('enquiryEmail');
    const typeSelect = document.getElementById('enquiryType');
    const messageTextarea = document.getElementById('enquiryDetails');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Error messages container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    form.insertBefore(errorContainer, submitBtn);
    
    // Real-time validation
    const inputs = [nameInput, emailInput, typeSelect, messageTextarea];
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
    
    function validateField(field) {
        clearFieldError(field);
        
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Name validation (minimum 2 characters)
        if (field.id === 'enquiryName' && value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters long');
            return false;
        }
        
        // Message validation (minimum 10 characters)
        if (field.id === 'enquiryDetails' && value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    function validateForm() {
        let isValid = true;
        errorContainer.innerHTML = '';
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '5px';
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function handleFormSubmission() {
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                type: typeSelect.value,
                message: messageTextarea.value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Show success message
            showSubmissionSuccess(formData);
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log submission (in real app, this would go to server)
            console.log('Enquiry submitted:', formData);
            
        }, 2000);
    }
    
    function showSubmissionSuccess(data) {
        const successModal = document.createElement('div');
        successModal.className = 'submission-modal';
        successModal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-icon">✅</div>
                <h3>Enquiry Submitted Successfully!</h3>
                <div class="submission-details">
                    <p><strong>Thank you, ${data.name}!</strong></p>
                    <p>We have received your ${data.type} enquiry and will respond to you at ${data.email} within 24 hours.</p>
                    <div class="submission-summary">
                        <p><strong>Enquiry Type:</strong> ${getEnquiryTypeLabel(data.type)}</p>
                        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                </div>
                <button class="modal-confirm-btn">OK</button>
            </div>
        `;
        
        document.body.appendChild(successModal);
        
        // Close modal events
        const closeBtn = successModal.querySelector('.modal-close');
        const confirmBtn = successModal.querySelector('.modal-confirm-btn');
        
        const closeModal = () => {
            successModal.remove();
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', closeModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
        
        document.body.style.overflow = 'hidden';
    }
    
    function getEnquiryTypeLabel(type) {
        const types = {
            'services': 'Services Information',
            'products': 'Products Information', 
            'volunteer': 'Volunteering Opportunity',
            'sponsor': 'Sponsorship Opportunity'
        };
        return types[type] || type;
    }
};

// Interactive Map Features
const initMapFeatures = () => {
    const mapContainer = document.querySelector('.map-container');
    const downloadBtn = document.querySelector('.downloadbtn');
    
    if (!mapContainer || !downloadBtn) return;
    
    // Download directions functionality
    downloadBtn.addEventListener('click', () => {
        const addresses = [
            '54 Unity Street, Johannesburg, South Africa',
            '48 Bach Avenue, Cape Town, South Africa', 
            '209 Florida Street, Durban, South Africa'
        ];
        
        const addressList = addresses.map(addr => `📍 ${addr}`).join('\n');
        const directionsText = `VoiceForAll Locations:\n\n${addressList}\n\nGet directions: https://maps.google.com`;
        
        // Create downloadable text file
        const blob = new Blob([directionsText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'voiceforall-locations.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show download confirmation
        showToast('Locations downloaded successfully!');
    });
    
    // Map interaction enhancements
    const iframe = mapContainer.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('load', () => {
            console.log('Google Maps loaded successfully');
        });
    }
};

// Contact Information Interactions
const initContactInteractions = () => {
    const contactItems = document.querySelectorAll('.info-card p');
    
    contactItems.forEach(item => {
        // Make contact items clickable
        if (item.textContent.includes('@') || item.textContent.includes('.org')) {
            item.style.cursor = 'pointer';
            item.classList.add('clickable-email');
            
            item.addEventListener('click', () => {
                const email = item.textContent.split(':')[1]?.trim();
                if (email) {
                    window.location.href = `mailto:${email}`;
                }
            });
        }
        
        // Make phone numbers clickable
        if (item.textContent.includes('012') || item.textContent.includes('082') || item.textContent.includes('065')) {
            item.style.cursor = 'pointer';
            item.classList.add('clickable-phone');
            
            item.addEventListener('click', () => {
                const phone = item.textContent.split(':')[1]?.trim();
                if (phone) {
                    if (confirm(`Call ${phone}?`)) {
                        window.location.href = `tel:${phone}`;
                    }
                }
            });
        }
        
        // Make social media clickable
        if (item.textContent.includes('Instagram') || item.textContent.includes('Twitter') || 
            item.textContent.includes('Facebook') || item.textContent.includes('TikTok')) {
            item.style.cursor = 'pointer';
            item.classList.add('clickable-social');
            
            item.addEventListener('click', () => {
                const platform = item.textContent.split(':')[0].toLowerCase();
                const handle = item.textContent.split(':')[1]?.trim();
                
                const socialUrls = {
                    'instagram': `https://instagram.com/${handle}`,
                    'twitter': `https://twitter.com/${handle}`,
                    'facebook': `https://facebook.com/${handle}`,
                    'tiktok': `https://tiktok.com/@${handle}`
                };
                
                if (socialUrls[platform]) {
                    window.open(socialUrls[platform], '_blank');
                }
            });
        }
    });
};

// Operating Hours Animation
const initOperatingHours = () => {
    const hoursRows = document.querySelectorAll('.hours-row');
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM format
    
    hoursRows.forEach(row => {
        const dayText = row.querySelector('span:first-child').textContent.toLowerCase();
        const timeRange = row.querySelector('span:last-child').textContent;
        
        // Check if current time is within operating hours
        let isOpen = false;
        
        if (dayText.includes('monday-friday') && currentDay >= 1 && currentDay <= 5) {
            isOpen = checkTimeInRange(currentTime, timeRange);
        } else if (dayText.includes('saturday') && currentDay === 6) {
            isOpen = checkTimeInRange(currentTime, timeRange);
        } else if (dayText.includes('sunday') && currentDay === 0) {
            isOpen = checkTimeInRange(currentTime, timeRange);
        }
        
        if (isOpen) {
            row.classList.add('current-open');
            row.innerHTML += '<span class="open-badge">OPEN NOW</span>';
        } else {
            row.classList.add('current-closed');
        }
    });
    
    function checkTimeInRange(currentTime, timeRange) {
        const [openTime, closeTime] = timeRange.split(' to ');
        const open = convertTimeToNumber(openTime);
        const close = convertTimeToNumber(closeTime);
        
        return currentTime >= open && currentTime <= close;
    }
    
    function convertTimeToNumber(timeStr) {
        const [time, modifier] = timeStr.split(/(am|pm)/);
        let [hours, minutes = 0] = time.split(':').map(Number);
        
        if (modifier === 'pm' && hours !== 12) hours += 12;
        if (modifier === 'am' && hours === 12) hours = 0;
        
        return hours * 100 + minutes;
    }
};

// Toast Notification System
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    initEnquiryForm();
    initMapFeatures();
    initContactInteractions();
    initOperatingHours();
    initSmoothScroll();
    
    console.log('Enquiry page JavaScript initialized successfully');
});





// Emergency Modal Functionality
const initEmergencyModal = () => {
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!emergencyBtn || !emergencyModal) return;
    
    // Open emergency modal
    emergencyBtn.addEventListener('click', () => {
        emergencyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal events
    modalClose.addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emergencyModal.style.display === 'block') {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
};

// Service Search Functionality
const initServiceSearch = () => {
    const searchInput = document.getElementById('serviceSearch');
    const actionCards = document.querySelectorAll('.action_card');
    
    if (!searchInput || !actionCards.length) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        actionCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
            card.style.display = shouldShow ? 'flex' : 'none';
            
            if (shouldShow) {
                card.classList.add('fade-in');
            }
        });
        
        // Show message if no results
        const visibleCards = document.querySelectorAll('.action_card[style="display: flex"]');
        const noResultsMsg = document.getElementById('noResultsMessage');
        
        if (visibleCards.length === 0 && searchTerm) {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'no-results';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>No support options found for "${searchTerm}"</p>
                    <p class="suggestion">Try searching for "counselling", "shelter", or "legal help"</p>
                `;
                document.querySelector('.action_grid').appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            actionCards.forEach(card => {
                card.style.display = 'flex';
                card.classList.add('fade-in');
            });
            const noResultsMsg = document.getElementById('noResultsMessage');
            if (noResultsMsg) noResultsMsg.remove();
        }
    });
};

// Accordion Functionality
const initAccordion = () => {
    const accordionTitles = document.querySelectorAll('.accordion-title');
    
    if (!accordionTitles.length) return;
    
    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            // Close all other accordions
            accordionTitles.forEach(otherTitle => {
                if (otherTitle !== title) {
                    otherTitle.classList.remove('active');
                    otherTitle.nextElementSibling.style.maxHeight = '0';
                    otherTitle.nextElementSibling.style.opacity = '0';
                }
            });
            
            // Toggle current accordion
            title.classList.toggle('active');
            const content = title.nextElementSibling;
            
            if (title.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        });
    });
    
    // Open first accordion by default
    if (accordionTitles.length > 0) {
        accordionTitles[0].click();
    }
};

// Fade-in Animation on Scroll
const initScrollAnimations = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
};

// Emergency Button Pulse Animation
const initEmergencyButton = () => {
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (!emergencyBtn) return;
    
    // Add pulse animation
    setInterval(() => {
        emergencyBtn.classList.add('pulse');
        setTimeout(() => {
            emergencyBtn.classList.remove('pulse');
        }, 1000);
    }, 3000);
    
    // Add click feedback
    emergencyBtn.addEventListener('mousedown', () => {
        emergencyBtn.style.transform = 'scale(0.95)';
    });
    
    emergencyBtn.addEventListener('mouseup', () => {
        emergencyBtn.style.transform = 'scale(1)';
    });
    
    emergencyBtn.addEventListener('mouseleave', () => {
        emergencyBtn.style.transform = 'scale(1)';
    });
};

// Quick Stats Counter
const initStatsCounter = () => {
    // Create stats section if it doesn't exist
    if (!document.querySelector('.stats-section')) {
        const statsSection = document.createElement('section');
        statsSection.className = 'stats-section fade-in';
        statsSection.innerHTML = `
            <h2>Our Impact</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" data-target="2500">0</div>
                    <div class="stat-label">Survivors Helped</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="150">0</div>
                    <div class="stat-label">Safe Shelter Placements</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="45">0</div>
                    <div class="stat-label">Communities Reached</div>
                </div>
            </div>
        `;
        
        // Insert after quick actions section
        const quickActions = document.querySelector('.quick_actions');
        quickActions.parentNode.insertBefore(statsSection, quickActions.nextSibling);
        
        // Animate counters when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
};

// Smooth Scrolling for Navigation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    initEmergencyModal();
    initServiceSearch();
    initAccordion();
    initScrollAnimations();
    initEmergencyButton();
    initStatsCounter();
    initSmoothScroll();
    
    console.log('Home page JavaScript initialized successfully');
});








// Service Cards Interaction
const initServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service_card');
    const serviceButtons = document.querySelectorAll('.card_btn');
    const subjectSelect = document.getElementById('subject');
    
    if (!serviceCards.length) return;
    
    // Service card hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        });
    });
    
    // Service button clicks - auto-fill form
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = button.getAttribute('data-service');
            
            // Scroll to form
            document.querySelector('.form-section').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Auto-select service in dropdown
            if (subjectSelect) {
                const serviceMap = {
                    'counseling': 'counseling',
                    'helpline': 'other',
                    'legal': 'legal',
                    'shelter': 'housing',
                    'medical': 'medical',
                    'training': 'awareness'
                };
                
                if (serviceMap[serviceType]) {
                    subjectSelect.value = serviceMap[serviceType];
                    // Trigger change event for any dependent fields
                    subjectSelect.dispatchEvent(new Event('change'));
                }
            }
            
            // Show confirmation tooltip
            showServiceTooltip(button, `Selected: ${button.textContent}`);
        });
    });
};

// Service Tooltip
const showServiceTooltip = (element, message) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'service-tooltip';
    tooltip.textContent = message;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 2 seconds
    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, 2000);
};

// Enhanced Form Validation
const initServiceForm = () => {
    const form = document.getElementById('enquiryForm');
    const successModal = document.getElementById('successModal');
    const modalClose = successModal?.querySelector('.close');
    
    if (!form) return;
    
    // Form elements
    const formElements = {
        name: document.getElementById('name'),
        middleName: document.getElementById('middleName'),
        surname: document.getElementById('surname'),
        id: document.getElementById('id'),
        gender: document.getElementById('gender'),
        contact: document.getElementById('contact'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // Real-time validation
    Object.keys(formElements).forEach(key => {
        const element = formElements[key];
        if (element) {
            element.addEventListener('blur', () => validateField(element));
            element.addEventListener('input', () => clearFieldError(element));
        }
    });
    
    // Special validation for ID number (South African ID)
    formElements.id?.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        e.target.value = value.slice(0, 13); // Limit to 13 digits
        
        // Auto-format with spaces for readability (optional)
        if (value.length >= 6) {
            const formatted = value.replace(/(\d{6})(\d{4})(\d{3})/, '$1 $2 $3');
            e.target.value = formatted.slice(0, 15); // Account for spaces
        }
    });
    
    // Special validation for contact number
    formElements.contact?.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value.slice(0, 10);
        
        // Auto-format for readability
        if (value.length >= 6) {
            const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            e.target.value = formatted.slice(0, 12);
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
    
    // Modal close events
    if (modalClose && successModal) {
        modalClose.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    
    function validateField(field) {
        clearFieldError(field);
        
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // ID validation (South African ID - 13 digits)
        if (fieldName === 'id' && value) {
            const cleanId = value.replace(/\s/g, '');
            if (cleanId.length !== 13 || !/^\d+$/.test(cleanId)) {
                showFieldError(field, 'Please enter a valid 13-digit ID number');
                return false;
            }
        }
        
        // Contact number validation
        if (fieldName === 'contact' && value) {
            const cleanContact = value.replace(/\s/g, '');
            if (cleanContact.length !== 10 || !/^\d+$/.test(cleanContact)) {
                showFieldError(field, 'Please enter a valid 10-digit phone number');
                return false;
            }
        }
        
        // Name validation (minimum 2 characters)
        if ((fieldName === 'name' || fieldName === 'surname') && value.length < 2) {
            showFieldError(field, 'Must be at least 2 characters long');
            return false;
        }
        
        // Message validation (minimum 10 characters)
        if (fieldName === 'message' && value.length < 10) {
            showFieldError(field, 'Please provide more details (at least 10 characters)');
            return false;
        }
        
        return true;
    }
    
    function validateForm() {
        let isValid = true;
        
        Object.values(formElements).forEach(element => {
            if (element && !validateField(element)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message active';
        errorElement.textContent = message;
        errorElement.style.color = '#ff4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message.active');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function handleFormSubmission() {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.value;
        
        // Show loading state
        submitBtn.value = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success modal
            if (successModal) {
                successModal.style.display = 'block';
            }
            
            // Reset form
            form.reset();
            submitBtn.value = originalText;
            submitBtn.disabled = false;
            
            // Log submission data (in real app, send to server)
            const formData = new FormData(form);
            const submissionData = Object.fromEntries(formData);
            console.log('Service request submitted:', submissionData);
            
        }, 2000);
    }
};

// Service Filter and Search
const initServiceSearch = () => {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search services...';
    searchInput.className = 'service-search';
    
    // Insert search bar after intro text
    const introText = document.querySelector('.intro-text');
    if (introText) {
        introText.parentNode.insertBefore(searchInput, introText.nextSibling);
    }
    
    const serviceCards = document.querySelectorAll('.service_card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const button = card.querySelector('.card_btn').textContent.toLowerCase();
            
            const shouldShow = title.includes(searchTerm) || 
                             description.includes(searchTerm) || 
                             button.includes(searchTerm);
            
            card.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) {
                card.classList.add('fade-in');
            }
        });
        
        // Show no results message
        const visibleCards = document.querySelectorAll('.service_card[style="display: block"]');
        const noResultsMsg = document.getElementById('noServicesMessage');
        
        if (visibleCards.length === 0 && searchTerm) {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.id = 'noServicesMessage';
                message.className = 'no-results-message';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No services found</h3>
                    <p>We couldn't find any services matching "${searchTerm}"</p>
                    <p>Try searching for "counseling", "legal", "shelter", or "medical"</p>
                `;
                document.querySelector('.services_grid').appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
};

// Emergency Contact Quick Access
const initEmergencyAccess = () => {
    // Add emergency button to services page
    const emergencyBtn = document.createElement('button');
    emergencyBtn.className = 'emergency-service-btn';
    emergencyBtn.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        Emergency Help - Call 082 745 8965
    `;
    
    // Insert at the top of main content
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(emergencyBtn, main.firstChild);
    }
    
    emergencyBtn.addEventListener('click', () => {
        if (confirm('Call our 24/7 emergency helpline?')) {
            window.location.href = 'tel:0827458965';
        }
    });
};

// Service Category Filter
const initServiceFilter = () => {
    const categories = ['All', 'Immediate', 'Legal', 'Medical', 'Support', 'Empowerment'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'service-filters';
    
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            ${categories.map(category => 
                `<button class="filter-btn ${category === 'All' ? 'active' : ''}" 
                         data-filter="${category.toLowerCase()}">
                    ${category}
                </button>`
            ).join('')}
        </div>
    `;
    
    // Insert filters after search
    const searchInput = document.querySelector('.service-search');
    if (searchInput) {
        searchInput.parentNode.insertBefore(filterContainer, searchInput.nextSibling);
    }
    
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service_card');
    
    const serviceCategories = {
        'counseling': 'support',
        'helpline': 'immediate', 
        'legal': 'legal',
        'shelter': 'immediate',
        'medical': 'medical',
        'training': 'empowerment'
    };
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            serviceCards.forEach(card => {
                const serviceType = card.querySelector('.card_btn').getAttribute('data-service');
                const category = serviceCategories[serviceType];
                
                const matchesFilter = filter === 'all' || category === filter;
                card.style.display = matchesFilter ? 'block' : 'none';
                
                if (matchesFilter) {
                    card.classList.add('fade-in');
                }
            });
        });
    });
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu();
    initServiceCards();
    initServiceForm();
    initServiceSearch();
    initServiceFilter();
    initEmergencyAccess();
    initSmoothScroll();
    
    console.log('Services page JavaScript initialized successfully');
});