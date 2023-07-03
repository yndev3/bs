import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import { pinFolderToIPFS } from '../../helpers/pinata/pinFolderToIPFS';
import {
  pinJSONToIPFS,
} from '../../helpers/pinata/pinJSONToIPFS';
import { ethers } from 'ethers';
import BrandSwap from '../../contracts/BrandSwap.json';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../atoms/WalletAddressAtom';
import axios from 'axios';

export default function Create() {
  const BrandSwapAddress = '0x68350e6bC48E43E76e9b692a7Ae82e6b37d656cE';
  const address = '0x8cbCD52AA99322ccfab2cf525aDF3065a74983b5';
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [jsonInput, setJsonInput] = useState({
    name: '',
    description: '',
    image: '',
    imageList: [],
    options: {
      category: 'Watches',
      brand: 'Tiffany&Co',
      weight: '',
      color: '',
      material: '',
      size: '',
      accessories: '',
      price: '',
      SKU: '',
      state: 'N',
      Note: '',
    },
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setJsonInput({...jsonInput, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // todo バリデーション
    // if (validateForm()) {
    setLoading(true);
    try {
      const folderRes = await pinFolderToIPFS(selectedFile);
      if (folderRes.success) {
        const newJsonInput = {
          ...jsonInput,
          image: `ipfs://${ folderRes.files[0].cid }`,
        };

        const arr = folderRes.files.map((file) => `ipfs://${ file.cid }`);
        const addSubImage = {...newJsonInput, imageList: arr};
        const jsonRes = await pinJSONToIPFS(addSubImage);

        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const mintContract = new ethers.Contract(
            BrandSwapAddress,
            BrandSwap.abi,
            await signer,
        );

        const tx = await mintContract.nftMint(`${ jsonRes.metadata }/metadata.json`);
        const receipt = await tx.wait();

        const tokenId = receipt.events[0].args.tokenId.toString(); // トークンIDを取得

        // DBに保存
        console.log({tokenId:tokenId, metadata:jsonRes.metadata});

        const balance = await mintContract.balanceOf(signer.getAddress());
        console.log(`nftBalance: ${ balance.toNumber() }`);
      }
    } catch (err) {
      console.log(err.message);
      setErrors({submit: err.message});
    } finally {
      setLoading(false);
    }
    // }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    for (const key in jsonInput) {
      if (key !== 'itemsState' && !jsonInput[key].trim()) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const checkNft = async () => {
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mintContract = new ethers.Contract(
        BrandSwapAddress,
        BrandSwap.abi,
        await signer,
    );
    const balance = await mintContract.balanceOf(signer.getAddress());
    console.log(`nftBalance: ${ balance }`);
    const totalSupply = await mintContract.totalSupply();
    console.log(`totalSupply: ${ totalSupply }`);

    if (balance.toNumber() > 0) {
      for (let i = 0; i < balance.toNumber(); i++) {

        let tokenId = await mintContract.tokenOfOwnerByIndex(signer.getAddress(), i);
        let tokenURI = await mintContract.tokenURI(tokenId);
        tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const meta = await axios.get(tokenURI);

        let name = meta.data.name;
        let description = meta.data.description;
        let imageURI = meta.data.image?.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/',
        );

        let item = {
          tokenId,
          name,
          description,
          tokenURI,
          imageURI,
        };

        console.log(item);
      }
    }
  };

  return (
      <>
        <section className="author-area">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12 col-md-4">
                {/* Author Profile */ }
                <AuthorProfile/>
              </div>
              <div className="col-12 col-md-7">
                {/* Intro */ }
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div className="intro-content">
                    <span>Get Started</span>
                    <h3 className="mt-3 mb-0">Create Item</h3>
                  </div>
                </div>
                {/* Item Form */ }
                <form className="item-form card no-hover"
                      onSubmit={ handleSubmit }>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input"
                                 id="inputGroupFile01"
                                 multiple={ true }
                                 onChange={ (e) => setSelectedFile(
                                     e.target.files) }/>
                          <label className="custom-file-label"
                                 htmlFor="inputGroupFile01">Choose file
                          </label>
                        </div>
                      </div>
                      { errors.image && <p>{ errors.image }</p> }
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input type="text" className="form-control"
                               name="itemName"
                               placeholder="Item Name"
                               onChange={ handleChange }
                        />
                        { errors.itemName && <p>{ errors.itemName }</p> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                      <textarea className="form-control" name="description"
                                placeholder="Description" cols={ 30 } rows={ 3 }
                                defaultValue={ '' }
                                onChange={ handleChange }
                      />
                        { errors.description && <p>{ errors.description }</p> }
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input type="number" className="form-control"
                               name="price"
                               placeholder="Item Price"
                               onChange={ handleChange }/>
                        { errors.price && <p>{ errors.price }</p> }
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                        {
                          loading
                              ? <div className="spinner-border"
                                     role="status"></div>
                              : 'Create Item'
                        }
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <button onClick={ checkNft }>btn</button>
      </>
  );
}