/* global BigInt */

import calculateBigPower from "../utils/calculateBigPower";

const encrypt = (msg, e, N) => {
    let cipher = "";
    for (let i = 0; i < msg.length; i++) {
        const element = msg[i];
        const m = element.charCodeAt();
        const c = (calculateBigPower(BigInt(m), BigInt(e), BigInt(N))).toString() + ' ';
        cipher += c;
    }
    return cipher;
};

export default encrypt;