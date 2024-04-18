const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ensure the views directory is correctly set

// Serve static files from the 'public' directory (if you have CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('index'); // Render 'index.ejs' when the root route is accessed
});

app.get('/about', (req, res) => {
    res.render('about'); // Render 'about.ejs' when the /about route is accessed
});

app.get('/contact', (req, res) => {
    res.render('contact'); // Render 'contact.ejs'
});

app.get('/game', (req, res) => {
    res.render('game'); // Render 'game.ejs'

});

app.get('/gifts', (req, res) => {
    res.render('gifts'); // Render 'gifts.ejs'
});

app.get('/media', (req, res) => {
    res.render('media'); // Render 'media.ejs'
});

app.get('/pictures', (req, res) => {
    res.render('pictures'); // Render 'pictures.ejs'
});

app.get('/schedule', (req, res) => {
    res.render('schedule'); // Render 'schedule.ejs'
});

// Start the server
const PORT = process.env.PORT || 3008; // Use environment variable for port or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
