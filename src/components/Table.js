import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const { author, category, context, createAt, status, summary, updateAt } =
    row || {};

  const {
    type,
    value: { event },
  } = context || {};

  const shortenText = (text, maxLength) => {
    const long = text?.length > maxLength;
    if (long) {
      return `${text.substring(0, maxLength)} ...`;
    }
    return text;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(createAt).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="left">{author}</TableCell>
        <TableCell align="left">{shortenText(summary, 25)}</TableCell>
        <TableCell align="center">{status.toString()}</TableCell>
        <TableCell align="center">
          {moment(updateAt).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">
          <DeleteIcon />
        </TableCell>
      </TableRow>
      <TableRow style={{ background: "lightgray" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1, paddingLeft: 8 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>Descripcion completa: {summary}</TableRow>
                  {event && <TableRow>Evento: {event}</TableRow>}

                  <TableRow>type: {type}</TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ list }) {
  return (
    <TableContainer component={Paper} style={{ width: 1000 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Creado</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Modificado</TableCell>
            <TableCell align="center">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, idx) => (
            <Row key={idx} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
