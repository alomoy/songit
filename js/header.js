// JavaScript to toggle the menu visibility on small screens
document.getElementById('hamburgerMenu').addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
});