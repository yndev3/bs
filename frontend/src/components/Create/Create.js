import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import BrandSwap from '../../contracts/BrandSwap.json';
import { WatchForm, JewelryForm, MaterialForm } from './CategoryForm';
import useMintSubmit  from '../../hooks/useMintSubmit';
import { useAccount, useContractEvent } from 'wagmi';
const Create = () => {
  const BrandSwapAddress = process.env.REACT_APP_BRANDSWAP_ADDRESS;
  useContractEvent({
    address: BrandSwapAddress,
    abi: BrandSwap.abi,
    eventName: 'nftMinted',
    listener(log) {
      console.log(log)
    },
  })
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
  const {address, isConnected} = useAccount();
  const { executeMint, loading, errors }  = useMintSubmit(BrandSwapAddress, address);

  // 任意のフォームの入力値を更新する
  const updateFormInput = (formInput, setFormInput, name, value) => {
    if (name in formInput) {
      setFormInput(prevState => ({...prevState, [name]: value}));
    }
  };
  const updateJsonInputOption = (option, setJsonInput) => {
    console.log(option);
    setJsonInput(prevJsonInput => ({...prevJsonInput, option: option}));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'sku' && !skuCheck(value)) {
      setValidationErrors({...validationErrors, sku: 'SKU already registered.'});
    }
    updateFormInput(jsonInput, setJsonInput, name, value);
  };

  const skuCheck = async (sku) => {
    // todo APIを通してユニーク確認
    return true;
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    let option;
    switch (value) {
      case 'Watch':
        option = watchFormInput;
        break;
      case 'Jewelry':
        option = jewelryFormInput;
        break;
      case 'Material':
        option = materialFormInput;
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

  const handleSubmit = async (e, selectedFile, jsonInput) => {
    await executeMint(e, selectedFile, jsonInput);
  }

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
                      onSubmit={(e) => isConnected && handleSubmit(e, selectedFile, jsonInput)}>
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