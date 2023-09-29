import { useState } from 'react';
import { pinFolderToIPFS } from '../helpers/pinFolderToIPFS';
import { pinJSONToIPFS } from '../helpers/pinJSONToIPFS';
import { useAccount, useContractWrite } from 'wagmi';
import {
    BRAND_SWAP_ABI,
    BRAND_SWAP_CONTRACT,
} from '../helpers/constants';
import { useFetchFromApi } from './fetchFromApi.jsx';

const useMintSubmit = () => {
    const [state, setState] = useState({});
    const {address} = useAccount();
    const {data, writeAsync} = useContractWrite({
        address: BRAND_SWAP_CONTRACT,
        abi: BRAND_SWAP_ABI,
        functionName: 'nftMint',
        account: address,
    });


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

    const executeMint = async (selectedFile, jsonInput) => {
        try {
            setState({message: 'Loading...', progress: 0});
            setState({message: 'Uploading Images to IPFS', progress: 25});
            const addSubImage = await saveToIPFS(selectedFile, jsonInput);
            setState({message: 'Uploading Metadata to IPFS', progress: 50});
            const jsonRes = await pinJSONToIPFS(addSubImage);
            if (!jsonRes.success) {
                throw new Error(jsonRes.message);
            }
            setState({message: 'Minting NFT', progress: 75});
            const result = await writeAsync?.({
                args: [`${ jsonRes.metadata }/metadata.json`],
            });
            setState({message: 'Minted NFT', progress: 100});
        } catch (error) {
            throw new Error(error.message);
        }
    };
    return {executeMint, data, state};
};

export default useMintSubmit;