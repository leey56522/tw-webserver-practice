const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    res.send('Heyo! This is a testing server')
})

const isValidPhoneNum = function(phoneNum) {
    return phoneNum.length === 10;
}

// check phone number and if it's valid, send SMS to the number
app.get('/smsnow', (req, res) => {
    const phoneNum = req.query.phoneNumber

    if(!phoneNum || phoneNum === '') {
        res.status(404).send('Phone number not in query');
    }
    if (!isValidPhoneNum(phoneNum)) {
        res.status(400).send('Phone number does not fit the requirement')
    }

    const receivingPhoneNum = `+1${phoneNum}`;

    // Send SMS
    client.messages
        .create({
            from: '+19894030387',
            body: "Ahoy! This is Lucya Weeeee :3",
            to: receivingPhoneNum,
        })
        .then(message => console.log(message.sid));
})

// set up local host at port
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})

module.exports = {isValidPhoneNum};