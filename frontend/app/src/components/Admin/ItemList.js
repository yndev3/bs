import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search'; 

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 300 },
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100 },
];

function createData(id, name, category, price) {
  return { id, name, category, price };
}

const rows = [
  createData('1', '(Rolex) 2020 Daytona steel white dial 116500LN (Unworn). full set', 'watch', 115000),
  createData('2', '(Omega) Speedmaster Professional Moonwatch 311.30.42.30.01.005 (Unworn). full set', 'watch', 7800),
  createData('3', '(Patek Philippe) Calatrava 5196R-001 (Unworn). full set', 'watch', 32000),
  createData('4', '(Audemars Piguet) Royal Oak Selfwinding 15400ST.OO.1220ST.02 (Unworn). full set', 'watch', 25000),
  createData('5', '(Tag Heuer) Carrera Calibre 16 CBM2110.BA0651 (Unworn). full set', 'watch', 3500),
  createData('6', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('7', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('8', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('9', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('10', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('11', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('12', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('13', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('14', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
  createData('15', '(Breitling) Navitimer B01 AB0121211B1P1 (Unworn). full set', 'watch', 7200),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
    width: 500,
    marginLeft: 'auto',
  },
  searchInput: {
    marginLeft: 8,
  },
});


export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // todo フィルタリングされた行を取得
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const darkTheme = createTheme({
    palette: {
      type: 'dark', // todo ダークモードを有効にする
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="row justify-content-center">
    <div className="col-11 col-md-11 col-lg-11 mt-5 mb-5">
      
      <Paper className={classes.root}>
        <div className={classes.searchBar}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
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
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'id') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <a
                            href={`https://example.com/${row.id}`}  // todo 実際のリンクに置き換える
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {value}
                          </a>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </div>
    </ThemeProvider>
  );
}
