import Separator from "./Separator";
import Table from "../components/Table";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import CreateQuoteDialog from "./CreateQuoteDialog";

export default function HomeContent({ data }) {
  const { total, quotes } = data || {};

  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [quotesList, setQuotesList] = useState(quotes);

  // eslint-disable-next-line no-unused-vars
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
      console.log("response", response?.status);
      setLoading(false);
      if (response?.status === 201) {
        setShowSuccess(true);
      }
      // return response.json(); // parses JSON response into native JavaScript objects
    } catch (e) {
      console.log("error", e.message);
      setLoading(false);
      setError(e.message);
    }
  };

  const fetchQuotes = async (data = {}) => {
    const url = "http://localhost:3006/api/quotes";

    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

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
          <LoadingButton
            loading={loading}
            // loadingPosition="start"
            // loadingIndicator="Loading..."
            variant="contained"
            // onClick={() => postData(newQuoteBody)}
            onClick={() => setOpenModal(true)}
            // startIcon={<SaveIcon />}
          >
            Agregar Frase +
          </LoadingButton>
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
        onSave={(quote) => postData(quote)}
      />
    </div>
  );
}
