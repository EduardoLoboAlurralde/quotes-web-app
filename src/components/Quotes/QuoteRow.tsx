"use client";
import React, { useState } from "react";
import { Quote } from "@/types/Quotes";

const QuoteRow: React.FC<{ row: Quote }> = ({ row }) => {
  const { author, summary, category, type, context } = row;
  const categoryName: string | undefined = category?.name;
  const typeName: string | undefined = type?.name;

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fila principal */}
      <tr style={{ height: 50 }}>
        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
          {categoryName}
        </td>
        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
          {typeName}
        </td>
        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
          {author}
        </td>
        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
          {summary}
        </td>
        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "2px 6px",
              cursor: "pointer",
              display: summary ? "flex" : "none",
            }}
          >
            {open ? "−" : "+"}
          </button>
        </td>
      </tr>

      {/* Sub–row expandible */}
      {open && context && (
        <tr>
          <td colSpan={5} style={{ padding: "8px", background: "#f9f9f9" }}>
            <div style={{ marginLeft: "32px", fontSize: "0.9em" }}>
              {Object.entries(context).map(([key, value]) =>
                value ? (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ) : null,
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default QuoteRow;
