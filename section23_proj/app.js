document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide');

    const input = document.querySelector('#message-input');
    const encrypted = btoa(input.value);

    const link = document.querySelector('#link-input');
    link.value = `${window.location}#${encrypted}`;
    link.select();
});
