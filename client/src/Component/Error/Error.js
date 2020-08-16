import React, { useState } from "react";
import {
  Backdrop,
  Zoom,
  Paper,
  Typography,
  Divider,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Button,
  TableHead,
  TableBody,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core";
import { Image } from "@chakra-ui/core";
import { WarningRounded, ErrorOutlineRounded } from "@material-ui/icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  SERVER_RESPONSE_ERROR_NO,
  FIRESTORE_RESPONSE_ERROR_NO,
} from "../../Redux/Redux-actions/Actions";

const theme = createMuiTheme({
  palette: {
    war: "#ffeb3b",
    err: "#ff1744",
  },
});

const useStyles = makeStyles({
  err: {
    width: "none",
    color: theme.palette.error.main,
  },
  war: {
    width: "none",
    color: theme.palette.warning.main,
  },
});

const Error = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Zoom in={open} style={{ zIndex: 2000 }}>
        <Backdrop open={open}>
          <Paper elevation={5} style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <Typography variant="h4" style={{ margin: 20 }}>
                Error!
              </Typography>
            </div>
            <Divider />
            <div
              style={{ display: "flex", margin: 10, justifyContent: "center" }}
            >
              <Image size="256px" src={require("./close.png")} alt="Error" />
            </div>

            <Divider />
            <div style={{ display: "flex", margin: 20 }}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Response</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <FontAwesomeIcon size="2x" icon={faServer} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {props.server.error}
                      </TableCell>
                      <TableCell align="right">{props.server.status}</TableCell>
                      <TableCell align="right">
                        <ErrorOutlineRounded className={classes.err} />
                      </TableCell>
                    </TableRow>
                    {props.firebase ? (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Image
                            rounded="full"
                            size="32px"
                            src={require("./firebase_96dp.png")}
                            alt="Firebase"
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {props.firebase?.error}
                        </TableCell>
                        <TableCell align="right">
                          {props.firebase?.status}
                        </TableCell>
                        <TableCell align="right">
                          <ErrorOutlineRounded className={classes.err} />
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div
              style={{
                margin: 20,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="primary"
                size="medium"
                variant="contained"
                onClick={() => {
                  handleClose();
                  dispatch(SERVER_RESPONSE_ERROR_NO());
                  dispatch(FIRESTORE_RESPONSE_ERROR_NO());
                }}
              >
                OK
              </Button>
            </div>
          </Paper>
        </Backdrop>
      </Zoom>
    </div>
  );
};

export default Error;
