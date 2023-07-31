import { useState } from 'react';
import { pinFolderToIPFS } from '../helpers/pinFolderToIPFS';
import { pinJSONToIPFS } from '../helpers/pinJSONToIPFS';
import BrandSwap from '../contracts/BrandSwap.json';
import { useContractWrite } from 'wagmi';

const useMintSubmit = (BrandSwapAddress, account) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const {data, write} = useContractWrite({
    address: BrandSwapAddress,
    abi: BrandSwap.abi,
    functionName: 'nftMint',
    account: account,
  });

  const validateForm = (jsonInput, setErrors) => {
    let isValid = true;
    let newErrors = {};
    for (const key in jsonInput) {}
    setErrors(newErrors);
    return isValid;
  };

  const saveToIPFS = async (selectedFile, jsonInput) => {
    const folderRes = await pinFolderToIPFS(selectedFile);
    if (folderRes.success) {
      const newJsonInput = {
        ...jsonInput,
        image: `ipfs://${ folderRes.files[0].cid }`,
      };
      const arr = folderRes.files.map((file) => `ipfs://${ file.cid }`);
      const addSubImage = {...newJsonInput, imageList: arr};
      return await pinJSONToIPFS(addSubImage);
    }
  };

  const executeMint = async (e, selectedFile, jsonInput) => {
    e.preventDefault();
    if (validateForm(jsonInput, setErrors)) {
      setLoading(true);
      const jsonRes = await saveToIPFS(selectedFile, jsonInput);
      if (jsonRes.success) {
        write?.({
          args: [`${ jsonRes.metadata }/metadata.json`],
        });
      }
    }
  };
  return {executeMint, loading, errors};
}

  export default useMintSubmit;