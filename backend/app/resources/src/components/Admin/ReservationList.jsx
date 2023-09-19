import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 50 },
  { field: 'name', headerName: 'Name', minWidth: 120 },
  { field: 'date', headerName: 'Date', minWidth: 170 },
  { field: 'itemId', headerName: 'ItemID', minWidth: 120 },
  { field: 'itemName', headerName: 'ItemName', minWidth: 400 },
  { field: 'mail', headerName: 'Mail', minWidth: 200 },
  { field: 'tg', headerName: 'TG Handle', minWidth: 150 },
  { field: 'storeName', headerName: 'StoreName', minWidth: 250 },
];

const reserve = [
  { id: '1', name: 'John', date: '2021-09-10 00:00:00', itemId: '1001', itemName: 'Item 1', mail: 'john@example.com', tg: '@john', storeName: 'Store 1' },
  { id: '2', name: 'Jane', date: '2021-09-11 00:00:00', itemId: '1002', itemName: 'Item 2', mail: 'jane@example.com', tg: '@jane', storeName: 'Store 2' },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(reserve);
  }, []);

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
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
            <div style={{ height: 440, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 25, 50]} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </section>
  );
}
