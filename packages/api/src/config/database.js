const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flowbit', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); 
  }
}
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Error:', err);
});

module.exports = connectDB;