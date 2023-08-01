const Emergency = require('../models/emergency');
const client = require('twilio')('ACbd43f70653595af6d42b59ea4e406f52', 'eca15e1bd4adae7c4905b378ff7e1561');


//emergecy controller
exports.emergency = async(req, res) =>{
 try {
    const {name, phone, medication, other, feeling, bloodPressure} = req.body;
    const emergency = await Emergency.create({
        name,
        phone,
        medication,
        other,
        feeling,
        //bloodPressure is optional
        bloodPressure
    })
     //Using Twilio to send SMS
     client.messages.create({
        from: '+17623092438',   //Twilio number
        to: `+916397229752`,
        body: `Alert : !!!! There is a emergency case. Please check the patient details. And take necessary action.`
    }).then((message) => console.log(message.sid));

     // Generate the message dynamically
     const message = `Hello Doctor Akash, There is a emergency case. Please check the patient details. And take necessary action.`;
     //Use Twilio to make a call
     client.calls.create({
         url: `http://twimlets.com/message?Message=${encodeURIComponent(message)}`,
         to: `+916397229752`,
         from: '+17623092438'
     }).then(calling => console.log(calling.sid));
     res.redirect('/');

 } catch (error) {
    console.log(error);
    res.render('error');
 }
}

// Render the emergency page with emergency data
exports.EmergencyPatient = async (req, res) => {
    try {
      // Fetch emergency data from the database (if needed)
      const emergecyPatient = await Emergency.find();
  if(emergecyPatient.length == 0){
        return res.render('PatientPortal');
  }
      // Render the emergency page with emergency data
      res.render('PatientPortal', { emergecyPatient });
    } catch (error) {
      console.log(error);
      res.render('error');
    }
  };
