import findGCD from "../../utils/findGCD";
import generateLargeNumber from "../../utils/generateLargeNumber";

const findEncryptionKey = (N, phiN, keySize) => {
  while (true) {
    let e = generateLargeNumber(keySize);
    let isCoPrimeWithN = findGCD(e, N) === 1n;
    let isCoPrimeWithPhiN = findGCD(e, phiN) === 1n;
    if (isCoPrimeWithN && isCoPrimeWithPhiN && e > 1n) {
      return e;
    }
  }
};

export default findEncryptionKey;