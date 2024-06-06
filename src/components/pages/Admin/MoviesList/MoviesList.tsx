import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "../../../MovieCard";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link, useNavigate } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWorking(true);
    axios
      .get("http://localhost:3030/api/movies/list")
      .then((response) => {
        setMovies(response.data.movies);
      })
      .finally(() => setWorking(false));
  }, []);

  const onMovieEditClick = useCallback(
    (movieId: string) => {
      navigate(`/admin/edit-movie/${movieId}`);
    },
    [movies]
  );

  const onMovieDeleteClick = useCallback(
    (movieId: string) => {
      setWorking(true);
      axios
        .delete(`http://localhost:3030/api/movies/${movieId}`)
        .then((response) => {
          setMovies(response.data.movies);
        })
        .catch((e) => {
          alert("Server error!");
        })
        .finally(() => {
          setWorking(false);
        });
    },
    [movies]
  );

  return (
    <Flex direction={"column"}>
      <Flex>
        <Button colorScheme="blue" leftIcon={<AddOutlinedIcon />}>
          <Link to={"./add-movie"}>Add Movie</Link>
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
          return (
            <MovieCard
              key={movie.id}
              {...movie}
              onEditClick={onMovieEditClick}
              onDeleteClick={onMovieDeleteClick}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MoviesList;
