const express = require('express');
const usersPreo = require('../../repositories/users');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(`
    <div>
        Your ID is: ${req.session.userID}
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use.');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match.');
    }

    // create a user in users repo
    const user = await usersRepo.create({ email, password });

    // store the id inside the users cookie
    req.session.userID = user.id; // added by cookie session

    res.send('Account Created!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('Signed out.');
});

router.get('/signin', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <button>Sign In</button>
        </form>
    </div>
    `);
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found.');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );
    if (!validPassword) {
        return res.send('Invalid password.');
    }

    req.session.userID = user.id;

    res.send('You are signed in!');
});

module.exports = router;
