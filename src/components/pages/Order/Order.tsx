import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatsManager from "../../SeatsManager";

const Order = () => {
  const params = useParams();

  useEffect(() => {}, []);

  return (
    <Flex direction={"column"}>
      <SeatsManager seats={Array(100).fill(0)} />
    </Flex>
  );
};

export default Order;
