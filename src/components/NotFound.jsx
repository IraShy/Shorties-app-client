import React from "react";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const NotFound = () => {
  return (
    <Bounce className="container">
      <h1 className="bounce">Not found!</h1>
    </Bounce>
  );
};

export default NotFound;
