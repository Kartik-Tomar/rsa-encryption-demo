/* global BigInt */

// extended Euclidean algorithm, greatest common divisor
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

export default findEgcd;