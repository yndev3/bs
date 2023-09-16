import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../../../../public/assets/css/admin.css';

import { fetchFromApi } from '../../utils/fetchFromApi';

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
    fontSize: '0.85rem !inportant', // フォントサイズを調整
    height: '35px',
  },
  customCheckbox: {
    color: theme.palette.success.main, // チェックが入った状態の色を緑に設定
  },
}));

export default function StickyHeadTable() {
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
      type: 'dark',
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
            <div className="col-11 mt-5 mb-5">
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
