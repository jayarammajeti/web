const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/feedback_form', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const feedbackSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: { type: String, unique: true },
    comments: String,
    customerId: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;