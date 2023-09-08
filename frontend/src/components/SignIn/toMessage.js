export const toMessage = ({
  domain,
  address,
  uri,
  version,
  chainId = '1',
  nonce = generateNonce(),
  issuedAt = new Date().toISOString(),
  expirationTime,
  notBefore,
  requestId,
  resources,
  statement,
}) => {
  const header = `${domain} wants you to sign in with your Ethereum account:`;
  const uriField = `URI: ${uri}`;
  let prefix = [header, address].join('\n');
  const versionField = `Version: ${version}`;
  const chainField = `Chain ID: ${chainId}`;
  const nonceField = `Nonce: ${nonce}`;

  const suffixArray = [uriField, versionField, chainField, nonceField, `Issued At: ${issuedAt}`];

  if (expirationTime) {
    suffixArray.push(`Expiration Time: ${expirationTime}`);
  }

  if (notBefore) {
    suffixArray.push(`Not Before: ${notBefore}`);
  }

  if (requestId) {
    suffixArray.push(`Request ID: ${requestId}`);
  }

  if (resources) {
    suffixArray.push(`Resources:`, ...resources.map(x => `- ${x}`));
  }

  const suffix = suffixArray.join('\n');
  prefix = [prefix, statement].join('\n\n');
  if (statement) {
    prefix += '\n';
  }
  return [prefix, suffix].join('\n');
};

const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateNonce = () => {
  const nonce = randomStringForEntropy(96);
  if (!nonce || nonce.length < 8) {
    throw new Error('Error during nonce creation.');
  }
  return nonce;
};

 function randomStringForEntropy(
    bits,
    charset = ALPHANUMERIC,
    prng = Math.random
) {
  const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
  return Array.from({length},
      () => charset[Math.floor(prng() * charset.length)]).join('');
}