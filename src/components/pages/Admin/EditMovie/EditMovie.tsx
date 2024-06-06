import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../../consts";
import axios from "axios";
import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import MovieForm from "../../../MovieForm";

const EditMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (movie = {}) => {
    console.log(movie);
    axios.put(`${API_BASE_URL}/movies`, { movie }).then((response) => {
      if (response.status === 200) {
        navigate(-1);
      }
    });
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies/${params.movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return (
    <Flex direction={"column"}>
      <ChakraProvider>
        {movie ? (
          <MovieForm movie={movie} onSubmit={onSubmit} />
        ) : (
          <Heading>Loading...</Heading>
        )}
      </ChakraProvider>
    </Flex>
  );
};

export default EditMovie;
