const assert = require('assert');
const { forEach } = require('../app');

let numbers;
beforeEach(() => {
    numbers = [ 1, 2, 3 ];
});

it('should sum an array', () => {
    let total = 0;
    forEach(numbers, (value) => {
        total += value;
    });

    assert.strictEqual(total, 6);

    // ruin numbers array to test beforeEach
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
});

it('beforeEach is ran each time', () => {
    assert.strictEqual(numbers.length, 4);
});
