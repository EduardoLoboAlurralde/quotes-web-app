import Head from "next/head";
import HomeContent from "../src/components/HomeContent";

const defaultEndpoint = "http://localhost:3006/api/quotes";

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

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Quotes App</title>
        <meta name="Quotes app description" content="Quotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent data={data} />
    </div>
  );
}
