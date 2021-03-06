import { Utils } from 'nk-js-library';

//REQUIRES CHANGES
const getKey = (val: string) => {
    return val + ";[9,Tx.YHt+kTxr,"
}

const encryptPassword = function (password: string) {
    return password.encrypt(getKey(password));
}

const checkPassword = function (encrypted: string, plain: string) {
    return encrypted.decrypt(getKey(plain)) === plain;
}

export {
    encryptPassword,
    checkPassword
}