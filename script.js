const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav_menu");

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("is-active");
        navMenu.classList.toggle("active");
    });
}
onst tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".tab-btn.active")?.classList.remove("active");
        document.querySelector(".tab-pane.active")?.classList.remove("active");

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});
const accordions = document.querySelectorAll(".accordion-title");

accordions.forEach(acc => {
    acc.addEventListener("click", () => {
        acc.classList.toggle("active");
        const content = acc.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
onst emergencyBtn = document.getElementById("emergencyBtn");
const emergencyModal = document.getElementById("emergencyModal");
const modalClose = document.querySelector(".modal-close");

if (emergencyBtn && emergencyModal) {
    emergencyBtn.addEventListener("click", () => {
        emergencyModal.style.display = "block";
    });
}
window.addEventListener("click", e => {
    if (e.target === emergencyModal) {
        emergencyModal.style.display = "none";
    }
});

if (modalClose) {
    modalClose.addEventListener("click", () => {
        emergencyModal.style.display = "none";
    });
}
const searchInput = document.getElementById("serviceSearch");
const serviceItems = document.querySelectorAll(".service-card");

if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        const query = searchInput.value.toLowerCase();

        serviceItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? "block" : "none";
        });
    });
}
const newsContainer = document.getElementById("newsContainer");

if (newsContainer) {
    fetch("news.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                newsContainer.innerHTML += `
                    <div class="news-card">
                        <h3>${post.title}</h3>
                        <p>${post.date}</p>
                        <p>${post.summary}</p>
                    </div>
                `;
            });
        });
}
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const id = document.getElementById("id").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.getElementById("gender").value;
    const message = document.getElementById("message").value.trim();

    let errors = [];

    if (name === "") errors.push("First name is required.");
    if (surname === "") errors.push("Surname is required.");
    if (gender === "") errors.push("Please select gender.");

    if (id.length !== 13 || isNaN(id))
        errors.push("Enter a valid 13-digit ID number.");

    if (contact.length < 10 || isNaN(contact))
        errors.push("Enter a valid phone number.");

    if (!email.includes("@"))
        errors.push("Enter a valid email address.");

    if (subject === "")
        errors.push("Please select assistance type.");

    if (message.length < 10)
        errors.push("Message must be at least 10 characters.");

    if (errors.length > 0) {
        alert("Please correct the following:\n\n" + errors.join("\n"));
        return;
    }

let emailBody = `
Name: ${name} ${middleName} ${surname}
ID Number: ${id}
Gender: ${gender}
Contact: ${contact}
Email: ${email}
Assistance Needed: ${subject}

Message:
${message}
`;

    window.location.href = `mailto:info@voiceforall.org?subject=New Enquiry Submission&body=${encodeURIComponent(emailBody)}`;

    alert("Thank you! Your enquiry has been submitted. We will contact you shortly.");
    document.getElementById("enquiryForm").reset();
});
function showPopup(message) {
    let popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => { popup.remove(); }, 500);
    }, 2500);
}
const cards = document.querySelectorAll(".info-card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.02)";
        card.style.transition = "0.3s";
        card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "none";
    });
});
let mapFrame = document.querySelector("iframe");
let zoomLevel = 14;

// Zoom In
function zoomIn() {
    zoomLevel++;
    updateMap();
}

// Zoom Out
function zoomOut() {
    zoomLevel--;
    updateMap();
}

// Reset Position
function resetMap() {
    zoomLevel = 14;
    updateMap();
}

// Update Map SRC
function updateMap() {
    let baseSrc = mapFrame.src.split("&z=")[0];
    mapFrame.src = `${baseSrc}&z=${zoomLevel}`;
}

// Add buttons dynamically
const mapControls = document.createElement("div");
mapControls.className = "map-controls";

mapControls.innerHTML = `
    <button onclick="zoomIn()">➕ Zoom In</button>
    <button onclick="zoomOut()">➖ Zoom Out</button>
    <button onclick="resetMap()">🔄 Reset</button>
`;

document.querySelector(".map-container").appendChild(mapControls);


document.querySelector(".downloadbtn").addEventListener("click", () => {
    window.open("https://www.google.com/maps/dir/?api=1&destination=Cosmo+City,+Roodepoort", "_blank");
});
// ===============================
// GLOBAL VARIABLES
// ===============================
const contactForm = document.getElementById("contactForm");
const enquiryForm = document.getElementById("enquiryForm");

// ===============================
// HELPER FUNCTIONS
// ===============================
function showError(input, message) {
    const errorSpan = document.getElementById(input.id + "Error");
    errorSpan.textContent = message;
    input.classList.add("input-error");
}

function clearError(input) {
    const errorSpan = document.getElementById(input.id + "Error");
    errorSpan.textContent = "";
    input.classList.remove("input-error");
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s+]{10,15}$/;
    return re.test(phone);
}

// ===============================
// FORM VALIDATION
// ===============================
function validateForm(form) {
    let isValid = true;

    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        clearError(input);

        if (!input.value.trim()) {
            showError(input, "This field is required");
            isValid = false;
        } else if (input.type === "email" && !validateEmail(input.value.trim())) {
            showError(input, "Invalid email address");
            isValid = false;
        } else if (input.type === "tel" && !validatePhone(input.value.trim())) {
            showError(input, "Invalid phone number");
            isValid = false;
        }
    });

    return isValid;
}

// ===============================
// FORM PREVIEW
// ===============================
function showPreview(form) {
    const previewDiv = form.querySelector(".email-preview") || document.getElementById("enquiryPreview");
    const previewContent = previewDiv.querySelector("p") || document.getElementById("enquiryPreviewContent");

    let content = "";
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        content += `<strong>${input.previousElementSibling.textContent}</strong> ${input.value}<br>`;
    });

    previewContent.innerHTML = content;
    previewDiv.classList.remove("hidden");

    // Close button
    const closeBtn = previewDiv.querySelector("button") || document.getElementById("closeEnquiryPreview");
    closeBtn.addEventListener("click", () => {
        previewDiv.classList.add("hidden");
    });
}

// ===============================
// FORM SUBMISSION HANDLER
// ===============================
function handleFormSubmission(form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm(form)) {
            showPreview(form);
            form.reset(); // optional: clear form after preview
        }
    });
}

// Gallery search functionality
const searchInput = document.getElementById("gallerySearch");
const galleryItems = document.querySelectorAll(".gallery-item");

if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        const query = searchInput.value.toLowerCase();

        galleryItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? "block" : "none";
        });
    });
}

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
const images = Array.from(galleryItems);

// Open lightbox when image is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    });
});

// Close lightbox
lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto"; // Re-enable scrolling
});

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Navigate to previous image
lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightbox();
});

// Navigate to next image
lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    switch (e.key) {
        case "Escape":
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
            break;
        case "ArrowLeft":
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightbox();
            break;
        case "ArrowRight":
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightbox();
            break;
    }
});

// Update lightbox content
function updateLightbox() {
    const currentItem = images[currentImageIndex];
    const imgSrc = currentItem.querySelector("img").src;
    const title = currentItem.querySelector("h3").textContent;
    const desc = currentItem.querySelector("p").textContent;
    const altText = currentItem.querySelector("img").alt;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
}
