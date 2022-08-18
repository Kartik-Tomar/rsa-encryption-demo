export const generateLargeNumberString =
    `// Generate Large Number from using bit size
const generateLargeNumber = (keySize) => {
    let str = ''
    for (let i = 0; i < keySize; i++) {
        str += Math.floor(Math.random() * Math.floor(2));
    }
    return BigInt(parseInt(str, 2));
};`

export const calculateBigPowerString =
    `// Calculate Big Power
const calculateBigPower = (x, y, p) => {
    // (all literal integers converted to use n suffix denoting BigInt)
    // Initialize result
    let res = 1n;

    // Update x if it is more than or
    // equal to p
    x = x % p;
    while (y > 0n) {

        // If y is odd, multiply
        // x with result
        if (y & 1n) res = (res * x) % p;

        // y must be even now
        y = y / 2n;
        x = (x * x) % p;
    }
    return res;
};`

export const generateLargePrimeNumbersString =
    `// Generate Large Prime Numbers
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

    if (x == 1n || x == n - 1n)
        return true;

    // Keep squaring x while one
    // of the following doesn't
    // happen
    // (i) d does not reach n-1
    // (ii) (x^2) % n is not 1
    // (iii) (x^2) % n is not n-1
    while (d != n - 1n) {
        x = (x * x) % n;
        d *= 2n;

        if (x == 1n)
            return false;
        if (x == n - 1n)
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
    if (n <= 1n || n == 4n) return false;
    if (n <= 3n) return true;

    // Find r such that n =
    // 2^d * r + 1 for some r >= 1
    let d = n - 1n;
    while (d % 2n == 0n)
        d /= 2n;

    // Iterate given nber of 'k' times
    for (let i = 0; i < k; i++)
        if (!miillerRabinTest(d, n))
            return false;

    return true;
}

const generateLargePrimeNumbers = (keySize, testIterations) => {
    // key size is in bits here
    let num = generateLargeNumber(keySize);
    let checkPrime = isPrime(BigInt(num, testIterations));
    while (!checkPrime) {
        num = generateLargeNumber(keySize);
        checkPrime = isPrime(BigInt(num, testIterations));
    }
    return num.toString();
}
`

export const findGCDString =
    `// Find Greatest Common Divisor (HCF)
const findGCD = (x, y) => {
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
`

export const findEgcdString =
    `// Find extended Euclidean algorithm, greatest common divisor
const findEgcd = (e, phiN) => {

    let s = 0n, oldS = 1n;
    let t = 1n, oldT = 0n;
    let r = phiN, oldR = e;

    while (r != 0n) {

        let oldOldR = oldR;
        let oldOldS = oldS;
        let oldOldT = oldT;

        let quotient = oldR / r;

        oldR = r;
        r = oldOldR - quotient * r;

        oldS = s;
        s = oldOldS - quotient * s;

        oldT = t;
        t = oldOldT - quotient * t;
    }

    return { gcd: oldR, x: oldS, y: oldT }
}
`

export const generateKeyString =
    `// Generate Keys
import findGCD from "../../utils/findGCD";
import findEgcd from "../../utils/findEGCD";
import generateLargeNumber from "../../utils/generateLargeNumber";

const findDecryptionKey = (e, phiN) => {
    let { gcd, x, y } = findEgcd(e, phiN);
    if (x < 0) x += phiN
    return x;
};

const findEncryptionKey = (N, phiN, keySize) => {
  while (true) {
    let e = generateLargeNumber(keySize);
    let isCoPrimeWithN = findGCD(e, N) == 1;
    let isCoPrimeWithPhiN = findGCD(e, phiN) == 1;
    if (isCoPrimeWithN && isCoPrimeWithPhiN) {
      return e;
    }
  }
};

const generateKey = (p1, p2, keySize) => {
    const p = BigInt(p1);
    const q = BigInt(p2);

    const N = p * q;
    const phiN = (p - 1n) * (q - 1n);

    const e = findEncryptionKey(N, phiN, keySize);
    const d = findDecryptionKey(e, phiN);


    return { N, phiN, e, d };
}`

export const encryptString =
    `import calculateBigPower from "../utils/calculateBigPower";

const encrypt = (msg, e, N) => {
    let cipher = "";
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        const m = element.charCodeAt();
        const c = (calculateBigPower(BigInt(m), BigInt(e), BigInt(N))).toString() + ' ';
        cipher += c;
    }
    return cipher;
};`

export const decryptString =
    `import calculateBigPower from "../utils/calculateBigPower";

const decrypt = (enc, d, N) => {
    let decipher = "";
    const parts = enc.split(' ');
    for (let i = 0; i < parts.length; i++) {
        const c = parts[i];
        const de = (calculateBigPower(BigInt(c), BigInt(d), BigInt(N))).toString();
        decipher += String.fromCharCode(de);
    }
    return decipher;
};`