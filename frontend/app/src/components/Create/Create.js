import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import { pinFolderToIPFS } from '../../helpers/pinata/pinFolderToIPFS';
import {
  pinJSONToIPFS,
} from '../../helpers/pinata/pinJSONToIPFS';

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [jsonInput, setJsonInput] = useState({
    name: '',
    description: '',
    image: '',
    subImages: [],
    options: {
      category: '',
      brand: '',
      weight: '',
      color: '',
      material: '',
      size: '',
      accessories: '',
      price: '',
      SKU: '',
      itemsState: {
        isSale: false,
        pending: false,
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJsonInput({ ...jsonInput, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
      setLoading(true);
      try {
        const folderRes = await pinFolderToIPFS(selectedFile);
        if (folderRes.success) {
          const newJsonInput = { ...jsonInput, image: `ipfs://${folderRes.files.pop().cid}`}
          const arr  = folderRes.files.map((file) => `ipfs://${file.cid}`);
          const addSubImage = { ...newJsonInput, subImages : arr}
          // todo jsonのファイル名はNFT_tokenIDにする
        pinJSONToIPFS(addSubImage).then((res) => {
          // todo ミント実行
              console.log(res);
              return res;
            }
        ).catch(errors => console.log(errors));
          // if (jsonRes.success) {
          //
          //   console.log(jsonRes.result);
          // } else {
          //   throw new Error('Failed to pin JSON to IPFS');
          // }
        } else {
          throw new Error('Failed to pin folder to IPFS');
        }
      } catch (err) {
        console.log(err.message);
        setErrors({ submit: err.message });
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
                <form className="item-form card no-hover" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input"
                                 id="inputGroupFile01"
                                 multiple={true}
                                 onChange={ (e) => setSelectedFile(e.target.files) }/>
                          <label className="custom-file-label"
                                 htmlFor="inputGroupFile01">Choose file
                          </label>
                        </div>
                      </div>
                      { errors.image && <p>{ errors.image }</p> }
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input type="text" className="form-control" name="itemName"
                               placeholder="Item Name"
                               onChange={handleChange}
                        />
                        { errors.itemName && <p>{ errors.itemName }</p> }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                      <textarea className="form-control" name="description"
                                placeholder="Description" cols={ 30 } rows={ 3 }
                                defaultValue={ '' }
                                onChange={handleChange}
                      />
                        { errors.description && <p>{ errors.description }</p> }
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input type="number" className="form-control"
                               name="price"
                               placeholder="Item Price"
                               onChange={handleChange}/>
                        { errors.price && <p>{ errors.price }</p> }
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                        {
                          loading
                              ? <div className="spinner-border" role="status"></div>
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
}