const Patient = require('../models/patient');
const client = require('twilio')('ACbd43f70653595af6d42b59ea4e406f52', '2deab265e5216417e0f5e7de444b38b1');
const cron = require('node-cron');

//because cron expect  date time in string format so we will make a function for that
function cronformat(dateTime) {
    const date = new Date(dateTime);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${minutes} ${hours} ${day} ${month} *`;
}


//creating a new patient
exports.createPatient = async (req, res) => {
    try {
        const { name, gender, age, medications, phoneNumber, reminderDateTime } = req.body;
        await Patient.create({
            name,
            age,
            gender,
            phoneNumber,
            medications,
            reminderDateTime: new Date(reminderDateTime),
        });
        //Using Twilio to send SMS
        client.messages.create({
            from: '+17623092438',   //Twilio number
            to: `+91${phoneNumber}`,
            body: `Hello ${name}, your are registered successfully. From now on you will receive a reminder of your medications.
            for more details call us on +91 6397229752. Thank you.`
        }).then((message) => console.log(message.sid));

        //converting date time to string format
        const convertedDate = cronformat(reminderDateTime);

        //schedule a call using cron job
        cron.schedule(convertedDate, () => {
            // Generate the message dynamically
            const message = `Hello ${name}, It's time to take your medications.Please take your medications. Thank you.`;
            //Use Twilio to make a call
            client.calls.create({
                url: `http://twimlets.com/message?Message=${encodeURIComponent(message)}`,
                to: `+91${phoneNumber}`,
                from: '+17623092438'
            }).then(calling => console.log(calling.sid));
        });
        //back to homepage
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'Error in creating patient',
        });
    }
}

//getting all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('home', { patients });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'error in getting all patients',
        });
    }
}

