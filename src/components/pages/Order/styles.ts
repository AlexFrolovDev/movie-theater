import styled from "styled-components";

export const SeatFill = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25%;
  background: ${(props) =>
    props.taken ? "red" : props.selected ? "blue" : "green"};
  position: absolute;
  left: -50%;
  transform: translateY(50%) translateX(50%);
`;

export const SeatWrapper = styled.div`
  position: relative;
  width: 2em;
  height: 2em;
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  cursor: ${(props) => (props.taken ? "not-allowed" : "pointer")};
  box-shadow: ${({ selected }) =>
    selected ? "blue 0px 0px 20px 3px" : "none"};

  &:hover {
    ${SeatFill} {
      transform: translateY(calc(50% - 3px)) translateX(50%);
      box-shadow: black 0px 3px 10px 3px;
    }
  }
`;
