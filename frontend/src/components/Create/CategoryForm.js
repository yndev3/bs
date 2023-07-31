import React from 'react';
import {JewelryBrand, WatchBrand, MaterialBrand} from "./BrandConst";

export const WatchForm = ({handleChange, errors}) => {
  return (
      <>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="brand" className="mb-1">Movement<span
                className="text-danger">*</span></label>
            <select id="brand"
                    className="form-select"
                    name="brand"
                    onChange={ handleChange }>
              { Object.values(WatchBrand).map((brand) => (
                  <option key={ brand } value={ brand }>
                    { brand }
                  </option>
              )) }
            </select>
          </div>
        </div>


        <div className="col-12">
          <div className="form-group">
            <label htmlFor="movement" className="mb-1">Movement<span
                className="text-danger">*</span></label>
            <input id="movement"
                   type="text"
                   className="form-control"
                   name="movement"
                   placeholder="silver, gold, diamond"
                   onChange={ handleChange }
            />
            { errors.movement && <span>{ errors.movement }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="gender" className="mb-1">Gender-specific<span
                className="text-danger">*</span></label>
            <select id="gender"
                    className="form-select"
                    name="gender"
                    onChange={ handleChange }>
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
            { errors.gender && <span>{ errors.gender }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="features" className="mb-1">Features<span
                className="text-danger">*</span></label>
            <input id="features"
                   type="text"
                   className="form-control"
                   name="features"
                   placeholder="1000m throw"
                   onChange={ handleChange }
            />
            { errors.features && <span>{ errors.features }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="edition" className="mb-1">Edition<span
                className="text-danger">*</span></label>
            <input id="edition"
                   type="text"
                   className="form-control"
                   name="edition"
                   placeholder="made in 1992"
                   onChange={ handleChange }
            />
            { errors.edition && <span>{ errors.edition }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="waterproof" className="mb-1">Waterproof<span
                className="text-danger">*</span></label>
            <input id="waterproof"
                   type="text"
                   className="form-control"
                   name="waterproof"
                   placeholder="IPX-8"
                   onChange={ handleChange }
            />
            { errors.waterproof && <span>{ errors.waterproof }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="serialNumber" className="mb-1">Serial Number<span
                className="text-danger">*</span></label>
            <input id="serialNumber"
                   type="text"
                   className="form-control"
                   name="serialNumber"
                   placeholder="1234567890"
                   onChange={ handleChange }
            />
            { errors.serialNumber && <span>{ errors.serial }</span> }
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="state" className="mb-1">State<span
                className="text-danger">*</span></label>
            <select id="state"
                    className="form-select"
                    name="state"
                    onChange={ handleChange }>
              <option value="">Select State</option>
              <option value="N">N</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="AB">AB</option>
              <option value="B">B</option>
              <option value="BC">BC</option>
              <option value="C">C</option>
            </select>
            { errors.state && <span>{ errors.state }</span> }
          </div>
        </div>
      </>
  );
};

export const JewelryForm = ({handleChange, errors}) => {
  return (
      <>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="brand" className="mb-1">Jewelry<span
                className="text-danger">*</span></label>
            <select id="brand"
                    className="form-select"
                    name="brand"
                    onChange={ handleChange }>
              { Object.values(JewelryBrand).map((brand) => (
                  <option key={ brand } value={ brand }>
                    { brand }
                  </option>
              )) }
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="gender" className="mb-1">Gender-specific<span
                className="text-danger">*</span></label>
            <select id="gender" className="form-select" name="gender"
                    onChange={ handleChange }>
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
            { errors.gender && <span>{ errors.gender }</span> }
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="state" className="mb-1">State<span
                className="text-danger">*</span></label>
            <select id="state" className="form-select" name="state"
                    onChange={ handleChange }>
              <option value="">Select State</option>
              <option value="N">N</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="AB">AB</option>
              <option value="B">B</option>
              <option value="BC">BC</option>
              <option value="C">C</option>
            </select>
            { errors.state && <span>{ errors.state }</span> }
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="weight" className="mb-1">Weight<span
                className="text-danger">*</span></label>
            <input id="weight" type="text" className="form-control"
                   name="weight" placeholder="Weight in grams"
                   onChange={ handleChange }/>
            { errors.weight && <span>{ errors.weight }</span> }
          </div>
        </div>
      </>
  );
};

export const MaterialForm = ({handleChange, errors}) => {
  return (
      <>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="brand" className="mb-1">Material<span
                className="text-danger">*</span></label>
            <select id="brand"
                    className="form-select"
                    name="brand"
                    onChange={ handleChange }>
              { Object.values(MaterialBrand).map((material) => (
                  <option key={ material } value={ material }>
                    { material }
                  </option>
              )) }
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="weight" className="mb-1">Weight<span
                className="text-danger">*</span></label>
            <input id="weight" type="text" className="form-control"
                   name="weight" placeholder="Weight in grams"
                   onChange={ handleChange }/>
            { errors.weight && <span>{ errors.weight }</span> }
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label htmlFor="serialNumber" className="mb-1">Serial Number<span
                className="text-danger">*</span></label>
            <input id="serialNumber" type="text" className="form-control"
                   name="serialNumber" placeholder="1234567890"
                   onChange={ handleChange }/>
            { errors.serialNumber && <span>{ errors.serialNumber }</span> }
          </div>
        </div>
      </>
  );
};