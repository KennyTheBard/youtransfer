import crypto from 'crypto';

export function encrypt(password: string, buf: Buffer): Buffer {
   const cipher = crypto.createCipheriv('aes-128-ccm', Buffer.from(password), null)
   const crypted = Buffer.concat([cipher.update(buf), cipher.final()]);
   return crypted;
}

export function decrypt(password: string, buf: Buffer): Buffer {
   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(password), null);
   const decrypted = Buffer.concat([decipher.update(buf), decipher.final()]);
   return decrypted;
}