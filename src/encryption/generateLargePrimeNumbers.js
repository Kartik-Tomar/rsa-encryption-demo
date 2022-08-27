/* global BigInt */

import calculateBigPower from "../utils/calculateBigPower";
import generateLargeNumber from "../utils/generateLargeNumber";

// (all literal integers converted to use n suffix denoting BigInt)

// This function is called
// for all k trials. It returns
// false if n is composite and
// returns false if n is
// probably prime. d is an odd
// number such that d*2<sup>r</sup> = n-1
// for some r >= 1
function miillerRabinTest(d, n) {

    // Pick a random number in [2..n-2]
    // Corner cases make sure that n > 4
    /* 
        can't mix the Number returned by Math.random with
        operations involving BigInt. The workaround is to create a random integer 
        with precision 6 and convert it to a BigInt.
    */
    const r = BigInt(Math.floor(Math.random() * 100_000))
    // now I have to divide by the multiplier used above (BigInt version)
    const y = r * (n - 2n) / 100_000n
    let a = 2n + y % (n - 4n);

    // Compute a^d % n
    let x = calculateBigPower(a, d, n);

    if (x === 1n || x === n - 1n)
        return true;

    // Keep squaring x while one
    // of the following doesn't
    // happen
    // (i) d does not reach n-1
    // (ii) (x^2) % n is not 1
    // (iii) (x^2) % n is not n-1
    while (d !== n - 1n) {
        x = (x * x) % n;
        d *= 2n;

        if (x === 1n)
            return false;
        if (x === n - 1n)
            return true;
    }

    // Return composite
    return false;
}

// It returns false if n is
// composite and returns true if n
// is probably prime. k is an
// input parameter that determines
// accuracy level. Higher value of
// k indicates more accuracy.
const isPrime = (n, k = 40) => {
    // Corner cases
    if (n <= 1n || n === 4n) return false;
    if (n <= 3n) return true;

    // Find r such that n =
    // 2^d * r + 1 for some r >= 1
    let d = n - 1n;
    while (d % 2n === 0n)
        d /= 2n;

    // Iterate given nber of 'k' times
    for (let i = 0n; i < k; i++)
        if (!miillerRabinTest(d, n))
            return false;

    return true;
}

const generateLargePrimeNumbers = (keySize, testIterations, notEqualNum) => {
    // key size is in bits here
    return new Promise((resolve, reject) => {
        let num = generateLargeNumber(keySize);
        let checkPrime = isPrime(BigInt(num), BigInt(testIterations));
        let runLoop = checkPrime ? false : true;
        // notEqualNum is the other prime number
        notEqualNum = parseInt(notEqualNum, 10)
        if (notEqualNum) runLoop = checkPrime && num !== notEqualNum && num > 1 ? false : true;
        while (runLoop) {
            num = generateLargeNumber(keySize);
            checkPrime = isPrime(BigInt(num, testIterations));
            runLoop = checkPrime ? false : true
            if (notEqualNum) runLoop = checkPrime && num !== notEqualNum && num > 1 ? false : true;
        }
        resolve(num.toString());
    })
}

export default generateLargePrimeNumbers;