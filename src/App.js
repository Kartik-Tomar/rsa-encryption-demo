import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import generateKey from './encryption/generateKeys';
import encrypt from "./encryption/encrypt";
import decrypt from "./encryption/decrypt";
import generateLargePrimeNumbers from "./encryption/generateLargePrimeNumbers";
import Loader from "./components/loader";
import Input from "./components/input";
import ShowCode from "./components/showCode.js/index.js";
import { generateLargeNumberString, calculateBigPowerString, generateLargePrimeNumbersString, findGCDString, generateKeyString, findEgcdString, encryptString, decryptString } from "./codeStrings";

function App() {

  const [keySize, setKeySize] = useState(32);
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [N, setN] = useState('');
  const [phiN, setPhiN] = useState('');
  const [e, setE] = useState('');
  const [d, setD] = useState('');
  const [msg, setMsg] = useState('Hello RSA !!!');
  const [encryptedMsg, setEncryptedMsg] = useState('');
  const [decryptedMsg, setDecryptedMsg] = useState('')
  const [isLoading, setIsLoader] = useState(false);

  const clearState = () => {
    setP('');
    setQ('');
    setN('');
    setPhiN('');
    setE('');
    setD('');
    setEncryptedMsg('');
    setDecryptedMsg('');
  }

  const handleGeneratePrimeButtonClick = () => {
    setIsLoader(true);
    setTimeout(() => {
      setP(generateLargePrimeNumbers(keySize, 1000));
      setQ(generateLargePrimeNumbers(keySize, 1000));
      setIsLoader(false);
    }, 100);
  }

  const handleGenerateButtonClick = () => {
    setIsLoader(true);
    setTimeout(() => {
      let { N, phiN, e, d } = generateKey(p, q, keySize);
      setN(N.toString());
      setPhiN(phiN.toString());
      setE(e.toString());
      setD(d.toString());
      setIsLoader(false);
    }, 100);
  };

  const handleEncryptButton = () => {
    setIsLoader(true);
    setTimeout(() => {
      setEncryptedMsg(encrypt(msg, e, N));
      setIsLoader(false);
    }, 100);
  };

  const handleDecryptButton = () => {
    setIsLoader(true);
    setTimeout(() => {
      setDecryptedMsg(decrypt(encryptedMsg, d, N));
      setIsLoader(false);
    }, 100);
  };

  const runCompleteProcess = () => {
    setIsLoader(true);
    setTimeout(() => {
      let p1 = generateLargePrimeNumbers(keySize, 1000);
      let p2 = generateLargePrimeNumbers(keySize, 1000);
      let { N, phiN, e, d } = generateKey(p1, p2, keySize);
      let encMsg = encrypt(msg, e, N);
      let decMsg = decrypt(encMsg, d, N);
      setP(p1);
      setQ(p2);
      setN(N.toString());
      setPhiN(phiN.toString());
      setE(e.toString());
      setD(d.toString());
      setEncryptedMsg(encMsg);
      setDecryptedMsg(decMsg);
      setIsLoader(false);
    }, 100);
  }

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "keySize") setKeySize(value);
    if (id === "p") setP(value);
    if (id === "q") setQ(value);
    if (id === "N") setN(value);
    if (id === "phiN") setPhiN(value);
    if (id === "e") setE(value);
    if (id === "d") setD(value);
    if (id === "msg") setMsg(value);
  }

  return (
    <div className="App container mb-5">
      {isLoading && <Loader />}
      <h1 className="mt-5 mb-4">RSA Encrypt</h1>
      <div>
        <ShowCode btnText={"Generate Large Number (code)"} id={"gln"} codeString={generateLargeNumberString} />
        <ShowCode btnText={"Calculate Big Power (code)"} id={"cbps"} codeString={calculateBigPowerString} />
      </div>
      <div className="mb-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <Input type={"number"} value={keySize} onChange={handleChange} disabled={false} keyText={"Key Size"} label={"(in bits)"} id={"keySize"} />
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Input type={"number"} value={p} onChange={handleChange} disabled={false} keyText={"p"} label={"(First Prime number)"} id={"p"} />
          </div>
          <div className="col-md-6">
            <Input type={"number"} value={q} onChange={handleChange} disabled={false} keyText={"q"} label={"(Second Prime number)"} id={"q"} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleGeneratePrimeButtonClick}>Generate Prime Numbers</button>
        <ShowCode btnText={"Generate Large Prime Numbers (code)"} id={"glpns"} codeString={generateLargePrimeNumbersString} />
      </div>
      <div className="mb-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <Input type={"number"} value={N} onChange={handleChange} isDisabled={false} keyText={"N"} label={"(p * q)"} id={"N"} />
          </div>
          <div className="col-md-6">
            <Input type={"number"} value={phiN} onChange={handleChange} idDisabled={false} keyText={"Φ(N)"} label={"((p - 1) * (q - 1))"} id={"phiN"} />
          </div>
          <div className="col-md-6">
            <Input type={"number"} value={e} onChange={handleChange} isDisabled={false} keyText={"e"} label={"(Encryption Key)"} id={"e"} />
          </div>
          <div className="col-md-6">
            <Input type={"number"} value={d} onChange={handleChange} isDisabled={false} keyText={"d"} label={"(Decryption Key)"} id={"d"} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleGenerateButtonClick}>Generate Keys</button>
        <ShowCode btnText={"Find Greatest Common Divisor (code)"} id={"fgcd"} codeString={findGCDString} />
        <ShowCode btnText={"Find Euclidean algorithm Greatest Common Divisor (code)"} id={"fegcd"} codeString={findEgcdString} />
        <ShowCode btnText={"Generate Keys (code)"} id={"gk"} codeString={generateKeyString} />
      </div>
      <div className="mb-5">
        <div className="row mb-3">
          <div className="col-md-12">
            <Input type={"textarea"} value={msg} onChange={handleChange} isDisabled={false} keyText={"Message"} id={"msg"} />
          </div>
        </div>
        <div className="mb-5">
          <div className="row mb-3">
            <div className="col-md-12">
              <Input type={"textarea"} value={encryptedMsg} onChange={handleChange} isDisabled={true} keyText={"Encrypted Message"} rows={"5"} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleEncryptButton}>Encrypt Message</button>
          <ShowCode btnText={"Encrypt Message (code)"} id={"em"} codeString={encryptString} />
        </div>
        <div className="mb-5">
          <div className="row mb-3">
            <div className="col-md-12">
              <Input type={"textarea"} value={decryptedMsg} onChange={handleChange} isDisabled={true} keyText={"Decrypted Message"} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleDecryptButton}>Decrypt Message</button>
          <ShowCode btnText={"Decrypt Message (code)"} id={"dm"} codeString={decryptString} />
        </div>
      </div>
      <button className="btn btn-danger" onClick={clearState}>Clear State</button>
      <button className="btn btn-success mx-4" onClick={runCompleteProcess}>Run Complete again</button>
    </div>
  );
}

export default App;
