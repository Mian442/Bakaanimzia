import React from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TableCell,
  makeStyles,
  withStyles,
  Paper,
  Table,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

export default (props) => {
  const classes = useStyles();
  return (
    <div style={{ margin: 30 }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sir.</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.episode.map((i, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{i.title}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      let data = { state: i, index };
                      props.handlerdel(data);
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
