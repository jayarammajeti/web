const express = require('express');
const bodyParser = require('body-parser');
const Feedback = require('./db');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-feedback', async (req, res) => {
    const { name, email, address, phone, comments } = req.body;
    try {
        let feedback = await Feedback.findOne({ email });
        if (feedback) {
            feedback.name = name;
            feedback.address = address;
            feedback.phone = phone;
            feedback.comments = comments;
            await feedback.save();
            res.json({ message: `Thank you, ${name}, for resubmitting your feedback. Your record is updated, and your customer ID remains the same: #${feedback.customerId}.` });
        } else {
            const newFeedback = new Feedback({ name, email, address, phone, comments });
            const count = await Feedback.countDocuments();
            newFeedback.customerId = (count + 1).toString().padStart(3, '0');
            await newFeedback.save();
            res.json({ message: `Thank you, ${name}, for your feedback! Your customer ID is #${newFeedback.customerId}.` });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/about', (req, res) => {
    res.render('about'); 
});

app.get('/contact', (req, res) => {
    res.render('contact'); 
});

app.get('/game', (req, res) => {
    res.render('game'); 
});

app.get('/gifts', (req, res) => {
    res.render('gifts'); 
});

app.get('/media', (req, res) => {
    res.render('media'); 
});

app.get('/pictures', (req, res) => {
    res.render('pictures'); 
});

app.get('/schedule', (req, res) => {
    res.render('schedule'); 
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
