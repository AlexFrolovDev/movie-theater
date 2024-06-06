import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../consts";
import { Flex } from "@chakra-ui/react";
import MovieCard from "../../MovieCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const onCardClick = (id) => {
    navigate(`/order-movie/${id}`);
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies/scheduled`).then((response) => {
      setMovies(response.data);
    });
  }, []);

  console.log(movies);

  return (
    <Flex direction={"column"}>
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
