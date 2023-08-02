import { Web3Storage, File } from 'web3.storage/dist/bundle.esm.min.js';
import { Buffer } from 'buffer';
export async function pinJSONToIPFS(JSONBody) {
  const client = new Web3Storage({ token:process.env.REACT_APP_WEB3_TOKEN});
  const buffer = Buffer.from(JSON.stringify(JSONBody));
  const file = [new File([buffer], 'metadata.json')];
  try {
    const rootCidOfMetadata = await client.put(file);
    return {
      success: true,
      metadata: rootCidOfMetadata
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    }
  }
}
