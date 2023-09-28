import { useState } from 'react';
import { pinFolderToIPFS } from '../helpers/pinFolderToIPFS';
import { pinJSONToIPFS } from '../helpers/pinJSONToIPFS';
import BrandSwap from '../contracts/BrandSwap.json';
import { useContractWrite } from 'wagmi';

const useMintSubmit = (BrandSwapAddress, account) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  const {data, writeAsync} = useContractWrite({
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
    try {
      e.preventDefault();
      setState({message:'Loading...', progress: 0});
      if (validateForm(jsonInput, setErrors)) {
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
      setErrors({message: error.message});
    }

  };
  return {executeMint, data, errors, state};
}

  export default useMintSubmit;