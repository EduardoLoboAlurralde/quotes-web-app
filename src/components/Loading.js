import React from "react";
import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import lottieLoading from "./three-dots-loading.json";

export default function Loading() {
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
      <Typography style={{ fontSize: "14pt" }}>loading</Typography>
      <Lottie animationData={lottieLoading} style={{ width: 200,  margin: -10 }} />
    </div>
  );
}
