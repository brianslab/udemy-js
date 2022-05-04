const express = require('express');
const usersPreo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
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
    res.send(signinTemplate());
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
