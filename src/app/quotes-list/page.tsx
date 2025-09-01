"use client";
import QuotesTable from "@/components/Quotes/QuotesTable";
import { QuotesAdminProvider } from "@/components/Quotes/QuotesAdminContext";
import Background from "@/components/Background";

export default function QuotesList() {
  return (
    <QuotesAdminProvider>
      <Background>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100vw",
            alignItems: "center",
            // background: "grey",
          }}
        >
          <h1>Quotes</h1>
          <QuotesTable />
        </div>
      </Background>
    </QuotesAdminProvider>
  );
}
