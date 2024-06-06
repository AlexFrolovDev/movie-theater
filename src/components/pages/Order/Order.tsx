import { Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SeatsManager from "../../SeatsManager";
import { API_BASE_URL } from "../../../consts";
import axios from "axios";

const Order = () => {
  const params = useParams();
  const [schedule, setSchedule] = useState(null);

  const onSeatSelect = (seatIdx) => {};

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/movies/scheduled/${params.scheduleId}`)
      .then((response) => {
        setSchedule(response.data);
      });
  }, []);

  console.log(schedule);

  return schedule ? (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Image src={schedule.movie.poster} height={"100px"} width={"100px"} />
      <Heading size="md">{schedule.movie.title}</Heading>
      <Heading size="md">{new Date(schedule.from).toLocaleString()}</Heading>
      <Flex gap={"5em"} marginBottom={"3em"} >
        <SeatsManager seats={Array(100).fill(0)} onSeatSelect={onSeatSelect} />
      </Flex>
      <Center marginBottom={"3em"}>
        <Button size="lg" color="blue">
          Order
        </Button>
      </Center>
    </Flex>
  ) : null;
};

export default Order;
