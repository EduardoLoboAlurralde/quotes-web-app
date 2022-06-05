import Colors from "../constants/Colors";

import styled from "styled-components";

export default function IconBtn() {
  const Button = styled.button`
    width: 150px;
    box-shadow: 2px 2px 10px #000;
    background-color: ${Colors.b11};
    border-radius: 8px;
    border-width: 0;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding: 13px 32px;
    text-decoration: none;
    &:hover {
      background-color: ${Colors.b05};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;

  return <Button>Eliminar</Button>;
}
