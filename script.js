const navbar = document.querySelector('.navbar');
const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const bookBtn = document.getElementById('bookBtn');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

function openModal(event) {
    event.preventDefault();
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
}

function closeModalOverlay() {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
}

if (bookBtn) {
    bookBtn.addEventListener('click', openModal);
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalOverlay);
}

if (bookingModal) {
    bookingModal.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            closeModalOverlay();
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && bookingModal.classList.contains('open')) {
        closeModalOverlay();
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you! Your booking request has been sent. We will contact you soon.');
        bookingForm.reset();
        closeModalOverlay();
    });
}

const variantSearch = document.getElementById('variantSearch');
const variantList = document.getElementById('variantList');
const variantListWrapper = document.getElementById('variantListWrapper');

function closeVariantList() {
    if (variantListWrapper) {
        variantListWrapper.classList.add('closed');
    }
}

function openVariantList() {
    if (variantListWrapper) {
        variantListWrapper.classList.remove('closed');
    }
}

function selectVariant(item) {
    if (variantSearch) {
        variantSearch.value = item.textContent.trim();
    }
    variantList.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
    item.classList.add('selected');
    closeVariantList();
}

if (variantSearch && variantList) {
    variantSearch.addEventListener('input', () => {
        const query = variantSearch.value.trim().toLowerCase();
        variantList.querySelectorAll('li').forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'list-item' : 'none';
        });
        if (variantListWrapper) {
            variantListWrapper.classList.remove('closed');
        }
    });

    variantSearch.addEventListener('focus', () => {
        openVariantList();
    });

    variantList.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => selectVariant(item));
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const fbReelBtn = document.getElementById('fbReelBtn');
const videoModal = document.getElementById('videoModal');
const closeVideoModalBtn = document.getElementById('closeVideoModal');
const zeuReelVideo = document.getElementById('zeuReelVideo');

function openVideoModal(event) {
    event.preventDefault();
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    if (zeuReelVideo) {
        zeuReelVideo.currentTime = 0;
        zeuReelVideo.play().catch(() => {});
    }
}

function closeVideoModalOverlay() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    if (zeuReelVideo) zeuReelVideo.pause();
}

if (fbReelBtn && videoModal) {
    fbReelBtn.addEventListener('click', openVideoModal);
}
if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModalOverlay);
}
if (videoModal) {
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) closeVideoModalOverlay();
    });
}
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
        closeVideoModalOverlay();
    }
});

const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        closeVideoModalOverlay();
    });
}