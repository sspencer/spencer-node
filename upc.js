// UPC Info: http://en.wikipedia.org/wiki/Universal_Product_Code

// Digits 0 - 9: left side, right side
var Encoding = [
      "0001101", "1110010"   // 0
    , "0011001", "1100110"   // 1
    , "0010011", "1101100"   // 2
    , "0111101", "1000010"   // 3
    , "0100011", "1011100"   // 4
    , "0110001", "1001110"   // 5
    , "0101111", "1010000"   // 6
    , "0111011", "1000100"   // 7
    , "0110111", "1001000"   // 8
    , "0001011", "1110100"]; // 9

var ProductType = [
      "Regular UPC codes"
    , "Reserved"
    , "Weight items marked at the store."
    , "National Drug/Health-related code."
    , "No format restrictions, in-store use on non-food items."
    , "Coupons"
    , "Reserved"
    , "Regular UPC codes"
    , "Reserved"
    , "Reserved" ];
    
// bar code: START (LLLLLL) MIDDLE (RRRRRR) END
var Wall = ["000000000101", "01010", "101000000000"];

// exmample 785247125975
exports.bits = function(upc_code) {
    var i, left = "", right = "", digit;

    for (i = 0; i < 12; i++) {
        digit = upc_code.charCodeAt(i) - 48;
        if (i < 6) {
            left += Encoding[digit * 2];
        } else {
            right += Encoding[digit * 2 + 1];
        }
    }
    return Wall[0] + left + Wall[1] + right + Wall[2];            
};

function upc_atod(upc_code) {
    return function(i) {
        return upc_code.charCodeAt(i) - 48;
    }
}

exports.getObject = function(upc_code) {
    var checksum;
    
    var atod = upc_atod(upc_code);
    
    // ( (3 * sum(odd digits)) + sum(even digits) ) mod 10
    checksum = 3 * (atod(0) + atod(2) + atod(4) + atod(6) + atod(8) + atod(10))
    checksum += (atod(1) + atod(3) + atod(5) + atod(7) + atod(9));
    checksum %= 10;

    var upc_valid = (checksum  === atod(11));


    return {
          product_type: ProductType[atod(0)]
        , checksum:     atod(11)
        , valid:        upc_valid        
        , upc_code:     upc_code
        , bits:         exports.bits(upc_code)
    };
};