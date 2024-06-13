import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import MovieForm from "../../../MovieForm";
import { API_BASE_URL } from "../../../../consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const onSubmit = (movie = {}) => {
    axios
      .post(`${API_BASE_URL}/movies`, {
        movie: { ...movie, plot: movie.description },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/admin');
        }
      });
  };
  return (
    <Flex direction={"column"}>
      <ChakraProvider>
        <MovieForm mode="new" onSubmit={onSubmit} />
      </ChakraProvider>
    </Flex>
  );
};

export default AddMovie;
