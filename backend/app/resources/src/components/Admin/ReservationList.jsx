import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'ID', label: 'ID', minWidth: 10 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 10 },
  { id: 'ItemID', label: 'ItemID', minWidth: 10 },
  { id: 'ItemName', label: 'ItemName', minWidth: 100 },
  { id: 'Mail', label: 'Mail', minWidth: 100 },
  { id: 'TG_Handle', label: 'TG Handle', minWidth: 100 },
  { id: 'StoreID', label: 'StoreID', minWidth: 10 },
  { id: 'StoreName', label: 'StoreName', minWidth: 100 },
];

const initialRows = [
  { ID: '1', Name: 'John', Date: '2021-09-10 00:00:00', ItemID: '1001', ItemName: 'Item 1', Mail: 'john@example.com', TG_Handle: '@john', StoreID: 's1', StoreName: 'Store 1' },
  { ID: '2', Name: 'Jane', Date: '2021-09-11 00:00:00', ItemID: '1002', ItemName: 'Item 2', Mail: 'jane@example.com', TG_Handle: '@jane', StoreID: 's2', StoreName: 'Store 2' },
  // Add more rows as needed
];

export default function StickyHeadTable() {
  const classes = useStyles();
  const [rows, setRows] = useState(initialRows);
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    const sortedRows = [...rows].sort((a, b) => {
      const idA = parseInt(a.ID, 10);
      const idB = parseInt(b.ID, 10);
      return sortOrder === 'asc' ? idB - idA : idA - idB;
    });
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    setRows(sortedRows);
  };

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
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                          {column.id === 'ID' && (
                            <Button size="small" onClick={toggleSortOrder}>
                              {sortOrder === 'asc' ? '▼' : '▲'}
                            </Button>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div> 
        </div>
      </ThemeProvider>
    </section>
  );
}
