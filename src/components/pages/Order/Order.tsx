import { Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SeatsManager from "../../SeatsManager";
import { API_BASE_URL } from "../../../consts";
import axios from "axios";

const Order = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSeatSelect = (idx) => {
    setSelectedSeat(idx);
  };

  const onOrderClick = () => {
    if (!schedule || selectedSeat === null) return;
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/order`, {
        scheduleId: schedule._id,
        seatIdx: selectedSeat,
      })
      .then(() => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/movies/scheduled/${params.scheduleId}`)
      .then((response) => {
        setSchedule(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return schedule ? (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Image src={schedule.movie.poster} height={"100px"} width={"100px"} />
      <Heading size="md">{schedule.movie.title}</Heading>
      <Heading size="md">{new Date(schedule.from).toLocaleString()}</Heading>
      <Flex gap={"5em"} marginBottom={"3em"}>
        <SeatsManager seats={schedule.seats} onSeatSelected={onSeatSelect} />
      </Flex>
      <Center marginBottom={"3em"}>
        <Button
          size="lg"
          color="blue"
          isDisabled={
            selectedSeat === null || !schedule.seats[selectedSeat] || loading
          }
          onClick={onOrderClick}
        >
          Order
        </Button>
      </Center>
    </Flex>
  ) : null;
};

export default Order;
