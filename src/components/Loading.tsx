import React, { JSX } from "react";
import Lottie from "lottie-react";
import lottieLoading from "./three-dots-loading.json";

export default function Loading(): JSX.Element {
  return (
    <div
      style={{
        width: 200,
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        animationData={lottieLoading}
        style={{ width: 200, margin: -10 }}
      />
      <p style={{ fontSize: "14pt" }}>loading</p>
    </div>
  );
}
