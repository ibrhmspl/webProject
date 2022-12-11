import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTmpStore, updateTmpStore } from '../Slices/tmpStoreSlice';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    p: 4,
  };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 
  
export default function BasicModal() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTmpStore());
  },[]);


  const tmpstores = useSelector((state) => state.tmpstore);
  

  const handleStoreUptade = (tmpstore) => {
      dispatch(updateTmpStore(tmpstore.id));
  };

  return (
    <div>
       <Box sx={style}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name </StyledTableCell>
            <StyledTableCell align="right">Telefon</StyledTableCell>
            <StyledTableCell align="right">Adress</StyledTableCell>
            <StyledTableCell align="right">email</StyledTableCell>
            <StyledTableCell align="right">ONAY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tmpstores?.map((tmpstore) => (
            <StyledTableRow key={tmpstore.name}>
              <StyledTableCell component="th" scope="row">
              {tmpstore.name}
              </StyledTableCell>
              <StyledTableCell align="right">{tmpstore.adress}</StyledTableCell>
              <StyledTableCell align="right">{tmpstore.tel}</StyledTableCell>
              <StyledTableCell align="right">{tmpstore.email}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>handleStoreUptade(tmpstore)}>ONAY</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </div>
  );
}