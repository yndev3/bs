import { useState } from 'react';
import { pinFolderToIPFS } from '../helpers/pinFolderToIPFS';
import { pinJSONToIPFS } from '../helpers/pinJSONToIPFS';
import BrandSwap from '../contracts/BrandSwap.json';
import { useAccount, useContractWrite } from 'wagmi';
import {
  BRAND_SWAP_ABI,
  BRAND_SWAP_CONTRACT,
} from '../helpers/constants';
const useMintSubmit = (validationErrors, setValidationErrors) => {
  const [state, setState] = useState({});
  const [errors, setMintError] = useState({});
  const {address} = useAccount();

  const {data, writeAsync} = useContractWrite({
    address: BRAND_SWAP_CONTRACT,
    abi: BRAND_SWAP_ABI,
    functionName: 'nftMint',
    account: address,
  });

  const validateForm = (jsonInput) => {
    let isValid = true;
    let newErrors = {};

    for (const key in jsonInput) {
      console.log(jsonInput[key]);
      if (jsonInput[key] === '') {
        newErrors[key] = `${key} is required`;
        isValid = false;
      }

      if (key === 'option') {
        newErrors[key] = newErrors[key] || {}; // 初期化しておく
        for (const optionKey in jsonInput[key]) {
          if (jsonInput[key][optionKey] === '') {
            newErrors[key][optionKey] = `${optionKey} is required`;
            isValid = false;
          }
        }
      }
    }

    // 既存のエラーに新しいエラーをマージ
    setValidationErrors(prevErrors => {
      return {
        ...prevErrors,
        ...newErrors,
        option: {
          ...(prevErrors.option || {}),
          ...(newErrors.option || {})
        }
      };
    });

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
    try {
      e.preventDefault();
      setState({message:'Loading...', progress: 0});
      if (validateForm(jsonInput)) {
        setState({message: 'Uploading Images to IPFS', progress: 25});
        const addSubImage = await saveToIPFS(selectedFile, jsonInput);
        setState({message: 'Uploading Metadata to IPFS', progress: 50});
        const jsonRes =  await pinJSONToIPFS(addSubImage);
        if (!jsonRes.success) {
          throw new Error(jsonRes.message);
        }
        setState({message: 'Minting NFT', progress: 75});
        const result = await writeAsync?.({
          args: [`${ jsonRes.metadata }/metadata.json`],
        });
        console.log(result);
        setState({message: 'Minted NFT', progress: 100});
      }
    } catch (error) {
      console.error(error);
      setMintError({message: error.message});
    }
  };
  return {executeMint, data, errors, state};
}

  export default useMintSubmit;