import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';

const initData = {
    menuName: "Reserves Now",
    menuIcon: "far fa-times-circle icon-close",
    heading: "NFT Exchange Reservation",
    itemId: "",
    itemName: "",
    content: "Once your application is completed, we will contact you through your Telegram within 3 business days. After receiving instructions, including important details to bring to the store during the exchange, communicate via Telegram to confirm your visit and exchange appointment.",
    btnText: "Confirm"
};

const ModalReserve = ({ selectedItem }) => {
    const [data, setData] = useState(initData);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        const updatedInitData = {
            ...initData,
            itemId: selectedItem.id,
            itemName: selectedItem.title,
        };
        setData(updatedInitData);
    }, [selectedItem]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleTelegramChange = (e) => {
        setTelegram(e.target.value);
    }
    const [selectedOptionName, setSelectedOptionName] = useState("");
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        const selectedStore = storeOptions.find(store => store.id.toString() === e.target.value);
        if (selectedStore) {
            setSelectedOptionName(`${selectedStore.country.name}--${selectedStore.name}`);
        }
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
    }
    const handleBackButtonClick = () => {
        setIsFormSubmitted(false);
    }
    
    const [storeOptions, setStoreOptions] = useState([]);

    useEffect(() => {
        fetchFromApi({
          endpoint: '/api/stores'
        })
        .then((data) => {
          setStoreOptions(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const handleCompleteButtonClick = async () => {
        try {
            const res = await fetchFromApi({
                endpoint: '/api/create-booking',
                method: 'POST',
                data: {
                    token_id: data.itemId, 
                    name: name,
                    email: email,
                    tg: telegram,
                    store_id: selectedOption,
                }
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        };
        setIsCompleted(true);
    }

    return (
        <div id="reserves" className="modal fade p-0">
            <div className="modal-dialog dialog-animated">
                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                        {data.menuName} <i className={data.menuIcon} />
                    </div>
                    <div className="modal-body reserves-form">
                        {isFormSubmitted ? (
                            isCompleted ? (
                                <div>
                                    <h3>Thank You!</h3>
                                    <p>Your reservation has been confirmed, and a confirmation email has been sent to your registered email address.</p>
                                    <p>{data.content}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3>Confirmation</h3>
                                    <p><span className='white'>ItemID:</span> {data.itemId}</p>
                                    <p><span className='white'>ItemName:</span> {data.itemName}</p>
                                    <p><span className='white'>Name:</span> {name}</p>
                                    <p><span className='white'>Email:</span> {email}</p>
                                    <p><span className='white'>Telegram:</span> {telegram}</p>
                                    <p><span className='white'>Exchange Store:</span> {selectedOptionName}</p>
                                    <button className="btn btn-bordered-white mt-3" onClick={handleBackButtonClick}>Back</button>
                                    <button className="btn btn-bordered-white mt-3" onClick={handleCompleteButtonClick}>Submit</button>
                                </div>
                            )
                        ) : (
                            <form className="row" onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="search-title mt-0 mb-3">{data.heading}</h3>
                                        <p>{data.content}</p>
                                        <hr color="#fff" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group mt-4">
                                        <span className='mb-1'><u>ItemDetail</u></span>
                                        <label>
                                            ItemID : <span className='white'>{data.itemId}</span><br />
                                            ItemName : <span className='white'>{data.itemName}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group mt-4">
                                        <span className='mb-1'><u>Please enter your information.</u></span>
                                        <label className='pb-3'>Name:
                                            <input
                                                type="text"
                                                placeholder="Enter your Name"
                                                minLength="2"
                                                maxLength="25"
                                                required
                                                value={name}
                                                onChange={handleNameChange}
                                                pattern="[A-Za-z0-9-_,.]+"
                                            />
                                        </label>
                                        <label className='pb-3'>E-Mail:
                                            <input
                                                type="email"
                                                placeholder="Enter your E-Mail"
                                                minLength="5"
                                                maxLength="40"
                                                required
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </label>
                                        <label>Telegram:
                                            <input
                                                type="text"
                                                placeholder="Enter your Telegram handle(@～)"
                                                minLength="2"
                                                maxLength="25"
                                                required
                                                value={telegram}
                                                onChange={handleTelegramChange}
                                                pattern="[A-Za-z0-9-_,.]+"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group mt-4">
                                        <span className='mb-1'><u>Please enter your information.</u></span>
                                        <label className='pb-3'>Exchange Store:
                                        <select
                                            name="shop"
                                            id="shop-select"
                                            className='reserves'
                                            required
                                            value={selectedOption}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="" disabled>--Please choose an option--</option>
                                            {storeOptions.map((store) => (
                                                <option key={store.id} value={store.id}>
                                                    {store.country.name}--{store.name}
                                                </option>
                                            ))}
                                        </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 input-group align-self-center">
                                    <button type="submit" className="btn btn-bordered-white mt-3">Confirm</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalReserve;
