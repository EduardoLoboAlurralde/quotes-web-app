import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteQuoteBtn({ id }) {
  const deleteQuote = async (id = {}) => {
    const url = `http://localhost:3006/api/quotes/${id}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });
      // return response.json(); // parses JSON response into native JavaScript objects
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
