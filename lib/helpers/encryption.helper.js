"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const nk_js_library_1 = require("nk-js-library");
const getKey = (val) => {
    return val + ";[9,Tx.YHt+kTxr,";
};
const encryptPassword = function (password) {
    return nk_js_library_1.Utils.EncryptionUtils.encrypt(password, getKey(password));
};
exports.encryptPassword = encryptPassword;
const checkPassword = function (encrypted, plain) {
    return nk_js_library_1.Utils.EncryptionUtils.decrypt(encrypted, getKey(plain)) === plain;
};
exports.checkPassword = checkPassword;
