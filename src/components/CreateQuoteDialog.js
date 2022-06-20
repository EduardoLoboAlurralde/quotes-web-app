import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Separator from "./Separator";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import CustomDialog from "./CustomDialog";

//this to traslation
const CATEGORIES = {
  HISTORY: "História",
  MUSIC: "Música",
  BOOK: "Libro",
  MOVIE: "Pelicula",
};

//this to traslation
const TYPES = {
  HISTORICAL_EVENT: "Evento Histórico",
  MUSIC_PIECE: "Pieza musical",
  MOVIE: "Pelicula",
  TV_SHOW: "Programa de televisión",
  BOOK_REFERENCE: "Literatura",
};

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
  onSuccess = () => "",
}) {
  const [categories, setCategories] = useState([]);
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

  const categoriesObject = categories?.length
    ? categories?.map((cat) => {
        return {
          ...cat,
          label: CATEGORIES[cat.name],
        };
      })
    : [];

  useEffect(() => {
    if (categories.length === 0) {
      (async () => {
        try {
          const res = await fetch("http://localhost:3006/api/categories");
          const data = await res.json();
          setCategories(data.categories);
        } catch (e) {
          console.log(e.message);
        }
      })();
    }
  }, [categories]);

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

  const enableSave = () => {
    const checkSummary = quote.summary.length > 10;
    const checkCategory = quote.category.length > 0;
    const checkType = context.type.length > 0;

    return checkCategory && checkSummary && checkType;
  };
  const [loading, setLoading] = useState(false);

  const postData = async (data = {}) => {
    const url = "http://localhost:3006/api/quotes";
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      console.log("response", response);
      setLoading(false);
      if (response?.status === 201) {
        onSuccess();
      }
    } catch (e) {
      console.log("error", e.message);
      setLoading(false);
    }
  };

  const onPressSave = async (saveQuote) => {
    // console.log("onPressSave");
    await postData(saveQuote);
    onCloseModal();
  };

  return (
    <CustomDialog
      title={"Crea una nueva Frase"}
      onClose={onClose}
      isVisible={isVisible}
      firstAction={() => onPressSave(newQuote)}
      firstBtn={"Guardar Frase"}
      firstBtnDisabled={!enableSave()}
      loading={loading}
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
            {categoriesObject.map((option, idx) => (
              <MenuItem key={idx} value={option.name}>
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
          value={context.value.event}
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
