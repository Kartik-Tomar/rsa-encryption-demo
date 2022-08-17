const calculateBigPower = (x, y, p) => {

    // Initialize result 
    // (JML- all literal integers converted to use n suffix denoting BigInt)
    let res = 1n;

    // Update x if it is more than or
    // equal to p
    x = x % p;
    while (y > 0n) {

        // If y is odd, multiply
        // x with result
        if (y & 1n) res = (res * x) % p;

        // y must be even now
        y = y / 2n; // (JML- original code used a shift operator, but division is clearer)
        x = (x * x) % p;
    }
    return res;
};

export default calculateBigPower;