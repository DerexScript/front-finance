import styled from '@emotion/styled';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3c3c3c',
    color: '#fff',
    border: '1px solid #fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid #3c3c3cc1',
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
