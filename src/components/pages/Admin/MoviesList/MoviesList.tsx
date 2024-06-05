import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../../../MovieCard";
import { Box, Button, Flex } from "@chakra-ui/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3030/api/movies/list").then((response) => {
      setMovies(response.data.movies);
    });
  }, []);
  return (
    <Flex direction={"column"}>
      <Flex>
        <Button colorScheme="blue" leftIcon={<AddOutlinedIcon />}>
          <Link to={'./add-movie'}>Add Movie</Link>
        </Button>
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
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </Flex>
    </Flex>
  );
};

export default MoviesList;
