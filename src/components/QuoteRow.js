import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import DeleteQuoteBtn from "./DeleteQuoteBtn";

export default function QuoteRow({ row }) {
  const [open, setOpen] = useState(false);
  const {
    author,
    category,
    context,
    createAt,
    status,
    summary,
    updateAt,
    _id,
  } = row || {};
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
    <>
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
          <DeleteQuoteBtn id={_id} />
        </TableCell>
      </TableRow>
      <TableRow style={{ background: "lightgray" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1, paddingLeft: 8 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      Descripcion completa: {summary}
                    </TableCell>
                  </TableRow>

                  {!!event && (
                    <TableRow>
                      <TableCell align="left"> Evento: {event} </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
