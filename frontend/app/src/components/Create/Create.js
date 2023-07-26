import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import { pinFolderToIPFS } from '../../helpers/pinata/pinFolderToIPFS';
import { pinJSONToIPFS } from '../../helpers/pinata/pinJSONToIPFS';
import { ethers } from 'ethers';
import BrandSwap from '../../contracts/BrandSwap.json';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../atoms/WalletAddressAtom';
import axios from 'axios';
import { WatchForm, JewelryForm, MaterialForm } from './CategoryForm';
// import { configureChains, mainnet } from 'wagmi';


const Create = () => {
  // console.log(configureChains);
  // configureChains([mainnet]);
  const BrandSwapAddress = process.env.REACT_APP_BRANDSWAP_ADDRESS;
  const address = useRecoilValue(walletAddressAtom);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState('');
  const [jsonInput, setJsonInput] = useState({
    name: '',
    description: '',
    image: '',
    imageList: [],
    category: '',
    brand: '',
    color: '',
    material: '',
    size: '',
    accessories: '',
    SKU: '',
    note: '',
    option: {},
  });
  const [watchFormInput, setWatchFormInput] = useState({
    movement: '',
    gender: '',
    features: '',
    edition: '',
    waterproof: '',
    serialNumber: '',
    state: '',
  });
  const [jewelryFormInput, setJewelryFormInput] = useState({
    gender: '',
    state: '',
    weight: '',
  });
  const [materialFormInput, setMaterialFormInput] = useState({
    weight: '',
    serialNumber: '',
  });
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'sku') {
      if (!skuCheck(value)) {
        setErrors({...errors, sku: 'SKUはすでに登録されています。'});
      }
    }
    setJsonInput(prevState => ({...prevState, [name]: value}));
  };

  const skuCheck = async (sku) => {
    // todo APIを通してユニーク確認
    return true;
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    switch (value) {
      case 'Watch':
        setJsonInput({...jsonInput, option: watchFormInput});
        break;
      case 'Jewelry':
        setJsonInput({...jsonInput, option: jewelryFormInput});
        break;
      case 'Material':
        setJsonInput({...jsonInput, option: materialFormInput});
        break;
      default:
        console.log('default');
        break;
    }
    updateFormInput(jsonInput, setJsonInput, 'category', value);
  }

  const handleWatchFormChange = (e) => {
    const {name, value} = e.target;
    updateFormInput(watchFormInput, setWatchFormInput, name, value);
    setJsonInput({...jsonInput,  option:watchFormInput});
  }

  const handleJewelryForm = (e) => {
    const {name, value} = e.target;
    updateFormInput(jewelryFormInput, setJewelryFormInput, name, value);
    setJsonInput({...jsonInput,  option:jewelryFormInput});
  }

  const handleMaterialFormChange = (e) => {
    const {name, value} = e.target;
    updateFormInput(materialFormInput, setMaterialFormInput, name, value);
    setJsonInput({...jsonInput,  option:materialFormInput});
  }

  const updateFormInput = (formInput, setFormInput, name, value) => {
    if (name in formInput) {
      setFormInput(prevState => ({...prevState, [name]: value}));
    }
  }

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

        const {ethereum} = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const mintContract = new ethers.Contract(
            BrandSwapAddress,
            BrandSwap.abi,
            await signer,
        );

        const tx = await mintContract.nftMint(
            `${ jsonRes.metadata }/metadata.json`);
        const receipt = await tx.wait();

        const tokenId = receipt.events[0].args.tokenId.toString(); // トークンIDを取得

        // DBに保存
        console.log({tokenId: tokenId, metadata: jsonRes.metadata});

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

        let tokenId = await mintContract.tokenOfOwnerByIndex(
            signer.getAddress(), i);
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
                                 htmlFor="inputGroupFile01">
                            Choose file
                          </label>
                        </div>
                      </div>
                      { errors.image && <p>{ errors.image }</p> }
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label htmlFor="itemName" className="mb-1">
                          Item name
                          <span className="text-danger">*</span></label>
                        <input type="text"
                               id="itemName"
                               className="form-control "
                               name="itemName"
                               placeholder="Somthing item name"
                               onChange={ handleChange }/>
                        { errors.itemName && <span>{ errors.itemName }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="description"
                               className="mb-1">Description<span
                            className="text-danger">*</span></label>
                        <textarea id="description"
                                  className="form-control"
                                  name="description"
                                  placeholder="Description"
                                  cols="30"
                                  rows="3"
                                  defaultValue=""
                                  onChange={ handleChange }/>
                        { errors.description &&
                            <span>{ errors.description }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="sku" className="mb-1">SKU<span
                            className="text-danger">*</span></label>
                        <input type="text"
                               id="sku"
                               className="form-control"
                               name="sku"
                               placeholder="SKU"
                               onChange={ handleChange }
                        />
                        { errors.sku && <span>{ errors.sku }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="color" className="mb-1">Color<span
                            className="text-danger">*</span></label>
                        <input id="color"
                               type="text"
                               className="form-control"
                               name="color"
                               placeholder="red, blue, green"
                               onChange={ handleChange }
                        />
                        { errors.color && <span>{ errors.color }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="Material" className="mb-1">Material<span
                            className="text-danger">*</span></label>
                        <input id="Material"
                               type="text"
                               className="form-control"
                               name="material"
                               placeholder="silver, gold, diamond"
                               onChange={ handleChange }
                        />
                        { errors.material && <span>{ errors.material }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="size" className="mb-1">Size<span
                            className="text-danger">*</span></label>
                        <input type="text"
                               className="form-control"
                               name="size"
                               placeholder="Item Size"
                               onChange={ handleChange }/>
                        { errors.size && <span>{ errors.size }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="category" className="mb-1">Category<span
                            className="text-danger">*</span></label>
                        <select id="category"
                                className="form-select"
                                name="category"
                                onChange={ handleCategoryChange }>
                          <option value="">Select Category</option>
                          <option value="Watch">Watch</option>
                          <option value="Jewelry">Jewelry</option>
                          <option value="Material">Material</option>
                        </select>
                        { errors.category && <span>{ errors.category }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="note" className="mb-1">Note</label>
                        <textarea id="note"
                                  className="form-control"
                                  name="note"
                                  placeholder="note"
                                  cols="30"
                                  rows="3"
                                  defaultValue=""
                                  onChange={ handleChange }/>
                        { errors.note && <span>{ errors.note }</span> }
                      </div>
                    </div>
                    { category === 'Watch' &&
                        <WatchForm handleChange={ handleWatchFormChange }
                                   errors={ errors }/> }
                    { category === 'Jewelry' &&
                        <JewelryForm handleChange={ handleJewelryForm }
                                     errors={ errors }/> }
                    { category === 'Material' &&
                        <MaterialForm handleChange={ handleMaterialFormChange }
                                      errors={ errors }/> }

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
      </>
  );
};

export default Create;