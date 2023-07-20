import bcrypt from "bcrypt";

async function encrypt(payload: string) {
  return await bcrypt.hash(payload, await bcrypt.genSalt());
}

async function decrypt(dbHash: string, providedHash: string) {
  return await bcrypt.compare(dbHash, providedHash);
}

export default { encrypt, decrypt };
