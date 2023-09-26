import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFromApi } from '../../utils/fetchFromApi';
import ReservationList from './List'; 

const ReservationArea = () => {

  const history = useHistory();
  const [reservation, setReservation] = useState(null);

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
        history.push('/error');
      });
  }, []);

  return (
    <section className="reservation-area load-more">
      <div className="container w720">
        <div className="row">
          <div className="col-12">
            <div className="intro mb-4">
              <div className="intro-content">
                <span>Dashboard</span>
                <h3 className="mt-3 mb-0">Exchange Reservation</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          <div className="col-12 col-md-6 col-lg-12">

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
