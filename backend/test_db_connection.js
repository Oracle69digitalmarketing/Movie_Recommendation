require('dotenv').config(); // Load environment variables from .env

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file.');
    process.exit(1);
}

console.log('Attempting direct MongoDB connection with URI:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true, // Deprecated, no effect
  // useUnifiedTopology: true // Deprecated, no effect
})
.then(() => {
  console.log('Direct MongoDB connection successful!');
  mongoose.disconnect(); // Disconnect after successful test
})
.catch(err => {
  console.error('Direct MongoDB connection failed:', err);
  mongoose.disconnect(); // Attempt to disconnect even on failure
});
