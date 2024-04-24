// db.js
const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URI || 'mongodb+srv://jayarammajeti7:Jayaram07@cluster0.ajao1oa.mongodb.net/Feedback_form';

mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(-1);
});

module.exports = mongoose;
