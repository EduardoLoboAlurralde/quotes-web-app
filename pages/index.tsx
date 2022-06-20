import React from "react";
import Head from "next/head";
import HomeContent from "../src/components/HomeContent";

//todo esto llevar al componente para manejar la paginacion
const defaultEndpoint = "http://localhost:3006/api/quotes?limit=20& from=0";
export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Quotes App</title>
        <meta name="Quotes app description" content="Quotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HomeContent data={data} />
      </div>
    </div>
  );
}
