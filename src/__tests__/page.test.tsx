import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import React from "react";

describe("Home", () => {
  it("renders a heading", () => {
    render((<Home />) as React.ReactElement);

    expect(screen.getByRole("heading")).toHaveTextContent("Hola");
  });
});
