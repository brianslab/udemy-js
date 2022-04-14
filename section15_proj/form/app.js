const form = document.querySelector('#signup-form');

form.addEventListener('submit', (e) => {
    alert('FORM SUBMITTED');
    e.preventDefault();
});