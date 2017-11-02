// TO DO: write tests that detect network for Visa and Switch

/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';
 
// describe('Introduction to Mocha Tests - READ ME FIRST', function() {
//   // A Mocha test is just a function!
//   // If the function throws an error when run, it fails.
//   // If it doesn't throw an error when run, it doesn't fail. 
//   // To read more about mocha, visit mochajs.org

//   // Once you've read and understood this section, please comment it out. 
//   // You will not be able to proceed with a failing test. 

//   it('Throws an error so it fails', function() {
//     throw new Error('Delete me!');
//   });

function makeTestCardString(desiredCardLength) {
  return function(cardPrefix) {
  var endingString = '';
    for (var i = 0; i < Number(desiredCardLength) - cardPrefix.length; i++) {
      endingString = endingString.concat(0);
    } 
    return cardPrefix.concat(endingString);
  };
}

  var complete12Digits = makeTestCardString(12);
  var complete13Digits = makeTestCardString(13);
  var complete14Digits = makeTestCardString(14);
  var complete15Digits = makeTestCardString(15);
  var complete16Digits = makeTestCardString(16);
  var complete17Digits = makeTestCardString(17);
  var complete18Digits = makeTestCardString(18);
  var complete19Digits = makeTestCardString(19);

  var should = chai.should();

  it('Doesn\'t throw an error, so it doesn\'t fail', function() {
    // This test doesn't really test anything at all! It will pass no matter what.
    var even = function(num){
      return num % 2 === 0;
    }
    return even(10) === true;
  });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.

  it('Throws an error when expected behavior does not match actual behavior', function() {
    var even = function (num) {
      return num % 2 === 0;
    }
    if(even(10) !== true) {
      throw new Error('10 should be even!');
    }
  });

describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...
  it('has a prefix of 38 and a length of 14', function() {
    detectNetwork('38345678901234').should.equal('Diner\'s Club');
  });

  it('has a prefix of 39 and a length of 14', function() {
    detectNetwork('39345678901234').should.equal('Diner\'s Club');
  });
});

describe('American Express', function() {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true. 
  var assert = function(isTrue) {
    if(!isTrue) {
      throw new Error('Test failed');
    }
  };

  it('has a prefix of 34 and a length of 15', function() {
    detectNetwork('343456789012345').should.equal('American Express');
  });

  it('has a prefix of 37 and a length of 15', function() {
    detectNetwork('373456789012345').should.equal('American Express');
  });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it. 
  //   http://chaijs.com/
  var assert = chai.assert;

  it('has a prefix of 4 and a length of 13', function() {
    detectNetwork('4123456789012').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    detectNetwork('4123456789012345').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    detectNetwork('4123456789012345678').should.equal('Visa');
  });
});

describe('MasterCard', function() {
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.

  var should = chai.should();

  for (var ii = 51; ii <= 55; ii++) {
      (function (ii) {
        it('has a prefix of ' + ii.toString() + ' and a length of 16', function() {
          detectNetwork(complete16Digits(ii.toString())).should.equal('MasterCard');
        });
      })(ii);
    }
});

// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
describe('Discover', function() {
  var should = chai.should();

  var discoverPrefixes = [6011, 65, 644, 645, 646, 647, 648, 649];

  for (var i = 0; i < discoverPrefixes.length; i++) {
    (function (i) {
      it('has a prefix of ' + discoverPrefixes[i] + ' and a length of 16', function() {
        detectNetwork(complete16Digits(discoverPrefixes[i].toString())).should.equal('Discover');
      });
      it('has a prefix of ' + discoverPrefixes[i] + ' and a length of 19', function() {
        detectNetwork(complete19Digits(discoverPrefixes[i].toString())).should.equal('Discover');
      });
    })(i);
  }
});

// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
describe('Maestro', function() {
  var should = chai.should();
  for (var length = 12; length <= 19; length++) {
    (function (length) {
    it('has a prefix of 5018 and a length of '+ length, function () {
      detectNetwork(makeTestCardString(length)('5018')).should.equal('Maestro');
    });
    it('has a prefix of 5020 and a length of '+ length, function () {
      detectNetwork(makeTestCardString(length)('5020')).should.equal('Maestro');
    });
    it('has a prefix of 5038 and a length of '+ length, function () {
      detectNetwork(makeTestCardString(length)('5038')).should.equal('Maestro');
    }); 
    it('has a prefix of 6304 and a length of '+ length, function () {
      detectNetwork(makeTestCardString(length)('6304')).should.equal('Maestro');
    }); 
  })(length);
}
});
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.

describe('China UnionPay', function() {
  var should = chai.should();

  var UnionPayPrefixStarts = [622126, 624, 6282];
  var UnionPayPrefixEnds = [622925, 626, 6288];

  for (var k = 0; k < UnionPayPrefixStarts.length; k++) {
    for (var prefix = UnionPayPrefixStarts[k]; prefix <= UnionPayPrefixEnds[k]; prefix++) {
      (function (prefix) {
        it('has a prefix of ' + prefix + ' and a length of 16', function() {
          detectNetwork(complete16Digits(prefix.toString())).should.equal('China UnionPay');
        });
        it('has a prefix of ' + prefix + ' and a length of 17', function() {
          detectNetwork(complete17Digits(prefix.toString())).should.equal('China UnionPay');
        });
        it('has a prefix of ' + prefix + ' and a length of 18', function() {
          detectNetwork(complete18Digits(prefix.toString())).should.equal('China UnionPay');
        });
        it('has a prefix of ' + prefix + ' and a length of 19', function() {
          detectNetwork(complete19Digits(prefix.toString())).should.equal('China UnionPay');
        });
      })(prefix);
    }
  }
});

// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

describe('Switch', function() {
  var should = chai.should();
  var switchPrefixes = [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759];

  for (var count = 0; count < switchPrefixes.length; count++) {
    (function (count) {
    it('has a prefix of ' + switchPrefixes[count] + ' and a length of 16', function() {
      detectNetwork(complete16Digits(switchPrefixes[count].toString())).should.equal('Switch');
    });

    it('has a prefix of ' + switchPrefixes[count] + ' and a length of 18', function() {
      detectNetwork(complete18Digits(switchPrefixes[count].toString())).should.equal('Switch');
    });

    it('has a prefix of ' + switchPrefixes[count] + ' and a length of 19', function() {
      detectNetwork(complete19Digits(switchPrefixes[count].toString())).should.equal('Switch');
    });
    })(count);
  }
});