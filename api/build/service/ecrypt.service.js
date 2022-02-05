"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
function encrypt(password, buf) {
    const cipher = crypto_1.default.createCipheriv('aes-128-ccm', Buffer.from(password), null);
    const crypted = Buffer.concat([cipher.update(buf), cipher.final()]);
    return crypted;
}
exports.encrypt = encrypt;
function decrypt(password, buf) {
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(password), null);
    const decrypted = Buffer.concat([decipher.update(buf), decipher.final()]);
    return decrypted;
}
exports.decrypt = decrypt;
//# sourceMappingURL=ecrypt.service.js.map