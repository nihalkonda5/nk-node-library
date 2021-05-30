"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const getKey = (val) => {
    return val + ";[9,Tx.YHt+kTxr,";
};
const encryptPassword = function (password) {
    return password.encrypt(getKey(password));
};
exports.encryptPassword = encryptPassword;
const checkPassword = function (encrypted, plain) {
    return encrypted.decrypt(getKey(plain)) === plain;
};
exports.checkPassword = checkPassword;
