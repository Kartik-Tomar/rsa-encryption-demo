/* global BigInt */

const generateLargeNumber = (keySize) => {
    let str = ''
    for (let i = 0; i < keySize; i++) {
        str += Math.floor(Math.random() * Math.floor(2));
    }
    return BigInt(parseInt(str, 2));
};

export default generateLargeNumber;