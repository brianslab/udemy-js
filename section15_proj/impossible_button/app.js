const btn = document.querySelector('button');

btn.addEventListener('mouseover', () => {
    btn.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    btn.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
});

btn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'green';
    btn.innerText = 'YOU GOT ME!';    
})