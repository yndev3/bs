import axios from 'axios';

const JWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;
console.log(JWT);
export async function pinFolderToIPFS(itemName, selectedFiles) {
  const formData = new FormData();
  Array.from(selectedFiles).forEach((file) => {
    formData.append("file", file);
  })

  const metadata = JSON.stringify({
    name: Date.now() +'_'+ itemName,
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options);


  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata
  return axios.post(url, formData, {
    maxBodyLength: "Infinity",
    headers: {
      'Content-Type': `multipart/form-data;`,
      Authorization: JWT,
    },
  }).then(function(response) {
    return {
      success: true,
      hash: response.data.IpfsHash,
      pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
    };
  }).catch(function(error) {
    return {
      success: false,
      message: error.message,
    };
  });
}
