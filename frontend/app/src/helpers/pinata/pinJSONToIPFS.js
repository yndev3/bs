import axios from 'axios';

const JWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

export default function pinJSONToIPFS(JSONBody) {
  const JSONBody_ = JSON.stringify({
    "pinataMetadata": {
      "name": Date.now() +'_'+ "MyCustomName",//todo jsonのファイル名はNFT_tokenIDにする
    },
    "pinataContent": {
      JSONBody
    }
  });
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios.post(url, JSONBody, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': JWT
    },
  }).then(function(response) {
    return {
      success: true,
      IpfsHash: response.data.IpfsHash,
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
