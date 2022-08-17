/* global BigInt */

import calculateBigPower from "../utils/calculateBigPower";

const decrypt = (enc, d, N) => {
    let decipher = "";
    const parts = enc.split(' ');
    for (let i = 0; i < parts.length; i++) {
        const c = parts[i];
        const de = (calculateBigPower(BigInt(c), BigInt(d), BigInt(N))).toString();
        decipher += String.fromCharCode(de);
    }
    return decipher;
};

export default decrypt;