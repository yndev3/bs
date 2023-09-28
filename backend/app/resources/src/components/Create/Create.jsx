import React, { useState } from 'react';
import { WatchForm, JewelryForm, MaterialForm } from './CategoryForm';
import useMintSubmit from '../../hooks/useMintSubmit';
import { useAccount, useContractEvent } from 'wagmi';
import _ from 'lodash';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {
  BRAND_SWAP_ABI,
  BRAND_SWAP_CONTRACT,
} from '../../helpers/constants';
import { LinearProgress } from '@mui/material';
import { useFetchFromApi } from '../../hooks/fetchFromApi.jsx';
import { logErrorToBackend }  from '../../utils/logErrorToBackend';
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
};
const initialWatchFormInput = {
  brand: '',
  movement: '',
  gender: '',
  features: '',
  edition: '',
  waterproof: '',
  serialNumber: '',
  state: '',
};
const initialJewelryFormInput = {
  brand: '',
  gender: '',
  state: '',
  weight: '',
};
const initialMaterialFormInput = {
  brand: '',
  weight: '',
  serialNumber: '',
};

const Create = () => {
  const {fetchFromApi} = useFetchFromApi();
  const [success, setSuccess] = useState(false);
  const [error, setError ] = useState(false);
  const {address, isConnected} = useAccount();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  useContractEvent({
    address: BRAND_SWAP_CONTRACT,
    abi: BRAND_SWAP_ABI,
    eventName: 'nftMinted',
    listener(log) {
      const {uri, tokenId, sender} = log[0].args;
      fetchFromApi({
        endpoint: '/api/admin/item',
        method: 'POST',
        data: {
          uri: uri,
          tokenId: tokenId.toString(),
          owner: sender,
        }
      }).then(function(response) {
        console.log(response);
        setSuccess(true);
      }).catch(function(error) {
        console.error('Error sending data:', error); // エラーハンドリング
        setError(true);
      }).finally(function() {
        setLoading(false);
      });
    },
  });
  const [validationErrors, setValidationErrors] = useState({});
  const {executeMint, state, errors:mintingErrors} = useMintSubmit(
      validationErrors,
      setValidationErrors
  );
  const [jsonInput, setJsonInput] = useState(initialJsonInput);
  const [watchFormInput, setWatchFormInput] = useState(initialWatchFormInput);
  const [jewelryFormInput, setJewelryFormInput] = useState(
      initialJewelryFormInput);
  const [materialFormInput, setMaterialFormInput] = useState(
      initialMaterialFormInput);
  const [optionInput, setOptionInput] = useState({});
  const [category, setCategory] = useState('');


  // 任意のフォームの入力値を更新する
  const updateFormInput = (formInput, setFormInput, name, value) => {
    if (name in formInput) {
      setFormInput(prevState => ({...prevState, [name]: value}));
    }
  };

  const handleChange = (e) => {
    setSuccess(false);
    const {name, value} = e.target;
    if (name === 'sku' && value.length > 3) {
      debounceSkuCheck(value);
    }
    updateFormInput(jsonInput, setJsonInput, name, value);
  };

  const debounceSkuCheck = _.debounce(async (sku) => {
    try {
      if (await skuCheck(sku)) {
        setValidationErrors(
            {...validationErrors, sku: 'SKU already registered.'});
        console.log(validationErrors);
      } else {
        const {sku: _, ...rest} = validationErrors; // Remove SKU error if exists
        console.log(validationErrors);
        setValidationErrors(rest);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      console.error('SKU Check failed.');
      // エラーハンドリングの追加処理をここに
    }
  }, 2000);// 3sec の遅延

  const skuCheck = async (sku) => {
    const response = await fetchFromApi({
      endpoint: '/api/admin/exists-sku',
      method: 'POST',
      data: {sku: sku},
    });
    return response.exists;
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
    }

    try {
      setLoading(true);
      const mergedJsonInput = {...jsonInput, option: optionInput};
      await executeMint(e, selectedFile, mergedJsonInput);
    } catch (error) {
     await logErrorToBackend(error);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setJsonInput(initialJsonInput);
    setWatchFormInput(initialWatchFormInput);
    setJewelryFormInput(initialJewelryFormInput);
    setMaterialFormInput(initialMaterialFormInput);
    setOptionInput({});
    setCategory('');
    setSelectedFile('');
    setValidationErrors({});
  };

  return (
      <>
        <section className="author-area admin-form">
          <div className="container">
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="col-12 col-md-8">
                <div className="intro-content">
                  <span>Dashboard</span>
                  <h3 className="mt-3 mb-0">Create Item</h3>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-12 col-md-8">
                {/* Item Form */ }
                <form className="item-form card no-hover needs-validation"
                      onSubmit={ (e) =>
                          handleSubmit(e, selectedFile, jsonInput) }>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-files">
                          <input
                              type="file"
                              id="inputGroupFile01"
                              multiple={ true }
                              onChange={ (e) => {
                                setSelectedFile(e.target.files);
                              } }
                              required={ true }
                          />
                          <label className="custom-file-label"
                                 htmlFor="inputGroupFile01">
                            Choose file<span
                              className="text-danger">*</span>
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
                               onChange={ handleChange }
                               required={ true }
                        />
                        { validationErrors.name &&
                            <span>{ validationErrors.name }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="description"
                               className="mb-1">Description<span className="text-danger">*</span>
                        </label>
                        <textarea id="description"
                                  className="form-control"
                                  name="description"
                                  placeholder="Description"
                                  cols="30"
                                  rows="3"
                                  defaultValue=""
                                  onChange={ handleChange }
                                  required={ true }
                        />
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
                               required={ true }
                        />
                        { validationErrors.sku &&
                            <span className="text-danger mt-2">{ validationErrors.sku }</span> }
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
                               required={ true }
                        />
                        { validationErrors.color &&
                            <span className="text-danger mt-2">{ validationErrors.color }</span> }
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
                               required={ true }
                        />
                        { validationErrors.material &&
                            <span className="text-danger mt-2">{ validationErrors.material }</span> }
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
                               onChange={ handleChange }
                               required={ true }
                        />
                        { validationErrors.size &&
                            <span className="text-danger mt-2">{ validationErrors.size }</span> }
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
                               onChange={ handleChange }
                               required={ true }
                        />
                        { validationErrors.accessories &&
                            <span className="text-danger mt-2">{ validationErrors.accessories }</span> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="category" className="mb-1">Category<span
                            className="text-danger">*</span></label>
                        <select id="category"
                                className="form-select"
                                name="category"
                                onChange={ handleCategoryChange }
                                required={ true }
                        >
                          <option value="">Select Category</option>
                          <option value="Watch">Watch</option>
                          <option value="Jewelry">Jewelry</option>
                          <option value="Material">Material</option>
                        </select>
                        { validationErrors.category &&
                            <span className="text-danger mt-2">{ validationErrors.category }</span> }
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
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                        {
                          loading
                              ? (
                                  <div>
                                    <div className="mb-2">
                                        <span className="spinner-border mr-2"
                                              role="status"></span>
                                      { state.message }
                                    </div>
                                    <LinearProgress variant="determinate"
                                                    value={ state.progress }/>
                                  </div>
                              )
                              : 'Create Item'
                        }
                      </button>
                      { success && <div className="alert alert-success mt-3 text-center">Completed!</div>}
                      { error && <div className="alert alert-danger mt-3 text-center">Something Error Occurred.</div>}
                    </div>
                  </div>
                </form>
              </div>
              {/* Item Image */ }
              <div className="col-12 col-md-4">
                <div className="card no-hover">
                  <div className="form-group">
                    <label htmlFor="size" className="mb-1">Preview<span
                        className="text-danger"> *</span></label>
                  </div>
                  <div id="image-preview" className="text-center">
                    {
                      selectedFile && selectedFile.length > 0 ? (
                          <Splide aria-label="itemImg">
                            { Array.from(selectedFile).map((image, key) => (
                                <SplideSlide key={ key }>
                                  <img src={ URL.createObjectURL(image) }
                                       alt={ `item_${ key }_image` }/>
                                </SplideSlide>
                            )) }
                          </Splide>
                      ) : <img src="../img/item_images.jpg"/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default Create;