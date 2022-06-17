import Separator from "./Separator";

import Button from "@mui/material/Button";

export default function QuoteCard({ quote }) {
  const { summary, author, category } = quote || {};

  const CATEGORY_COLOR = {
    MUSIC: "blue",
    HISTORY: "red",
    MOVIE: "orange",
  };
  return (
    <div
      style={{
        width: 800,
        padding: 15,
        borderRadius: 10,
        background: CATEGORY_COLOR[category],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "2px 2px 20px #000",
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: "14pt",
        }}
      >
        {summary}
      </p>
      <Separator height x={0.5} />
      <p style={{ color: "white", fontSize: "12pt", alignSelf: "flex-end" }}>
        {author}
      </p>
      <div style={{ width: 200 }}>
        <Button variant="contained" color={"primary"}>
          Contained
        </Button>
        <Button variant="contained" color={"secondary"}>
          Contained
        </Button>
      </div>
      {/*<IconBtn />*/}
    </div>
  );
}
