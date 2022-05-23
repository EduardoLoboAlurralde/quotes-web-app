import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Quotes App</title>
        <meta name="Quotes app description" content="Quotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          background: "grey",
          width: "100%",
          display: "flex",
          height: 500,
          justifyContent: "center",
        }}
      >
        hello
      </div>
    </div>
  );
}
