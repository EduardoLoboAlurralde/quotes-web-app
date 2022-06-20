import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Separator from "./Separator";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import CustomDialog from "./CustomDialog";

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

export const LengthLabel = ({ length, maxLength, children }) => {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div
        style={{
          position: "absolute",
          right: 15,
          bottom: -10,
          background: "white",
          width: 50,
        }}
      >
        <Typography style={{ fontSize: "10pt", textAlign: "center" }}>
          {length} / {maxLength}
        </Typography>
      </div>
    </div>
  );
};
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

  const MAX_AUTHOR_LENGTH = 30;
  const MAX_SUMMARY_LENGTH = 50;

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

  const enableSave = () => {
    const checkSummary = quote.summary.length > 10;
    const checkCategory = quote.category.length > 0;
    const checkType = context.type.length > 0;

    return checkCategory && checkSummary && checkType;
  };

  return (
    <CustomDialog
      title={"Crea una nueva Frase"}
      onClose={onClose}
      isVisible={isVisible}
      firstAction={onPressSave}
      firstBtn={"Guardar Frase"}
      firstBtnDisabled={!enableSave()}
    >
      <Typography gutterBottom>
        Completa los campos para crear la frase
      </Typography>
      <Separator height />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            select
            label="Categoria"
            value={quote.category}
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
          <LengthLabel
            length={quote.author.length}
            maxLength={MAX_AUTHOR_LENGTH}
          >
            <TextField
              label="Autor"
              color="secondary"
              focused
              style={{ width: 420 }}
              onChange={(selected) =>
                setQuote({ ...quote, author: selected.target.value })
              }
            />
          </LengthLabel>
        </div>
        <Separator height />
        <LengthLabel
          length={quote.summary.length}
          maxLength={MAX_SUMMARY_LENGTH}
        >
          <TextField
            style={{ width: 600 }}
            id="standard-multiline-static"
            label="Texto de frase"
            color="secondary"
            multiline
            inputProps={{
              maxLength: MAX_SUMMARY_LENGTH,
            }}
            rows={4}
            variant="outlined"
            onChange={(selected) =>
              setQuote({ ...quote, summary: selected.target.value })
            }
          />
        </LengthLabel>
        <Separator height />
        <Typography gutterBottom>Contexto</Typography>
        <Separator height x={0.5} />
        <TextField
          id="outlined-select-currency"
          select
          label="Tipo"
          value={context.type}
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
    </CustomDialog>
  );
}
