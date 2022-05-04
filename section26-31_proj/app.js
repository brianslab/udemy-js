const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys : [ 'UKzTCg0mf8hEh9FQDpxdQRPUigDebudR' ]
    })
);
app.use(authRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});
