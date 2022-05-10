const assert = require('assert');
const { forEach, map } = require('./app');

const test = (desc, fn) => {
    console.log('***===*** TESTING:', desc, '***===***');
    try {
        fn();
    } catch (err) {
        console.log(err.message);
    }
};

test('forEach', () => {
    let sum = 0;
    forEach([ 1, 2, 3 ], (value) => {
        sum += value;
    });

    assert.strictEqual(sum, 6, 'sample custom message');
});

test('map', () => {
    const result = map([ 1, 2, 3 ], (value) => {
        return value * 2;
    });

    assert.strictEqual(result[0], 2);
    assert.strictEqual(result[1], 4);
    assert.strictEqual(result[2], 6);
});
