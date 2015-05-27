"use strict";

describe('xtorage', function() {
    beforeEach(function()
    {

    })

    it('should return true', function()
    {
        var _x = new xtorage.Xtorage();

        expect(true).toBeTruthy();
        _x.get('a');
    })
})