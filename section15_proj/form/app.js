const form = document.querySelector('#signup-form');
const creditCardNum = document.querySelector('#cc');
const termsAccept = document.querySelector('#terms');
const veggieSel = document.querySelector('#veggie');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('FORM SUBMITTED');
    console.log('cc', creditCardNum.value);
    console.log('terms', termsAccept.checked);
    console.log('veggie', veggieSel.value);
});