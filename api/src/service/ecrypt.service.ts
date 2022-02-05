import crypto from 'crypto';


export function generatePassword(): Buffer {
   return crypto.createHash("sha1").digest().slice(0, 16);
}

export function encrypt(key: Buffer, buf: Buffer): Buffer {
   const cipher = crypto.createCipher('aes-256-cbc', key);
   const crypted = Buffer.concat([cipher.update(buf), cipher.final()]);
   return crypted;
}

export function decrypt(key: Buffer, buf: Buffer): Buffer {
   const decipher = crypto.createDecipher('aes-256-cbc', key);
   const decrypted = Buffer.concat([decipher.update(buf), decipher.final()]);
   return decrypted;
}