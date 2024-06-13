import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../../consts";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import MovieCard from "../../MovieCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const mounted = useRef(false);
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("desc");
  const [fromDate, setFromDate] = useState(getMinFromDateString());
  const [toDate, setToDate] = useState();

  const loadMoviesList = () => {
    axios
      .get(`${API_BASE_URL}/movies/scheduled`, {
        params: {
          order,
          from: new Date(fromDate),
          to: toDate ? new Date(toDate) : undefined,
        },
      })
      .then((response) => {
        setMovies(response.data);
      });
  };

  const onCardClick = (id) => {
    navigate(`/order-movie/${id}`);
  };

  function getMinFromDateString() {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];

    return dateString;
  }

  useEffect(() => {

    return () => {
        mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if(!mounted.current) return;

    loadMoviesList();
  }, [order, fromDate, toDate]);


  return (
    <Flex direction={"column"}>
      <Flex justifyContent={"center"} alignItems={'end'} gap={3} marginTop={"3em"}>
        <Box>
          <FormControl>
            <FormLabel>Order</FormLabel>
            <Select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>From</FormLabel>
            <Input
              type="date"
              value={fromDate}
              min={getMinFromDateString()}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>To</FormLabel>
            <Input
              type="date"
              value={toDate}
              min={getMinFromDateString()}
              onChange={(e) => setToDate(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button>Reset</Button>
      </Flex>
      <Flex
        gap="1em"
        justifyContent={"center"}
        flexWrap={"wrap"}
        overflowY={"auto"}
        maxHeight={"100%"}
        padding={"1em"}
      >
        {movies.map((movie) => {
          return (
            <MovieCard
              onEditClick={onCardClick}
              scheduled
              key={movie.id}
              disableDelete
              {...movie}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Home;
