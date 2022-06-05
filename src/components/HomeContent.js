import Colors from "../constants/Colors";
import Separator from "./Separator";
import QuoteCard from "./QuoteCard";

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
    author: "Napoleon",
    category: "HISTORY",
    summary: "Visteme despacio que estoy apurado",
    context: {
      type: "HISTORICAL_EVENT",
      value: {
        event: "Revolución Argentina",
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: Colors.a15,
      }}
    >
      <div>
        {/*//que se puede hacer en esta pagina*/}
        <p style={{ fontSize: 45, color: Colors.b08 }}>Quotes</p>
        <p style={{ fontSize: 25 }}>Lista de frases ({total})</p>
        <Separator height />
        <button
          style={{ width: 150, height: 30 }}
          onClick={() => postData(newQuoteBody)}
        >
          Agregar Frase +
        </button>
        <Separator height />
        {quotes.map((qt, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <QuoteCard quote={qt} />
              <Separator height x={0.5} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
