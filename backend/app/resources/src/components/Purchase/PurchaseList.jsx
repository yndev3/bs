import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { fetchFromApi } from '../../utils/fetchFromApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';



export default function DataGridDemo() {
  const history = useHistory();
  const [booking, setBooking] = useState(null);
  const scan_url = import.meta.env.VITE_POLYGON_SCAN_ADDRESS;

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 10 },
    { field: 'created_at', headerName: 'Date', minWidth: 170 },
    { field: 'price', headerName: 'Price', minWidth: 100 },
    {
      field: 'itemName',
      headerName: 'ItemName',
      minWidth: 370,
      renderCell: (params) => (
        <Link to={`/admin/itemDetails/${params.row.tokenId}`}>
          {params.row.itemName}
        </Link>
      ),
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      minWidth: 380,
      renderCell: (params) => (
        <a href={`${scan_url}address/${params.row.buyer}`} target="_blank" rel="noopener noreferrer">
          {params.row.buyer}
        </a>
      ),
    },
    {
      field: 'txId',
      headerName: 'TxID',
      minWidth: 380,
      renderCell: (params) => (
        <a href={`${scan_url}tx/${params.row.txId}`} target="_blank" rel="noopener noreferrer">
          {params.row.buyer}
        </a>
      ),
    },
  ];

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/admin/purchase',
    })
      .then((data) => {
        console.log('API returned data:', data);
        setBooking(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        history.push('/error');
      });
  }, []);

  const rows = booking
  ? booking.map((item) => ({
      id: item.id,
      created_at: formatDate(item.created_at),
      itemName:item.product.name,
      buyer: item.buyer,
      price: numberWithCommas(item.price) + ' USDT',
      txId: item.transaction_hash,
    }))
  : [];

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <section className="author-area admin-form">
      <div className="row justify-content-center">
        <div className="col-11 intro mt-2 mt-lg-0 mb-4 mb-lg-2">
          <div className="intro-content">
            <span>Dashboard</span>
            <h3 className="mt-3 mb-0">Purchase List</h3>
          </div>
          <ThemeProvider theme={darkTheme}>
            <div className="row justify-content-center">
              <div className="col-11 col-md-11 col-lg-11 mt-5 mb-5">
                <div style={{ minHeight: '500px', width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                  />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
      <div>
      </div>
    </section>
  );
}
