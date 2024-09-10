const hamburger = document.querySelector('.hamburger');
const navLinksMobile = document.querySelector('.nav-links-mobile');

const toggleMobileMenu = () => {
    if (navLinksMobile.style.display === 'block') {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        navLinksMobile.style.display = 'none';
    } else {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        navLinksMobile.style.display = 'block';
    }
}

hamburger.addEventListener('click', toggleMobileMenu);