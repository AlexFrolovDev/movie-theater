import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Center,
  Heading,
  Textarea,
  Flex,
  Text,
  Image,
  Select,
  InputGroup,
  Divider,
  Table,
  Checkbox,
  IconButton,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../consts";

const ScheduleForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    setError,
  } = useForm();

  const watchedFromDate = watch("fromDate");
  const watchedSelectedMovie = watch("movie");

  const onSubmit = () => {
    const values = getValues();

    props?.onSubmit({ ...movie, ...values });
  };

  const getMovieById = (id) => movies.find((_movie) => _movie.id === id);
  const getSchedulesForMovie = (movieId) =>
    schedules.filter((schedule) => schedule.movieId === movieId);

  const checkScheduleAvailability = (from, to) => {
    setLoading(true);
    return axios
      .get(`${API_BASE_URL}/schedules/check-availability`, { from, to })
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        return false;
      });
  };

  const addSchedule = () => {
    const selectedMovie = getMovieById(getValues("movie"));
    const from = new Date(watchedFromDate)?.getTime();
    const to = from + selectedMovie?.runtime * 60000;

    setLoading(true);
    axios
      .post(`${API_BASE_URL}/schedules`, {
        movieId: getValues("movie"),
        from,
        to,
      })
      .then((response) => {
        setSchedules(response.data);
        return response.data;
      })
      .finally(() => {
        setLoading(false);
        return false;
      });
  };

  const geTdateBlockForSelectedMovie = () => {
    const selectedMovie = getMovieById(getValues("movie"));

    return selectedMovie ? (
      <InputGroup>
        <FormControl isInvalid={!!errors.fromDate}>
          <FormLabel htmlFor="fromDate">Start</FormLabel>
          <Input
            id="fromDate"
            type="datetime-local"
            {...register("fromDate", {
              required: "This is required",
              validate: {
                notPast: (value) => {
                  console.log(value);
                },
              },
            })}
          />
          <FormErrorMessage>
            {!!errors.fromDate && (errors.fromDate.message as string)}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="toDate">End</FormLabel>
          <Input
            id="toDate"
            type="datetime"
            disabled
            {...register("toDate", {})}
          />
        </FormControl>
      </InputGroup>
    ) : null;
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API_BASE_URL}/schedules`),
      axios.get(`${API_BASE_URL}/movies/list`),
    ]).then((results) => {
      setMovies(results[1].data.movies);
      setSchedules(results[0].data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setValue("fromDate", undefined);
  }, [watchedSelectedMovie]);

  useEffect(() => {
    if (watchedFromDate) {
      const selectedMovie = getMovieById(getValues("movie"));
      const selectedStarTdate = new Date(watchedFromDate)?.getTime();
      const endDate = selectedStarTdate + selectedMovie?.runtime * 60000;

      setValue("toDate", new Date(endDate).toLocaleString());

      checkScheduleAvailability(selectedStarTdate, endDate).then((res) => {
        console.log(res);
        if (res.data === false) {
          alert("Schedule time overtlap !");
          setError("fromDate", { message: "Schedule overlap !" });
        }
      });
    } else {
      setValue("toDate", undefined);
    }
  }, [watchedFromDate]);

  const isAddScheduleEnabled = getValues("movie") && watchedFromDate;

  return (
    <Container paddingTop={"3em"} maxWidth={"80%"}>
      <Center>
        <Heading>Movie Schedules</Heading>
      </Center>
      <Box paddingTop={"3em"}>
        {loading ? (
          <Heading>Loading Data...</Heading>
        ) : (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1em" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading size={"sm"} textAlign={"center"}>
              New Schedule
            </Heading>
            <FormControl isInvalid={!!errors.movie}>
              <FormLabel htmlFor="movie">Movie</FormLabel>
              <Select
                id="movie"
                {...register("movie", {
                  required: "This is required",
                })}
                placeholder="Choose a movie to schedule"
              >
                {movies.map((movie) => {
                  return (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {!!errors.movie && (errors.movie.message as string)}
              </FormErrorMessage>
            </FormControl>
            {geTdateBlockForSelectedMovie()}

            <Divider />

            {schedules.length > 0 ? (
              <>
                <Heading size={"sm"} textAlign={"center"}>
                  All Schedules
                </Heading>
                <Table maxHeight={"300px"}>
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Movie</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Duration</Th>
                      <Th>&nbsp;</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {schedules.map((schedule) => {
                      const movie = getMovieById(schedule.movieId);
                      if (!movie) return;
                      return (
                        <Tr>
                          <Td>
                            <Checkbox />
                          </Td>
                          <Td>{movie.title}</Td>
                          <Td>{new Date(schedule.from).toLocaleString()}</Td>
                          <Td>{new Date(schedule.to).toLocaleString()}</Td>
                          <Td>{movie.runtime}(min)</Td>
                          <Td>
                            <IconButton
                              size={"sm"}
                              onClick={() => console.log("deleting")}
                              aria-label="Delete Schedule"
                              colorScheme="red"
                              icon={<DeleteForeverIcon color="error" />}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </>
            ) : null}

            <Button
              type="submit"
              isLoading={isSubmitting}
              onClick={addSchedule}
              disabled={!isAddScheduleEnabled}
            >
              Add
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ScheduleForm;
