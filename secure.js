import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTED_FILE = path.join(process.cwd(), 'backend/.env.enc');
const DECRYPTED_FILE = path.join(process.cwd(), 'backend/.env');
const SALT = 'CMSC128-A12L-NUMBER1-GGEZ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function run() {
  const action = process.argv[2]; // "encrypt" or "decrypt"

  if (action !== 'encrypt' && action !== 'decrypt') {
    console.error("Error: as a member please type 'npm run unlock'");
    process.exit(1);
  }

  // Cconfirmation if encrypting
  if (action === 'encrypt') {
    console.log('\nDO NOT EDIT! For PM only.');
    const confirm = await ask(
      'You are about to overwrite an existing password/vault and this command is for PM or authorized users only? Heavy consequences are applied if a member is found guilty of abusing this, are you sure? (y/n): ',
    );

    if (confirm.toLowerCase() !== 'y') {
      console.log('Operation cancelled by user.');
      process.exit(0);
    }
  }

  // 2. Ask for Name and Password
  const userName = await ask('Enter your name/alias for the audit log: ');
  const password = await ask(`Enter master password to ${action}: `);
  rl.close();

  // Derive a 32-byte key from the password
  const key = crypto.scryptSync(password, SALT, 32);
  const iv = Buffer.alloc(16, 0); // Initialization vector

  try {
    if (action === 'encrypt') {
      if (!fs.existsSync(DECRYPTED_FILE)) {
        throw new Error('.env file not found in backend folder.');
      }

      const input = fs.readFileSync(DECRYPTED_FILE);
      const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
      const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

      fs.writeFileSync(ENCRYPTED_FILE, encrypted);

      console.log('\nSuccess! .env has been encrypted to .env.enc');
      console.log('Push .env.enc and vault-audit.log to GitHub to update keys.');
    } else if (action === 'decrypt') {
      if (!fs.existsSync(ENCRYPTED_FILE)) {
        throw new Error('.env.enc file not found! Pull from GitHub first.');
      }

      const input = fs.readFileSync(ENCRYPTED_FILE);
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      const decrypted = Buffer.concat([decipher.update(input), decipher.final()]);

      fs.writeFileSync(DECRYPTED_FILE, decrypted);

      console.log('\nSuccess! .env.enc has been decrypted to .env');
    }
  } catch (error) {
    console.error('\nOperation failed:', error.message);
    if (error.code === 'ERR_OSSL_EVP_BAD_DECRYPT') {
      console.error('Result: Wrong password.');
    }
  }
}

run();
