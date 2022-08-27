import findEgcd from "../../utils/findEGCD";

const findDecryptionKey = (e, phiN) => {
    let { x } = findEgcd(e, phiN);
    if (x < 0) x += phiN
    return x;
};

export default findDecryptionKey;