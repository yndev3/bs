import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

export async function pinFolderToIPFS(selectedFiles) {
  const client = new Web3Storage({ token:process.env.REACT_APP_WEB3_TOKEN});
  try {
    const rootCid = await client.put(selectedFiles);
    const res = await client.get(rootCid); // Web3Response
    const files = await res.files(); // Web3File[]
    return {
      success: true,
      files: files,
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    }
  }
}
