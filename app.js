//include Express
const express = require('express');

// CRITICAL: Load our user data file from the data folder
const userData = require('./data/test.json');

//server will listen on this port
const port = 3000;

//create instance of Express app
const app = express();

//ejs is templating engine
app.set('view engine','ejs');

//this will allow us to serve up static files, CSS, images & JS
app.use(express.static(__dirname + '/public'));

//index/home URL
app.get('/', (req, res) => {
    const title = 'Home Page';
    res.render('pages/index', { title });
});

//about URL
app.get('/about', (req, res) => {
    const title = 'About Page';
    res.render('pages/about', { title });
});

//games URL
app.get('/games', (req, res) => {
    const title = 'Game Page';
    res.render('pages/games', { title });
});

// ==========================================
// 👥 NEW ROUTE: The User Directory (The List)
// ==========================================
app.get('/users', (req, res) => {
    res.render('users/index', {
        title: 'User Directory',
        users: userData
    });
});

// ==========================================
// 🔍 NEW ROUTE: Individual Profile (The View)
// ==========================================
app.get('/users/view/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).send('Invalid user ID');
    }

    const user = userData.find((item) => item.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    res.render('users/view', {
        title: 'User Profile',
        user
    });
});

//Set server to listen for requests
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

// TEMP SANITY CHECK: Dump the first user object to the terminal console
console.log('--- DATA LOAD TEST ---');
console.log(userData[0]);
console.log('----------------------');
