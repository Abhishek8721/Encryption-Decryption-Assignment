const crypto = require('crypto');
require('dotenv').config();

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');  // Should be a 32-byte (256-bit) key

if (ENCRYPTION_KEY.length !== 32) {
  console.error("ENCRYPTION_KEY must be set and be 32 bytes (256-bit) long.");
  process.exit(1);
}

// Encryption function
function encrypt(plaintext) {

  const iv = crypto.randomBytes(16);  
   
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    

  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  
  return {
    iv: iv.toString('base64'),
    encryptedData: encrypted
  };
}

// Decryption function
function decrypt(ivBase64, encryptedBase64) {
  
  const iv = Buffer.from(ivBase64, 'base64');

  const encryptedText = Buffer.from(encryptedBase64, 'base64');

 
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);


  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}


const plaintext = 'Hello, Abhishek from this side';
console.log('Original plaintext:', plaintext);


const encrypted = encrypt(plaintext);
console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted.iv, encrypted.encryptedData);
console.log('Decrypted:', decrypted);

