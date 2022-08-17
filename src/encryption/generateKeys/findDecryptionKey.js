/* global BigInt */

import findEgcd from "../../utils/findEGCD";

const findDecryptionKey = (e, phiN) => {
    // finding modular inverse 
    // for (let x = 1n; x < phiN; x++) {
    //     if (((e % phiN) * (x % phiN)) % phiN == 1n)
    //         return x;
    // }

    let { gcd, x, y } = findEgcd(e, phiN);
    if (x < 0) x += phiN
    return x;


    // [e, phiN] = [Number(e), Number(phiN)]
    // if (Number.isNaN(e) || Number.isNaN(phiN)) {
    //     return NaN // invalid input
    // }
    // e = (e % phiN + phiN) % phiN
    // if (!e || phiN < 2) {
    //     return NaN // invalid input
    // }
    // // find the gcd
    // const s = []
    // let b = phiN
    // while (b) {
    //     [e, b] = [b, e % b]
    //     s.push({ e, b })
    // }
    // if (e !== 1) {
    //     return NaN // inverse does not exists
    // }
    // // find the inverse
    // let x = 1
    // let y = 0
    // for (let i = s.length - 2; i >= 0; --i) {
    //     [x, y] = [y, x - y * Math.floor(s[i].e / s[i].b)]
    // }
    // return (y % phiN + phiN) % phiN
};

export default findDecryptionKey;