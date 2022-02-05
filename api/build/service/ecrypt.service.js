"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.generatePassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generatePassword() {
    return crypto_1.default.createHash("sha1").digest().slice(0, 16);
}
exports.generatePassword = generatePassword;
function encrypt(key, buf) {
    const cipher = crypto_1.default.createCipher('aes-256-cbc', key);
    const crypted = Buffer.concat([cipher.update(buf), cipher.final()]);
    return crypted;
}
exports.encrypt = encrypt;
function decrypt(key, buf) {
    const decipher = crypto_1.default.createDecipher('aes-256-cbc', key);
    const decrypted = Buffer.concat([decipher.update(buf), decipher.final()]);
    return decrypted;
}
exports.decrypt = decrypt;
//# sourceMappingURL=ecrypt.service.js.map