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
import { CheckCircle } from "@material-ui/icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const theme = createMuiTheme({
  palette: {
    edit: "#4caf50",
  },
});

const useStyles = makeStyles({
  eidit: {
    width: "none",
    color: theme.palette.edit,
  },
});

const Info = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Zoom in={open} style={{ zIndex: 2000 }}>
        <Backdrop open={open}>
          <Paper elevation={5} style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <Typography variant="h4" style={{ margin: 20 }}>
                Successfully Done!
              </Typography>
            </div>
            <Divider />
            <div
              style={{ display: "flex", margin: 10, justifyContent: "center" }}
            >
              <Image
                rounded="full"
                size="256px"
                src={require("./tick.png")}
                alt="Segun Adebayo"
              />
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
                        {props.server.msg}
                      </TableCell>
                      <TableCell align="right">{props.server.status}</TableCell>
                      <TableCell align="right">
                        <CheckCircle className={classes.eidit} />
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
                          {props.firebase?.msg}
                        </TableCell>
                        <TableCell align="right">
                          {props.firebase?.status}
                        </TableCell>
                        <TableCell align="right">
                          <CheckCircle className={classes.eidit} />
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
                onClick={props.callback}
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

export default Info;
