/* global BigInt */

import findGCD from "../../utils/findGCD";
import generateLargeNumber from "../../utils/generateLargeNumber";

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

export default findEncryptionKey;