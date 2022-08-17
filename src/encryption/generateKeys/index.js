/* global BigInt */

import findDecryptionKey from "./findDecryptionKey";
import findEncryptionKey from "./findEncryptionKey";

const generateKey = (p1, p2, keySize) => {
    const p = BigInt(p1);
    const q = BigInt(p2);

    const N = p * q;
    const phiN = (p - 1n) * (q - 1n);

    const e = findEncryptionKey(N, phiN, keySize);
    const d = findDecryptionKey(e, phiN);


    return { N, phiN, e, d };
}

export default generateKey;