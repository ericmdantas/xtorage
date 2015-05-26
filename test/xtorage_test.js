"use strict";

const expect = require('chai').expect;
const Xtorage = new require('../src/xtorage');

describe('xtorage', function() {
    beforeEach(function()
    {
        console.log(window)
    })

    it('should return true', function()
    {
        expect(true).to.be.true;
    })
})