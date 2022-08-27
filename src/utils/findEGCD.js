/* global BigInt */

// extended Euclidean algorithm, greatest common divisor
const findEgcd = (e, phiN) => {

    let s = BigInt(0), oldS = BigInt(1);
    let t = BigInt(1), oldT = BigInt(0);
    let r = phiN, oldR = e;

    while (r !== BigInt(0)) {

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

export default findEgcd;