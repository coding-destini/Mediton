const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    //Option did you take your medication today?
    medication:{
        type: String,
        required: true
    },
    //Did you take anything else today?
    other:{
        type: String,
        required: true
    },
    //How are you feeling today?
    feeling:{
        type: String,
        required: true
    },
    //What is your current blood pressure?
    bloodPressure:{
        type: String
    }
});

module.exports = mongoose.model('Emergency', emergencySchema);