import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../../../../public/assets/css/admin.css';

import { useFetchFromApi } from '../../hooks/fetchFromApi';

const columns = [
  { id: 'token_id', label: 'Token ID', minWidth: 10 },
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'category', label: 'Category', minWidth: 10 },
  { id: 'price', label: 'Price', minWidth: 10 },
  { id: 'is_sale', label: 'Is Sale', minWidth: 10 },
  { id: 'is_burn', label: 'Is Burn', minWidth: 10 },
  { id: 'owner_address', label: 'Owner Address', minWidth: 20 },
];

const scan_url = import.meta.env.VITE_POLYGON_SCAN_ADDRESS;
const mint_address = import.meta.env.VITE_BRANDSWAP_MINT_ADDRESS;

function createData(id, name, category, price, is_sale, is_burn) {
  return { id, name, category, price, is_sale, is_burn };
}

const isSaleText = {
  0: 'Not sale',
  1: 'On sale',
  2: 'SOLD',
};

const isBurnText = {
  0: 'Unburned',
  1: 'Burned',
};

// Owner Addressを短縮表示する関数
function shortenAddress(address) {
  if (address.length > 10) {
    return `${address.substring(0, 5)}...${address.substring(address.length - 8)}`;
  }
  return address;
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  idSearchInput: {
    marginLeft: 8,
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tableCell: {
    padding: '4px', // セル内のパディングを調整
    fontSize: '0.85rem !important', // フォントサイズを調整
    height: '35px',
  },

}));

export default function StickyHeadTable() {
  const {fetchFromApi} = useFetchFromApi();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [nameSearchValue, setNameSearchValue] = useState('');
  const [idSearchValue, setIdSearchValue] = useState('');
  const [isSaleFilters, setIsSaleFilters] = useState(['0', '1', '2']); // フィルター初期値
  const [isBurnFilters, setIsBurnFilters] = useState(['0', '1']); // フィルター初期値
  const [categoryFilters, setCategoryFilters] = useState({
    Watch: true,
    Jewelry: true,
    Material: true,
  }); // カテゴリフィルター初期値
  const [rows, setRows] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNameSearchChange = (event) => {
    setNameSearchValue(event.target.value);
  };

  const handleIdSearchChange = (event) => {
    setIdSearchValue(event.target.value);
  };

  const handleIsSaleFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setIsSaleFilters([...isSaleFilters, value]);
    } else {
      setIsSaleFilters(isSaleFilters.filter((filter) => filter !== value));
    }
  };

  const handleIsBurnFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setIsBurnFilters([...isBurnFilters, value]);
    } else {
      setIsBurnFilters(isBurnFilters.filter((filter) => filter !== value));
    }
  };

  const handleCategoryFilterChange = (event) => {
    const { name, checked } = event.target;
    setCategoryFilters({
      ...categoryFilters,
      [name]: checked,
    });
  };

  // フィルタリングされた行を取得
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(nameSearchValue.toLowerCase()) &&
    row.id.toString().includes(idSearchValue) &&
    isSaleFilters.includes(row.is_sale.toString()) &&
    isBurnFilters.includes(row.is_burn.toString()) &&
    categoryFilters[row.category] // 選択されたカテゴリでフィルタリング
  );

  // API
  const history = useHistory();

  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/admin/items',
    })
      .then((data) => {
        console.log('API returned data:', data);
        setRows(data.data); // データをセット
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        history.push('/error');
      });
  }, []);

  return (
    <section className="author-area admin-form">
      <div className="row justify-content-center">
        <div className="col-11 intro mt-2 mt-lg-0 mb-4 mb-lg-2">
          <div className="intro-content">
            <span>Dashboard</span>
            <h3 className="mt-3 mb-0">Item List</h3>
          </div>
        </div>
      </div>
      <ThemeProvider theme={darkTheme}>
        <div className="row justify-content-center">
          <div className="col-11 col-md-11 col-lg-11 mt-5 mb-5">
            <Paper className={classes.root}>
            <div className="search_box row">
              <Grid container spacing={2}>
                <Grid item md={2}>
                <Input
                    className={`${classes.idSearchInput} mt-1`}
                    value={idSearchValue}
                    onChange={handleIdSearchChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />ID:
                      </InputAdornment>
                    }
                  />
                  <Input
                    className={`${classes.searchInput}`}
                    value={nameSearchValue}
                    onChange={handleNameSearchChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />NAME:
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={classes.filterGroup}>
                      <div className={classes.filterLabel}>Sale Status</div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSaleFilters.includes('0')}
                            onChange={handleIsSaleFilterChange}
                            value="0"
                            color='default'
                          />
                        }
                        label={`${isSaleText[0]}`}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSaleFilters.includes('1')}
                            onChange={handleIsSaleFilterChange}
                            value="1"
                            color='default'
                          />
                        }
                        label={`${isSaleText[1]}`}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSaleFilters.includes('2')}
                            onChange={handleIsSaleFilterChange}
                            value="2"
                            color="default"
                          />
                        }
                        label={`${isSaleText[2]}`}
                      />
                    </div>
                    <div className={classes.filterGroup}>
                      <div className={classes.filterLabel}>Burn Status</div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isBurnFilters.includes('0')}
                            onChange={handleIsBurnFilterChange}
                            value="0"
                            color="default"
                          />
                        }
                        label={`Unburned	`}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isBurnFilters.includes('1')}
                            onChange={handleIsBurnFilterChange}
                            value="1"
                            color="default"
                          />
                        }
                        label={`Burned`}
                      />
                    </div>
                    <div className={classes.filterGroup}>
                      <div className={classes.filterLabel}>Category</div>
                      {Object.entries(categoryFilters).map(([category, checked]) => (
                        <FormControlLabel
                          key={category}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={handleCategoryFilterChange}
                              name={category}
                              color="default"
                            />
                          }
                          label={category}
                        />
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>

              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                          align={column.id !== 'name' ? 'center' : column.align}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.token_id}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.id !== 'name' ? 'center' : column.align} className={classes.tableCell}>
                          {column.id === 'name' && (
                            <Link
                              to={`itemDetails/${row.token_id}`} 
                              rel="noopener noreferrer"
                            >
                              {row[column.id]}
                            </Link>
                          )}
                          {column.id === 'is_sale' && isSaleText[row[column.id]]}
                          {column.id === 'is_burn' && isBurnText[row[column.id]]}
                          {column.id === 'owner_address' && (
                          <span>
                            {row[column.id] === mint_address ? 'BrandSwap' : (
                              <a
                                href={`${scan_url}address/${row[column.id]}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {shortenAddress(row[column.id])}
                              </a>
                              )}
                            </span>
                           )}
                          {column.id === 'price' && parseInt(row[column.id]).toLocaleString()} {/* 価格をtoLocaleStringでフォーマット */}
                          {column.id !== 'name' && column.id !== 'is_sale' && column.id !== 'is_burn' && column.id !== 'owner_address' && column.id !== 'price' && row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
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
    </section>
  );
}
