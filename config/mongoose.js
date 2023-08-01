const mongoose = require('mongoose');

// Connect to the MongoDB database using the Mongo_URL environment variable
mongoose.connect(process.env.Mongo_URL)
  .then(() => {
    console.log("Connected to DB 😊");
  })
  .catch((err) => {
    console.log("Err in connecting to DB 😐", err);
});
