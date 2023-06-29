import { Web3Storage, File } from 'web3.storage/dist/bundle.esm.min.js';

export async function pinJSONToIPFS(JSONBody) {
  const client = new Web3Storage({ token:process.env.REACT_APP_WEB3_TOKEN});
  const buffer = Buffer.from(JSON.stringify(JSONBody));
  const file = [new File([buffer], 'metadata.json')];
  console.log(file);
  try {
    const rootCidOfMetadata = await client.put(file);
    return {
      success: true,
      metadata: rootCidOfMetadata
    }
  } catch (err) {
    return err;
  }
}
