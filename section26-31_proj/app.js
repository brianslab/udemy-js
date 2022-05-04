const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRepo = require('./repositories/users');
const cookieSession = require('cookie-session');
const users = require('./repositories/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys : [ 'UKzTCg0mf8hEh9FQDpxdQRPUigDebudR' ]
    })
);

app.get('/signup', (req, res) => {
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

app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('Signed out.');
});

app.get('/signin', (req, res) => {
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

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found.');
    }

    if (user.password !== password) {
        return res.send('Invalid password.');
    }

    req.session.userID = user.id;

    res.send('You are signed in!');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
