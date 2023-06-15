import axios from 'axios';

const JWT =  process.env.REACT_APP_PINATA_JWT;
export async function pinFolderToIPFS(selectedFiles) {
  const formData = new FormData();
  Array.from(selectedFiles).forEach((file) => {
    formData.append("file", file);
  })

  const metadata = JSON.stringify({
    name: 'Folder name',
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 1,
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
    console.log(response.data);
    return {
      success: true,
      pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
    };
  }).catch(function(error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  });
}
