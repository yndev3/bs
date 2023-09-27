import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import CustomModal from './ReserveModal';



export default function DataGridDemo() {
  const {fetchFromApi} = useFetchFromApi();
  const history = useHistory();
  const [booking, setBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 10 },
    { field: 'bookingNumber', headerName: 'BookingNumber', minWidth: 150 },
    { field: 'name', headerName: 'Name', minWidth: 120 },
    { field: 'date', headerName: 'Date', minWidth: 170 },
    {
      field: 'itemName',
      headerName: 'ItemName',
      minWidth: 250,
      renderCell: (params) => (
        <Link to={`/admin/itemDetails/${params.row.tokenId}`}> {/* リンクを追加 */}
          {params.row.itemName}
        </Link>
      ),
    },
    { field: 'mail', headerName: 'Mail', minWidth: 250 },
    { field: 'tg', headerName: 'TG Handle', minWidth: 150 },
    { field: 'storeName', headerName: 'StoreName', minWidth: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpen(params)}>
        <LaunchIcon />
      </IconButton>
      ),
    },
  ];

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleOpen = (params) => {
    setSelectedRowData(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/admin/booking',
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
        tokenId: item.product.token_id,
        bookingNumber: item.booking_number,
        name: item.name,
        date: formatDate(item.created_at),
        itemName: item.product.name,
        mail: item.email,
        tg: item.tg,
        storeName: item.store.name,
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



  return (
    <section className="author-area admin-form">
      <div className="row justify-content-center">
        <div className="col-11 intro mt-2 mt-lg-0 mb-4 mb-lg-2">
          <div className="intro-content">
            <span>Dashboard</span>
            <h3 className="mt-3 mb-0">Reservation List</h3>
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
      <CustomModal open={open} handleClose={handleClose} selectedRowData={selectedRowData} />
      </div>
    </section>
  );
}
