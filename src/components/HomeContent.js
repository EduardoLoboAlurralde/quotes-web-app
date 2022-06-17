import Separator from "./Separator";
import Table from "../components/Table";

export default function HomeContent({ data }) {
  const { total, quotes } = data || {};

  // eslint-disable-next-line no-unused-vars
  const postData = async (data = {}) => {
    const url = "http://localhost:3006/api/quotes";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const newQuoteBody = {
    author: "Albus Dumbledore",
    category: "BOOK",
    summary:
      "Tiempos oscuros y difíciles nos aguardan. Pronto deberemos elegir entre lo que es correcto y lo que es fácil",
    context: {
      type: "BOOK_REFERENCE",
      value: {
        event: "Harry Potter y el cáliz de fuego",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Alto de la ventana
        width: "100vw", // Ancho de la ventana
        justifyContent: "center",
        alignItems: "center",
        background: "grey",
      }}
    >
      <div>
        {/*//que se puede hacer en esta pagina*/}
        <p style={{ fontSize: 45, color: "darkgray" }}>Quotes</p>
        <p style={{ fontSize: 25 }}>Lista de frases ({total})</p>
        <Separator height />
        <button
          style={{ width: 150, height: 30 }}
          onClick={() => postData(newQuoteBody)}
        >
          Agregar Frase +
        </button>
        <Separator height />
        <Table list={quotes} />
        <Separator height />
      </div>
    </div>
  );
}
