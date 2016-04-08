var expect = require('expect');
var factorial = require('../app/scripts/factorial');

describe('factorial test',function(){
  it('should say factorial exists',function(){
    expect(factorial).toExist();
    expect(factorial).toNotBe(undefined);
  });

  it('should give factorial value',function(){
  	expect(factorial.factorial1).toExist();
  	expect(factorial.factorial1).toNotBe(undefined);
  	expect(factorial.factorial1(5)).toEqual(120);
  });
})