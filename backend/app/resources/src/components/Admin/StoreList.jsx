import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { fetchFromApi } from '../../utils/fetchFromApi';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 50 },
  { field: 'name', headerName: 'Name', minWidth: 300 },
  { field: 'countryName', headerName: 'Country', minWidth: 250 },
  { field: 'fullAddress', headerName: 'Full Address', minWidth: 500 }, 
];

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);

  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/stores'
    })
    .then((data) => {
      const transformedData = data.map(store => ({
        id: store.id,
        name: store.name,
        countryName: store.country.name,
        zip_code: store.zip_code,
        fullAddress: `${store.zip_code} ${store.state} ${store.city} ${store.street_address}`, 
      }));
      setStoreOptions(transformedData);
      setRows(transformedData);  
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          cell: {
            color: 'white',
          },
        },
      },
    },
  });

  return (
    <section className="author-area admin-form">
      <div className="row justify-content-center">
        <div className="col-11 intro mt-2 mt-lg-0 mb-4 mb-lg-2">
          <div className="intro-content">
            <span>Dashboard</span>
            <h3 className="mt-3 mb-0">Reservation List</h3>
          </div>
        </div>
      </div>
      <ThemeProvider theme={darkTheme}>
        <div className="row justify-content-center">
          <div className="col-11 col-md-11 col-lg-11 mt-5 mb-5">
            <div style={{ minHeight: '500px', width: '100%' }}>
              <DataGrid 
                rows={storeOptions} 
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
    </section>
  );
}
