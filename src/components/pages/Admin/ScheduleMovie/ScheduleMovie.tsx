import { ChakraProvider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ScheduleForm from "../../../ScheduleForm";
import axios from "axios";
import { API_BASE_URL } from "../../../../consts";

const ScheduleMovie = () => {
  return (
    <Flex direction={"column"}>
      <ChakraProvider>
        <ScheduleForm />
      </ChakraProvider>
    </Flex>
  );
};

export default ScheduleMovie;
