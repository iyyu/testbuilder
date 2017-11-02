function createSequentialNums (array, min, max) { //adds to existing array for sequential number specifications for prefix and length
  for (var k = min; k <=max; k++) {
  array.push(k);
  }
  return array;
}

function getcardPrefix (number) { //returns slice of desired digit prefix of the card number passed in
return function (cardNumber) {
  return Number(cardNumber.slice(0, number));
  };
}

function detectNetwork (cardNumString) {
  var cardType = 0;
  var cardLength = cardNumString.length;

  var firstTwoDigits = getcardPrefix(2)(cardNumString);
  var firstThreeDigits = getcardPrefix(3)(cardNumString);
  var firstFourDigits = getcardPrefix(4)(cardNumString);
  var firstSixDigits = getcardPrefix(6)(cardNumString);

  var dinersClubPrefix = [38, 39];
  var dinersClubLength = [14];
  var americanExpressPrefix = [34, 37];
  var americanExpressLength = [15];
  var visaPrefix = [4];
  var visaLength = [13, 16, 19];
  var masterCardPrefix = createSequentialNums([], 51, 55);
  var masterCardLength = [16];
  var discoverPrefix = createSequentialNums([6011, 65], 644, 649);
  var discoverLength = [16, 19];
  var maestroPrefix = [5018, 5020, 5038, 6304];
  var maestroLength = createSequentialNums([], 12, 19);
  var chinaUnionPayPrefix = createSequentialNums((createSequentialNums([624, 625, 626], 622126, 622925)), 6282, 6288);
  var chinaUnionPayLength = createSequentialNums([], 16, 19);
  var switchPrefix =[ 4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759];
  var switchLength = [16, 18, 19];

  if (dinersClubLength.includes(cardLength) && dinersClubPrefix.includes(firstTwoDigits)) {
    cardType = 'Diner\'s Club';
  }
  if (americanExpressLength.includes(cardLength) && americanExpressPrefix.includes(firstTwoDigits)) {
    cardType = 'American Express';
  }
  if (visaLength.includes(cardLength) && cardNumString[0] === '4') {
    cardType = 'Visa';
  }
  if (masterCardLength.includes(cardLength) && masterCardPrefix.includes(firstTwoDigits)) {
    cardType = 'MasterCard';
  }
  if (discoverLength.includes(cardLength) && (discoverPrefix.includes(firstTwoDigits) || discoverPrefix.includes(firstThreeDigits) || discoverPrefix.includes(firstFourDigits))) {
    cardType = 'Discover';
  }
  if (maestroLength.includes(cardLength) && maestroPrefix.includes(firstFourDigits)) {
    cardType = 'Maestro';
  }
  if (chinaUnionPayLength.includes(cardLength) && (chinaUnionPayPrefix.includes(firstThreeDigits) || chinaUnionPayPrefix.includes(firstFourDigits) || chinaUnionPayPrefix.includes(firstSixDigits))) {
    cardType = 'China UnionPay';
  }
  if (switchLength.includes(cardLength) && (switchPrefix.includes(firstFourDigits) || switchPrefix.includes(firstSixDigits))) {
    cardType = 'Switch';
  }
  return cardType;
}