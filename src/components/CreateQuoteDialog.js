import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Separator from "./Separator";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const ariaLabel = { "aria-label": "description" };

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

//remplazar por respuesta GET
const categorias = [
  {
    value: "HISTORY",
    label: "Historia",
  },
  {
    value: "MUSIC",
    label: "Música",
  },
  {
    value: "BOOK",
    label: "Libro",
  },
  {
    value: "MOVIE",
    label: "Pelicula",
  },
];

const type = [
  {
    value: "HISTORICAL_EVENT",
    label: "Evento Histórico",
  },
  {
    value: "MUSIC_PIECE",
    label: "Pieza musical",
  },
  {
    value: "MOVIE",
    label: "Pelicula",
  },
  {
    value: "TV_SHOW",
    label: "Programa de televisión",
  },
  {
    value: "BOOK_REFERENCE",
    label: "Literatura",
  },
];
export default function CreateQuoteDialog({
  isVisible,
  onClose = () => "",
  onSave = () => "",
}) {
  const [context, setContext] = useState({
    type: "",
    value: {
      event: "",
    },
  });
  const [quote, setQuote] = useState({
    author: "",
    category: "",
    summary: "",
  });

  const newQuote = {
    ...quote,
    context,
  };

  const onCloseModal = () => {
    setContext({
      type: "",
      value: {
        event: "",
      },
    });
    setQuote({
      author: "",
      category: "",
      summary: "",
    });
    onClose();
  };

  const onPressSave = () => {
    onSave(newQuote);
    onCloseModal();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onCloseModal}
        aria-labelledby="customized-dialog-title"
        open={isVisible}
        maxWidth={"lg"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={onCloseModal}
        >
          Crea una nueva Frase
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Completa los campos para crear la frase
          </Typography>
          <Separator height />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Categoria"
                value={quote.category}
                // helperText="Please select your currency"
                onChange={(selected) =>
                  setQuote({ ...quote, category: selected.target.value })
                }
                style={{ width: 150 }}
              >
                {categorias.map((option, idx) => (
                  <MenuItem key={idx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Separator width />
              <TextField
                label="Autor"
                color="secondary"
                focused
                style={{ width: 420 }}
                onChange={(selected) =>
                  setQuote({ ...quote, author: selected.target.value })
                }
              />
            </div>
            <Separator height />

            <TextField
              style={{ width: 600 }}
              id="standard-multiline-static"
              label="Texto de frase"
              color="secondary"
              multiline
              rows={4}
              variant="outlined"
              onChange={(selected) =>
                setQuote({ ...quote, summary: selected.target.value })
              }
            />

            <Separator height />
            <Typography gutterBottom>Contexto</Typography>
            <Separator height x={0.5} />
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo"
              value={context.type}
              // helperText="Please select your currency"
              onChange={(selected) =>
                setContext({ ...context, type: selected.target.value })
              }
              style={{ width: 250 }}
            >
              {type.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Separator height />
            <TextField
              label="Evento"
              color="secondary"
              focused
              style={{ width: 420 }}
              onChange={(selected) =>
                setContext({
                  ...context,
                  value: { ...context.value, event: selected.target.value },
                })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={onPressSave}
            variant={"outlined"}
            color={"secondary"}
          >
            Guardar Frase
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
