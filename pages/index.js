import Head from "next/head";

const defaultEndpoint = "http://localhost:3006/api/quotes";

export async function getServerSideProps(context) {
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
  console.log(data);
  return (
    <div>
      <Head>
        <title>Quotes App</title>
        <meta name="Quotes app description" content="Quotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: 500,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <text style={{ fontSize: 45 }}>Quotes</text>
        </div>
      </div>
    </div>
  );
}
