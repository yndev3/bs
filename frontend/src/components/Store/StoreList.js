import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import Logo from '../../import_img/logo_80.png';

const ExploreStore = () => {
    const [store, setStore] = useState([]);
    const {fetchFromApi} = useFetchFromApi();
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFromApi({ endpoint: '/api/stores' })
            .then((data) => {
                // console.log('API returned data:', data);
                setStore(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    }, []);

    return (


        <section className="store-area author-area explore-area popular-collections-area">        
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-12">
                        {/* ERROR */ }
                        { error && 
                        <ul className="mb-5 post-holder">
                            <li className="post-meta-item">
                                <div className="date">
                                    <span className="posted-on">ERROR ALERT : { error.message }</span>
                                </div>
                            </li>
                        </ul>
                        }
                        <div className="row items explore-items">
                            {store && store.map((item, idx) => (
                                <div key={`eds_${idx}`} className="col-12 col-md-4 item explore-item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over">
                                            <img className="card-img-top" src={item.image} alt="" />
                                            <Link className="author disable-link" to="/authors">
                                                <div className="author-thumb avatar-lg">
                                                    <img className="rounded-circle" src={Logo} alt="" />
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body mt-4">
                                                <span>Official Store</span>
                                                <h5 className="mb-2">{item.name}</h5>
                                                <hr />
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.country.name}</span>
                                                    <span>{item.city}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreStore;
