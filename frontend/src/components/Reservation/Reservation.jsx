import React, { useState, useEffect } from 'react';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import ReservationList from './List'; 

const ReservationArea = () => {
  const { fetchFromApi, error:apiError, loading:isApiLoading} = useFetchFromApi();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/booking',
    })
      .then((data) => {
        console.log('API returned data:', data);
        setReservation(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <section className="reservation-area load-more">
      <div className="container w720">
        <div className="row items">
          <div className="col-12 col-md-6 col-lg-12">
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
            <div className="tab-content">
              <div className="tab-pane fade show active" id="nav-home">
                {reservation && reservation.length > 0 ? (
                  <ReservationList reservation={reservation}/>
                ) : (
                  <div className="col-12 text-center mt-5">
                    <p>No reservations available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationArea;
