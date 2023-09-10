import React, { useState, useEffect } from 'react';

const NFTCard = ({ item, idx, handleItemSelected }) => {
    const { "name": title, "image": img, created_at: up_date, created_at: exchange_date } = item;

    // up_date の日付文字列を指定のフォーマットに整形
    const formattedUpDate = (() => {
        const dateObject = new Date(up_date);
        return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
    })();

    // 90日後の日付を計算
    const futureDate = (() => {
        const dateObject = new Date(up_date);
        dateObject.setDate(dateObject.getDate() + 90);
        return dateObject;
    })();

    // 現在の日付を取得
    const currentDate = new Date();

    // 現在の日付と90日後の日付の差を計算
    const timeDiff = futureDate - currentDate;

    // 残りの日数、時間、分、秒を計算
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return (
        <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
            <div className="card min-h">
                <div className="image-over">
                    <a href="/item-details">
                        <img className="card-img-top" src={img} alt="" />
                    </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body">
                        <div className="card-bottom d-flex justify-content-between">
                            <span>ID</span>
                            <span>{item.id}</span>
                        </div>
                        <div className="seller align-items-center my-3">
                            <a href="/item-details">
                                <h5 className="mb-0">{title}</h5>
                            </a>
                        </div>
                        <div className="seller align-items-center my-3">
                            <span>Last Update</span>
                            <h6 className="mb-0">{formattedUpDate}</h6> {/* 指定のフォーマットで表示 */}
                        </div>
                        <div className="seller align-items-center my-3">
                            <span>Exchangeable date and time</span>
                            <h6 className="mb-0">{`${days}d ${hours}h ${minutes}m ${seconds}s remaining`}</h6> {/* カウントダウンを表示 */}
                        </div>

                        <div className="col-12 text-center mt-2">
                            <a 
                                className="btn btn-bordered-white btn-smaller mt-3" 
                                href="#" 
                                data-toggle="modal" 
                                data-target="#reserves"
                                onClick={() => handleItemSelected(item.id, title)} 
                            >
                            <i className="icon-handbag mr-2" />Reserve Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTCard;
