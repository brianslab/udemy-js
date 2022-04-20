function isValidPassword(username, password) {
    return !((password.length < 8) || 
            (password.indexOf(' ') !== -1) || 
            (password.indexOf(username) !== -1));
}

function avg(arr) {
    let total = 0;

    for (let num of arr) {
        total += num;
    }

    return total/arr.length;
}

function isPanagram(sentence) {
    let lowerCased = sentence.toLowerCase();
    for (let char of 'abcdefghijklmnopqrstuvwxyz') {
        if (!lowerCased.includes(char))
            return false;
    }
    return true;
}

function pick(arr) {
    const idx = Math.floor(Math.random()*arr.length);
    return arr[idx];
}

function getCard() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    const suits = ['clubs', 'spades', 'hearts', 'diamonds'];
    
    return {value: pick(values), suit: pick(suits)};
}