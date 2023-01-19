import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import {Link} from 'react-router-dom'
import { sentenceCase } from 'change-case';
import { useState , useEffect } from 'react';
import FileDownload from 'js-file-download';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import api from '../utils/api';

// sections
import UserListHead from '../sections/@dashboard/user/UserListHead';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'appartement', label: 'Appartement', alignRight: false },
  { id: 'prix', label: 'Prix', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'imprimer', label: 'Imprimer', alignRight: false },
  { id: '' },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [payments, setPayments] = useState([])

  const deletePayment = (id)=>{
    api.delete(`payment/delete/${id}`).then((Response)=>{
      console.log(Response.data);
      getAllAppatements();
    }).catch( (Error)=>{
      console.log(Error);
    })
  }

  const imprimerPdf = (id)=>{
    api.get(`payment/getpdf/${id}`, { responseType: 'blob' }).then((res) => {
      console.log(res.data);
      FileDownload(res.data,"facture.pdf")
    }).catch((Error)=>{
      console.log(Error);
    })
  }

  const getAllAppatements = async()=>{
    api.get("payment/getall").then((Response)=>{
      console.log(Response.data);
      setPayments(Response.data)
    }).catch((Error)=>{
      console.log(Error);
    })
  }
  useEffect(() => {
    getAllAppatements();
  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };


  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);


  return (
    <>
      <Helmet>
        <title> payments </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Payments
          </Typography>
          <Link to="/dashboard/addpayment">
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            add payment
          </Button>
          </Link>
          
        </Stack>

        <Card>
         

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {payments.map((row) => {
                    const { _id, Apparetement, Date, Prix} = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={"h"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0N1-Kpw5hA-sU7K--v-vfL8z5y9knIR0UA&usqp=CAU"} />
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{Apparetement.Numero}</TableCell>

                        <TableCell align="left">{`${Prix}  DH`}</TableCell>

                        <TableCell align="left">{Date.slice(0,10)}</TableCell>



                        <TableCell align="left">
                        <Button onClick={()=>imprimerPdf(_id)} variant="contained" size='small' startIcon={<Iconify icon="eva:plus-fill" />}>
                          Imprimer
                        </Button>
                        </TableCell>

                        <TableCell align="left">
                          <Link to={`/dashboard/updatepayment/${_id}`}>
                            <Button variant="contained" >
                              <Iconify icon={'eva:edit-fill'}  />
                            </Button>
                          </Link>
                        </TableCell>

                        <TableCell align="left" onClick={()=>deletePayment(_id)}>
                          <Button variant="contained" color='error'>
                            <Iconify icon={'eva:trash-2-outline'}  />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>
    </>
  );
}
