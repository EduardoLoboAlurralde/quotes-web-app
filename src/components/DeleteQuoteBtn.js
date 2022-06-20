import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteQuoteBtn({ id }) {
  const deleteQuote = async (id = {}) => {
    const url = `http://localhost:3006/api/quotes/${id}`;
    try {
      await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("error", e.message);
    }
  };

  return (
    <IconButton aria-label="delete" onClick={() => deleteQuote(id)}>
      <DeleteIcon />
    </IconButton>
  );
}
