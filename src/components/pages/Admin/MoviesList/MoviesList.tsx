import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "../../../MovieCard";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../../consts";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [working, setWorking] = useState(false);
  const [filter, setFilter] = useState();
  const navigate = useNavigate();

  const onFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

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
        .delete(`${API_BASE_URL}/movies/${movieId}`)
        .then((response) => {
          setMovies(response.data);
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

  const filteredList = movies.filter((m) => m.title.toLowerCase().includes(filter))

  return (
    <Flex direction={"column"} alignItems={'center'}>
      <Center mt={5}>
        <FormLabel for='filter-input'>Filter:</FormLabel>
        <Input id='filter-input' size='sm' onChange={onFilterChange} value={filter} />
      </Center>
      <Flex
        gap="1em"
        justifyContent={"center"}
        flexWrap={"wrap"}
        overflowY={"auto"}
        maxHeight={"100%"}
        padding={"1em"}
      >
        {filteredList.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
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
