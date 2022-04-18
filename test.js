const request = require('supertest')('https://api.twilio.com/2010-04-01')
const assert = require('chai').assert;

const isValidPhoneNum = require('./server').isValidPhoneNum;


describe('Twilio SMS API', () => {

    it('checks if phone number is valid', () => {
        assert.equal(isValidPhoneNum('1234567899'), true)
    });

    it('checks if phone number is invalid', () => {
        assert.equal(isValidPhoneNum('0'), false)
    });
})