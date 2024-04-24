const mongoose = require('mongoose');

// Ensure you use the actual environment variable here.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://jayarammajeti7:Jayaram@07@cluster0.ajao1oa.mongodb.net/';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

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
