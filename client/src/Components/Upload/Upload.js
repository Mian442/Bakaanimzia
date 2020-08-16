import React from "react";
import {
  Backdrop,
  Zoom,
  Paper,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { CheckCircle, ImageRounded, VideoLibrary } from "@material-ui/icons";
import { Button } from "@chakra-ui/core";
import { useSelector } from "react-redux";

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

const Upload = (props) => {
  const classes = useStyles();
  const fir_upload = useSelector((state) => state.Firestore.upload);
  const ser_res = useSelector((state) => state.Server.Server_Response);
  return (
    <div>
      <Backdrop open={props.open} style={{ zIndex: 2000 }}>
        <Zoom in={props.open}>
          <Paper elevation={5} style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              <Typography variant="h4" style={{ margin: 20 }}>
                Uploading Work!
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: 20 }}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableBody>
                    {props.data ? (
                      <>
                        <TableRow>
                          <TableCell>Data</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: 30 }}></TableCell>
                          <TableCell component="th" scope="row">
                            <FontAwesomeIcon size="1x" icon={faDatabase} />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Data
                          </TableCell>
                          <TableCell align="right">
                            {ser_res === null ? (
                              <LinearProgress color="primary" />
                            ) : ser_res.status === 200 ? (
                              <CheckCircle className={classes.eidit} />
                            ) : null}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : null}
                    {props.pic ? (
                      <>
                        <TableRow>
                          <TableCell>Picture</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: 30 }}></TableCell>
                          <TableCell component="th" scope="row">
                            <ImageRounded color="primary" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {props.values.pic.name}
                          </TableCell>
                          <TableCell align="right">
                            {fir_upload.length > 0 ? (
                              fir_upload[0] === 100 ? (
                                <CheckCircle className={classes.eidit} />
                              ) : (
                                <LinearProgress
                                  variant="determinate"
                                  color="primary"
                                  value={fir_upload[0] ? fir_upload[0] : 0}
                                />
                              )
                            ) : null}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : null}
                    {props.video ? (
                      <>
                        {props.values.episode.length > 0 ? (
                          <TableRow>
                            <TableCell>Video</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ) : null}
                        {props.values.episode.map((i, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell style={{ width: 30 }}></TableCell>
                              <TableCell component="th" scope="row">
                                <VideoLibrary color="secondary" />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {i.title}
                              </TableCell>
                              <TableCell align="right">
                                {fir_upload.length > 0 ? (
                                  fir_upload[index + 1] === 100 ? (
                                    <CheckCircle className={classes.eidit} />
                                  ) : (
                                    <LinearProgress
                                      variant="determinate"
                                      color="secondary"
                                      value={
                                        fir_upload[index + 1]
                                          ? fir_upload[index + 1]
                                          : 0
                                      }
                                    />
                                  )
                                ) : null}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
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
                variant="solid"
                isDisabled={props.isSubmitting}
                variantColor="teal"
                onClick={props.callback}
              >
                OK
              </Button>
            </div>
          </Paper>
        </Zoom>
      </Backdrop>
    </div>
  );
};

export default Upload;
