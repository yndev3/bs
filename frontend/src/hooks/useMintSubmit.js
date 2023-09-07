import { useEffect, useState } from 'react';
import { pinFolderToIPFS } from '../helpers/pinFolderToIPFS';
import { pinJSONToIPFS } from '../helpers/pinJSONToIPFS';
import BrandSwap from '../contracts/BrandSwap.json';
import { useContractWrite } from 'wagmi';

const useMintSubmit = (BrandSwapAddress, account) => {

  const [errors, setErrors] = useState({});

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
    if (!folderRes.success) {
      throw new Error(folderRes.message);
    }
    const newJsonInput = {
      ...jsonInput,
      image: `ipfs://${ folderRes.files[0].cid }`,
    };
    const arr = folderRes.files.map((file) => `ipfs://${ file.cid }`);
    return {...newJsonInput, imageList: arr};
  };

  const executeMint = async (e, selectedFile, jsonInput) => {
    e.preventDefault();
    if (validateForm(jsonInput, setErrors)) {
      const addSubImage = await saveToIPFS(selectedFile, jsonInput);
      const jsonRes =  await pinJSONToIPFS(addSubImage);
      if (!jsonRes.success) {
        throw new Error(jsonRes.message);
      }
      write?.({
        args: [`${ jsonRes.metadata }/metadata.json`],
      });
    }
  };
  return {executeMint, data, errors};
}

  export default useMintSubmit;