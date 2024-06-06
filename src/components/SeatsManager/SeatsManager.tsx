import {
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SeatFill, SeatWrapper } from "../pages/Order/styles";

const SeatsManager = (props) => {
  const { seats = [] } = props;
  const [selectedSeat, setSelectedSeat] = useState(null);

  const onSeatClick = useCallback(
    (idx) => {
      if (seats[idx].taken) return;
      setSelectedSeat(selectedSeat === idx ? null : idx);
    },
    [seats, setSelectedSeat]
  );

  return (
    <Flex direction={"column"} marginTop={"1em"} alignItems={"center"}>
      <Divider
        borderBottom="5px solid black"
        marginBottom={"1em"}
        maxWidth="80%"
      />
      <Center marginBottom={"3em"}>
        <Heading size={"sm"}>Screen</Heading>
      </Center>
      <Grid
        templateColumns={"repeat(10, 1fr)"}
        templateRows={"repeat(10, 1fr)"}
        gap={5}
        padding={"0 1em"}
        maxHeight={'400px'}
        overflowY={"auto"}
      >
        {seats.map((seat, idx) => {
          return (
            <Seat
              taken={seat.taken}
              selected={selectedSeat === idx}
              idx={idx}
              onSeatClick={onSeatClick}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

const Seat = React.memo((props) => {
  const { taken, selected, idx, onSeatClick } = props;
  return (
    <Flex direction={"column"} opacity={taken ? "0.5" : "1"}>
      <Text as="b">{idx.toString().padStart(3, "0")}</Text>
      <SeatWrapper taken={taken} selected={selected} onClick={() => onSeatClick(idx)}>
        <SeatFill taken={taken} selected={selected}></SeatFill>
      </SeatWrapper>
    </Flex>
  );
});

export default SeatsManager;
