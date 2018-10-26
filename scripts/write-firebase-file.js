const fs = require('fs');
const path = require('path');
const { BRANCH } = process.env;

if (!BRANCH) {
  console.log('No branch setup');
  return;
}

const config = process.env[`FIREBASE_JSON_${BRANCH}`] || process.env.FIREBASE_JSON_DEFAULT;

console.log(`Writting file for ${BRANCH}`);
console.log({ config });

fs.writeFileSync(path.resolve(__dirname, '../src/firebase-cred.json'), config);

