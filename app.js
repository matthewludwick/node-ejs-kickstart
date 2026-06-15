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
    const title = "Matt's Favorite Japanese Music";
    res.render('pages/index', { title });
});

// Tomoko Aran page
app.get('/tomoko', (req, res) => {
    const title = 'Tomoko Aran';
    res.render('pages/tomoko', { title });
});

// Hiroshi Sato page
app.get('/hiroshi', (req, res) => {
    const title = 'Hiroshi Sato';
    res.render('pages/hiroshi', { title });
});

// Yellow Magic Orchestra page
app.get('/YMO', (req, res) => {
    const title = 'Yellow Magic Orchestra';
    res.render('pages/YMO', { title });
});

// Ryuichi Sakamoto page
app.get('/ryuichi', (req, res) => {
    const title = 'Ryuichi Sakamoto';
    res.render('pages/ryuichi', { title });
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
