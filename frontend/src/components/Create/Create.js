import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import BrandSwap from '../../contracts/BrandSwap.json';
import { WatchForm, JewelryForm, MaterialForm } from './CategoryForm';
import useMintSubmit from '../../hooks/useMintSubmit';
import { useAccount, useContractEvent } from 'wagmi';
import axios  from 'axios';
import _ from 'lodash';

const initialJsonInput = {
  name: '',
  description: '',
  image: '',
  imageList: [],
  category: '',
  color: '',
  material: '',
  size: '',
  accessories: '',
  sku: '',
  note: '',
  option: {},
}
const initialWatchFormInput = {
  brand: '',
  movement: '',
  gender: '',
  features: '',
  edition: '',
  waterproof: '',
  serialNumber: '',
  state: '',
}
const initialJewelryFormInput = {
  brand: '',
  gender: '',
  state: '',
  weight: '',
}
const initialMaterialFormInput = {
  brand: '',
  weight: '',
  serialNumber: '',
}

const Create = () => {
  const BrandSwapAddress = process.env.REACT_APP_BRANDSWAP_ADDRESS;
  const {address, isConnected} = useAccount();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  useContractEvent({
    address: BrandSwapAddress,
    abi: BrandSwap.abi,
    eventName: 'nftMinted',
    listener(log) {
      const {uri, tokenId, sender} = log[0].args;
      axios.post('http://localhost/api/creat-item', {uri: uri, tokenId: tokenId.toString()})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error sending data:', error); // エラーハンドリング
      });
      setLoading(false);
    },
  });
  const {executeMint} = useMintSubmit(BrandSwapAddress, address);
  const [jsonInput, setJsonInput] = useState(initialJsonInput);
  const [watchFormInput, setWatchFormInput] = useState(initialWatchFormInput);
  const [jewelryFormInput, setJewelryFormInput] = useState(initialJewelryFormInput);
  const [materialFormInput, setMaterialFormInput] = useState(initialMaterialFormInput);
  const [optionInput, setOptionInput] = useState({});
  const [category, setCategory] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // 任意のフォームの入力値を更新する
  const updateFormInput = (formInput, setFormInput, name, value) => {
    if (name in formInput) {
      setFormInput(prevState => ({...prevState, [name]: value}));
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'sku') {
      debounceSkuCheck(value);
    }
    updateFormInput(jsonInput, setJsonInput, name, value);
  };

  const debounceSkuCheck = _.debounce(async (sku) => {
    if (await skuCheck(sku)) {
      setValidationErrors(
          {...validationErrors, sku: 'SKU already registered.'});
    }
  }, 1000); // 1sec の遅延

  const skuCheck = async (sku) => {
    const response = await axios.post('http://localhost/api/exists-sku', {sku: sku});
    console.log(response.data.exists);
    return response.data.exists;
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    let option;
    switch (value) {
      case 'Watch':
        option = watchFormInput;
        setJewelryFormInput(initialJewelryFormInput);
        setMaterialFormInput(initialMaterialFormInput);
        break;
      case 'Jewelry':
        option = jewelryFormInput;
        setWatchFormInput(initialWatchFormInput);
        setMaterialFormInput(initialMaterialFormInput);
        break;
      case 'Material':
        option = materialFormInput;
        setWatchFormInput(initialWatchFormInput);
        setJewelryFormInput(initialJewelryFormInput);
        break;
      default:
        console.log('default');
        break;
    }
    updateFormInput(jsonInput, setJsonInput, 'category', value);
    setOptionInput(option);
  };

  const handleSpecificFormChange = (e, optionFormInput) => {
    const {name, value} = e.target;
    setOptionInput(prevState => ({...prevState, [name]: value}));
  };

  const handleWatchFormChange = (e) => handleSpecificFormChange(e,
      watchFormInput);
  const handleJewelryFormChange = (e) => handleSpecificFormChange(e,
      jewelryFormInput);
  const handleMaterialFormChange = (e) => handleSpecificFormChange(e,
      materialFormInput);

  const handleSubmit = async (e, selectedFile, jsonInput) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect to wallet.');
    } else {
      try {
        setLoading(true);
        const mergedJsonInput = {...jsonInput, option: optionInput};
        await executeMint(e, selectedFile, mergedJsonInput);
      } catch (error) {
        alert(error.message);
      } finally {
        setJsonInput(initialJsonInput);
        setWatchFormInput(initialWatchFormInput);
        setJewelryFormInput(initialJewelryFormInput);
        setMaterialFormInput(initialMaterialFormInput);
        setOptionInput({});
        setCategory('');
        setSelectedFile('');
        setValidationErrors({});
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
                      onSubmit={ (e) =>
                          handleSubmit(e, selectedFile, jsonInput) }>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input"
                                 id="inputGroupFile01"
                                 name="image"
                                 multiple={ true }
                                 onChange={ (e) => setSelectedFile(
                                     e.target.files) }/>
                          <label className="custom-file-label"
                                 htmlFor="inputGroupFile01">
                            Choose file
                          </label>
                        </div>
                      </div>
                      { validationErrors.image &&
                          <p>{ validationErrors.image }</p> }
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label htmlFor="itemName" className="mb-1">
                          Item name
                          <span className="text-danger">*</span></label>
                        <input type="text"
                               id="itemName"
                               className="form-control "
                               name="name"
                               placeholder="Somthing item name"
                               onChange={ handleChange }/>
                        { validationErrors.name &&
                            <span>{ validationErrors.name }</span> }
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
                        { validationErrors.description &&
                            <span>{ validationErrors.description }</span> }
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
                               placeholder="xxxx-xxxx-xxxx"
                               onChange={ handleChange }
                        />
                        { validationErrors.sku &&
                            <span>{ validationErrors.sku }</span> }
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
                        { validationErrors.color &&
                            <span>{ validationErrors.color }</span> }
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
                        { validationErrors.material &&
                            <span>{ validationErrors.material }</span> }
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
                        { validationErrors.size &&
                            <span>{ validationErrors.size }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="accessories" className="mb-1">Accessories
                          <span className="text-danger">*</span>
                        </label>
                        <input id="accessories"
                               type="text"
                               className="form-control"
                               name="accessories"
                               placeholder="Item Accessories"
                               onChange={ handleChange }/>
                        { validationErrors.accessories &&
                            <span>{ validationErrors.accessories }</span> }
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
                        { validationErrors.category &&
                            <span>{ validationErrors.category }</span> }
                      </div>
                    </div>
                    { category === 'Watch' &&
                        <WatchForm handleChange={ handleWatchFormChange }
                                   errors={ validationErrors }/> }
                    { category === 'Jewelry' &&
                        <JewelryForm handleChange={ handleJewelryFormChange }
                                     errors={ validationErrors }/> }
                    { category === 'Material' &&
                        <MaterialForm handleChange={ handleMaterialFormChange }
                                      errors={ validationErrors }/> }
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
                        { validationErrors.note &&
                            <span>{ validationErrors.note }</span> }
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
      </>
  );
};

export default Create;