import { Center, Container, Divider, Flex, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { SeatFill, SeatWrapper } from "../pages/Order/styles";

const SeatsManager = (props) => {
  const { seats = [] } = props;
  return (
    <Flex direction={"column"} marginTop={"5em"} alignItems={'center'}>
      <Divider borderBottom="5px solid black" marginBottom={"1em"} maxWidth='80%' />
      <Center marginBottom={"3em"}>
        <Heading size={'sm'}>Screen</Heading>
      </Center>
      <Grid
        templateColumns={"repeat(10, 1fr)"}
        templateRows={"repeat(10, 1fr)"}
        gap={5}
      >
        {seats.map((seat) => {
          return (
            <SeatWrapper>
              <SeatFill></SeatFill>
            </SeatWrapper>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default SeatsManager;
