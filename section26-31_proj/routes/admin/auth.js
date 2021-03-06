const express = require('express');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireEmailExists,
    requireValidPasswordForUser
} = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});

router.post(
    '/signup',
    [ requireEmail, requirePassword, requirePasswordConfirmation ],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body;

        // create a user in users repo
        const user = await usersRepo.create({ email, password });

        // store the id inside the users cookie
        req.session.userID = user.id; // added by cookie session

        res.send('Account created!');
    }
);

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('Signed out.');
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});

router.post(
    '/signin',
    [ requireEmailExists, requireValidPasswordForUser ],
    handleErrors(signinTemplate),
    async (req, res) => {
        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email });

        req.session.userID = user.id;

        res.send('You are signed in!');
    }
);

module.exports = router;
