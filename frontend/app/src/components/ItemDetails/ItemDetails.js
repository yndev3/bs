import React, { Component } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/themes/splide-default.min.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const initData = {
    ContractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    Category: "Watch",
    title: "Walking On AirWalking On AirWalking On Air",
    price: "1,000",
    image: "/img/Watches.jpg",
    image_2: "/img/Jewelrys.jpg",
    image_3: "/img/Materials.jpg",
    image_4: "/img/auction_2.jpg",
    image_5: "/img/auction_2.jpg",
    image_6: "/img/auction_2.jpg",
    image_7: "/img/auction_2.jpg",
    image_8: "/img/auction_2.jpg",
    image_9: "/img/auction_2.jpg",
    image_10: "/img/auction_2.jpg",
    image_11: "/img/auction_2.jpg",
    image_12: "/img/Jewelrys.jpg",
    image_13: "/img/Materials.jpg",
    image_14: "/img/auction_2.jpg",
    image_15: "/img/auction_2.jpg",
    image_16: "/img/auction_2.jpg",
    image_17: "/img/auction_2.jpg",
    image_18: "/img/auction_2.jpg",
    image_19: "/img/auction_2.jpg",
    image_20: "/img/auction_2.jpg",
    Brand: "ROLEX",
    State: "Brand new",
    Weight: "500",
    Color: "Black/Silver",
    Material: "ROLEX",
    Size: "100*30*20",
    Accessories: "Box, manual,Box, manual,Box",
    created: "15 Jul 2021",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",

}

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]

class ItemDetails extends Component {
    state = {
        initData: {},
        sellerData: []
    };

    componentDidMount() {
        this.setState({
            initData: initData,
            sellerData: sellerData
        });
    }

    render() {

        {/* Required Loop*/}
        const { initData } = this.state;
        const requiredLoop = ["Brand", "State", "Weight", "Color", "Material", "Size", "Accessories"];
        
        {/* Contract address shortcut*/}
        const address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
        const maxLength = 10;
        const truncatedAddress = `${address.slice(0, 10)}...${address.slice(-7)}`;
        

        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <h3 className="mt-0">{this.state.initData.title}</h3>
                                <div className="item-thumb text-center">
                                    <Splide aria-label="itemImg" >
                                        {Object.keys(this.state.initData).map((key) => {
                                            if (key.startsWith('image')) {
                                                return (
                                                    <SplideSlide key={key}>
                                                        <img src={this.state.initData[key]} alt='item_image'/>
                                                    </SplideSlide>
                                                );
                                            }
                                            return null;
                                        })}
                                    </Splide>
                                </div>
                            </div>
                            <div className="col-12 item px-lg-2 mt-3">
                                <div className="card no-hover">
                                    <div className="price d-flex justify-content-between align-items-center">
                                        <span>Price</span>
                                        <span>1 of 1</span>
                                    </div>
                                    <h4 className="mt-0 mb-2">{this.state.initData.price}<span className='h6'> USDT</span></h4>
                                </div>
                            </div>
                            <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">Place a Buy</a>
                        </div>

                        {/* Right column*/}
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                {/* Description */}
                                <p>
                                    <span className='text-white h5'>Description</span><br/>
                                    <span className='h6'>{this.state.initData.content}</span>
                                </p>
                                {/* Required List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        {requiredLoop.map((key) => (
                                        <li className="price d-flex justify-content-between" key={key}>
                                        <span className='mr-3 text-white'>{key}</span>
                                        <span className='word-break'>{initData[key]}</span>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Item Info List */}
                                <div className="accordion mt-5">
                                <Accordion  allowZeroExpanded>
                                    {/* Optional List */}
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Optional
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p>
                                                Exercitation in fugiat est ut ad ea cupidatat ut in
                                                cupidatat occaecat ut occaecat consequat est minim minim
                                                esse tempor laborum consequat esse adipisicing eu
                                                reprehenderit enim.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    {/* Details List */}
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Details
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                        <p>   
                                            <ul className="list-unstyled">
                                                <li className="price d-flex justify-content-between">
                                                    <span className='mr-3 text-white'>Contract Address</span>
                                                    <span className='word-break'>
                                                        <a href={`https://etherscan.io/address/${initData.ContractAddress}`} target='_blank'>{truncatedAddress}</a>
                                                    </span>
                                                </li>
                                                <li className="price d-flex justify-content-between">
                                                    <span className='mr-3 text-white'>Token ID</span>
                                                    <span className='word-break'>
                                                        <a href="https://ipfs.io/ipfs/QmeifaBHYmARgCDU2ZnzajKNEsAyAYgz67g25c9KkbcR5y/2657.json" target='_blank'>1234</a>
                                                    </span>
                                                </li>
                                                <li className="price d-flex justify-content-between">
                                                    <span className='mr-3 text-white'>Token Standard</span><span className='word-break'>ERC-721</span>
                                                </li>
                                                <li className="price d-flex justify-content-between">
                                                    <span className='mr-3 text-white'>Chain</span><span className='word-break'>Polygon</span>
                                                </li>
                                            </ul>
                                        </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ItemDetails;