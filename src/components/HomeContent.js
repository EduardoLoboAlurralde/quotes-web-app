import Separator from "./Separator";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import CreateQuoteDialog from "./CreateQuoteDialog";
import { Button } from "@mui/material";

export default function HomeContent({ data }) {
  const { total, quotes } = data || {};

  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState();
  const [quotesList, setQuotesList] = useState(quotes);

  // eslint-disable-next-line no-unused-vars
  const fetchQuotes = async (data = {}) => {
    setRefetch(false);
    try {
      const url = "http://localhost:3006/api/quotes";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setQuotesList(data.quotes);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (quotesList.length === 0 || refetch === true) {
      (async () => {
        await fetchQuotes();
      })();
    }
  }, [quotesList, refetch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Alto de la ventana
        width: "100vw", // Ancho de la ventana
        alignItems: "center",
        background: "grey",
      }}
    >
      <div>
        {/*//que se puede hacer en esta pagina*/}
        <p style={{ fontSize: 45, color: "darkgray" }}>Quotes</p>
        <p style={{ fontSize: 25 }}>Lista de frases ({total})</p>
        <Separator height />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: 1000,
          }}
        >
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Agregar Frase +
          </Button>
        </div>

        <Separator height />
        <Table list={quotesList} total={total} />
        <Separator height />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      {showSuccess && (
        <div style={{ position: "absolute", top: "10vh" }}>
          <Alert onClose={() => setShowSuccess(false)}>Quote creada</Alert>
        </div>
      )}
      <CreateQuoteDialog
        isVisible={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          setShowSuccess(true);
          setRefetch(true);
        }}
      />
    </div>
  );
}
