const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./db'); 

const app = express();

const feedbackSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: { type: String, unique: true },
    comments: String,
    customerId: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.post('/submit-feedback', async (req, res) => {
    try {
        const { name, address, phone, email, comments } = req.body;
        let feedback = await Feedback.findOne({ email: email });

        if (feedback) {
            feedback.name = name;
            feedback.address = address;
            feedback.phone = phone;
            feedback.comments = comments;
            await feedback.save();
            res.status(200).json({ message: `Thank you, ${name}, for resubmitting your feedback. Your record is updated, and your customer ID remains the same: #${feedback.customerId}.` });
        } else {
            const count = await Feedback.countDocuments();
            const newCustomerId = `00${count + 1}`.slice(-3);
            feedback = new Feedback({ name, address, phone, email, comments, customerId: newCustomerId });
            await feedback.save();
            res.status(200).json({ message: `Thank you, ${name}, for your feedback! Your customer ID is #${newCustomerId}.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing your feedback.', error: error.message });
    }
});

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
