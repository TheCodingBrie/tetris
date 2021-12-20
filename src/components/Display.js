import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

export default function Display({ gameOver, text }) {
  return (
    <StyledDisplay gameOver={gameOver}>
      <span>{text} </span>
      <p>{gameOver}</p>
    </StyledDisplay>
  );
}
