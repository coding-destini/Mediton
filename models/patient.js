const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      schedule: {
        type: String,
        required: true,
      },
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
  },

  reminderDateTime: {
    type: Date,
    required: true,
  },

});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
