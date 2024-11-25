// Function to load the header
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            setupMenuToggle(); // Call the menu toggle setup after loading header
        });
}

// Function to load the footer
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
}

// Menu toggle function for small screens
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteMenu = document.querySelector('.site-menu');

    menuToggle.addEventListener('click', function() {
        siteMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    window.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !siteMenu.contains(event.target)) {
            siteMenu.classList.remove('active');
        }
    });
}

// Call the functions on page load
window.onload = function() {
    loadHeader();
    loadFooter();
};
