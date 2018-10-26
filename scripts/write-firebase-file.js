const fs = require('fs');
const path = require('path');
let { BRANCH } = process.env;

if (!BRANCH) {
  console.log('No branch setup');
  return;
}

BRANCH = BRANCH || 'default';
const config = process.env[`FIREBASE_JSON_${BRANCH}`];

console.log(`Writting file for ${BRANCH}`);
console.log({ config });

fs.writeFileSync(path.resolve(__dirname, '../src/firebase-cred.json'), config);

