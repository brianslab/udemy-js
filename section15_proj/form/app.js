const form = document.querySelector('#signup-form');
const creditCardNum = document.querySelector('#cc');
const termsAccept = document.querySelector('#terms');
const veggieSel = document.querySelector('#veggie');
const formData = {};

for (let input of [creditCardNum, termsAccept, veggieSel]) {
    input.addEventListener('input', ({target}) => {
        const {name, type, value, checked} = target;
        formData[name] = type === 'checkbox' ? checked : value;
        console.log(formData);
    })
}