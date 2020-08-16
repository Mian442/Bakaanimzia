import React from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  Button,
  TableRow,
  Paper,
} from "@material-ui/core";

const ListCard = (props) => {
  return (
    <div onClick={props.onClick}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <Button variant="outlined" color="secondary">
                  {props.index}
                </Button>
              </TableCell>
              <TableCell align="left">
                <img
                  src={props.state.pic}
                  style={{ height: 150, width: 120 }}
                />
              </TableCell>
              <TableCell align="left">{props.state.title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListCard;
