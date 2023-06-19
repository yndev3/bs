import React, { useState } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import { pinFolderToIPFS } from '../../helpers/pinata/pinFolderToIPFS';

export default function Create() {
  // category
  // Brand
  // Weight (g)
  // color
  // material
  // Size
  // Accessories
  // Price
  // SKU
  // Items State

  const [selectedFile, setSelectedFile] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    // バリデーション
    // ローディング追加
    setLoading(true);
    await pinFolderToIPFS(itemName, selectedFile).then((result) => {
      console.log(result);
      result.success
          ? alert('success') // todo JSON作成
          : alert(result.message);
    }).finally(() => {
      setLoading(false);
    });




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
                <form className="item-form card no-hover">
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input"
                                 id="inputGroupFile01" directory=""
                                 webkitdirectory=""
                                 onChange={ (e) => setSelectedFile(
                                     e.target.files) }/>
                          <label className="custom-file-label"
                                 htmlFor="inputGroupFile01">Choose file</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input type="text" className="form-control" name="name"
                               placeholder="Item Name"
                               onChange={ (e) => setItemName(e.target.value) }/>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                      <textarea className="form-control" name="textarea"
                                placeholder="Description" cols={ 30 } rows={ 3 }
                                defaultValue={ '' }
                                onChange={ (e) => setDescription(
                                    e.target.value) }
                                required
                      />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input type="number" className="form-control"
                               name="price"
                               placeholder="Item Price"
                               onChange={ (e) => setAmount(e.target.value) }/>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio"
                                 name="inlineRadioOptions" id="inlineRadio1"
                                 defaultValue="option1" defaultChecked/>
                          <label className="form-check-label"
                                 htmlFor="inlineRadio1">Put on Sale</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio"
                                 name="inlineRadioOptions" id="inlineRadio2"
                                 defaultValue="option2"/>
                          <label className="form-check-label"
                                 htmlFor="inlineRadio2">Instant Sale
                            Price</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio"
                                 name="inlineRadioOptions" id="inlineRadio3"
                                 defaultValue="option3"/>
                          <label className="form-check-label"
                                 htmlFor="inlineRadio3">Unlock Purchased</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn w-100 mt-3 mt-sm-4"
                              onClick={ submitHandler }>
                        {
                          loading ?
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                              </div>
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