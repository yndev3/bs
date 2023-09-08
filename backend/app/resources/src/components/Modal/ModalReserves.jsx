import React, { Component } from 'react';

const initData = {
    menuName: "Reserves Now",
    menuIcon: "far fa-times-circle icon-close",
    heading: "NFT Exchange Reservation",
    itemId: "150",
    itemName: "ItemNameSample ItemNameSample ItemNameSample ItemNameSample",
    content: "Once your application is completed, we will contact you through your Telegram within 3 business days. After receiving instructions, including important details to bring to the store during the exchange, communicate via Telegram to confirm your visit and exchange appointment.",
    btnText: "Confirm"
}

class ModalReserve extends Component {
    state = {
        data: {},
        isFormSubmitted: false, // フォームが送信されたかどうかのフラグ
        isConfirmationPage: false, // 確認画面かどうかのフラグ
        isCompleted: false, // フォームが完了したかどうかを管理するフラグ
        name: "", // 確認画面用
        email: "", // 確認画面用
        telegram: "", // 確認画面用
        selectedOption: "", // 確認画面用
    }

    componentDidMount() {
        this.setState({
            data: initData
        })
    }

    // フォームの各入力フィールドのonChangeハンドラ
    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    handleTelegramChange = (e) => {
        this.setState({ telegram: e.target.value });
    }
    handleSelectChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    }

    // フォームの送信ハンドラ
    handleFormSubmit = (e) => {
        e.preventDefault();
        // フォームの送信処理をここに追加（例：データをサーバーに送信）
        // 送信が成功したら、確認画面に遷移
        this.setState({ isFormSubmitted: true });
    }

    // 戻るボタンのハンドラ（確認画面からフォームに戻る）
    handleBackButtonClick = () => {
        this.setState({ isFormSubmitted: false });
    }

    // Submitボタンをクリックして完了画面に遷移
    handleCompleteButtonClick = () => {
        this.setState({ isCompleted: true });
    }

    render() {
        return (
            <div id="reserves" className="modal fade p-0">
                <div className="modal-dialog dialog-animated">
                    <div className="modal-content h-100">
                        <div className="modal-header" data-dismiss="modal">
                            {this.state.data.menuName} <i className={this.state.data.menuIcon} />
                        </div>
                        <div className="modal-body reserves-form">
                            {this.state.isFormSubmitted ? (
                                // 確認画面
                                this.state.isCompleted ? (
                                    // 完了画面
                                    <div>
                                        <h3>Thank You!</h3>
                                        <p>Your reservation has been confirmed, and a confirmation email has been sent to your registered email address.</p>
                                        <p>{this.state.data.content}</p>
                                    </div>
                                ) : (
                                    // 確認画面
                                    <div>
                                        <h3>Confirmation</h3>
                                        <p><span className='white'>Name:</span> {this.state.name}</p>
                                        <p><span className='white'>Email:</span> {this.state.email}</p>
                                        <p><span className='white'>Telegram:</span> {this.state.telegram}</p>
                                        <p><span className='white'>Exchange Store:</span> {this.state.selectedOption}</p>
                                        <button className="btn btn-bordered-white mt-3" onClick={this.handleBackButtonClick}>Back</button>
                                        <button className="btn btn-bordered-white mt-3" onClick={this.handleCompleteButtonClick}>Submit</button>
                                    </div>
                                )
                            ) : (
                                // 入力フォーム
                                <form className="row" onSubmit={this.handleFormSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="search-title mt-0 mb-3">{this.state.data.heading}</h3>
                                            <p>{this.state.data.content}</p>
                                            <hr color="#fff" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 input-group mt-4">
                                            <span className='mb-1'><u>ItemDetail</u></span>
                                            <label>
                                                ItemID : <span className='white'>{this.state.data.itemId}</span><br />
                                                ItemName : <span className='white'>{this.state.data.itemName}</span>
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
                                                    value={this.state.name}
                                                    onChange={this.handleNameChange} // Nameフィールド用のonChangeイベント
                                                />
                                            </label>
                                            <label className='pb-3'>E-Mail:
                                                <input
                                                    type="email"
                                                    placeholder="Enter your E-Mail"
                                                    minLength="5"
                                                    maxLength="40"
                                                    required
                                                    value={this.state.email}
                                                    onChange={this.handleEmailChange} // E-Mailフィールド用のonChangeイベント
                                                />
                                            </label>
                                            <label>Telegram:
                                                <input
                                                    type="text"
                                                    placeholder="Enter your Telegram handle(@～)"
                                                    minLength="2"
                                                    maxLength="25"
                                                    required
                                                    value={this.state.telegram}
                                                    onChange={this.handleTelegramChange} // Telegramフィールド用のonChangeイベント
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
                                                    value={this.state.selectedOption}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <option value="" selected>--Please choose an option--</option>
                                                    <option value="Dubai--XXX ShopName XXX">Dubai--XXX ShopName XXX</option>
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
}

export default ModalReserve;
