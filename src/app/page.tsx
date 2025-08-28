"use client";
import QuotesTable from "@/components/Quotes/QuotesTable";

export default function HomePage() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
          alignItems: "center",
          background: "grey",
        }}
      >
        <h1>Quotes</h1>
        <QuotesTable initialLimit={5} />
      </div>
    </main>
  );
}
