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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const MovieForm = (props) => {
  const { movie = {}, mode } = props;
  const [currentPoster, setCurrentPoster] = useState(movie.poster);
  const posterRef = useRef(null);

  movie.description = movie.plot;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm();

  const onSubmit = () => {
    const values = getValues();

    props?.onSubmit({ ...movie, ...values });
  };

  const watchedImage = watch("poster");

  const onPosterInputChange = () => {
    const url = getValues("poster");

    setCurrentPoster(url || movie.poster);
  };

  const resetPoster = () => {
    setValue("poster", undefined);
  };

  useEffect(() => {
    const values = getValues();

    Object.keys(values).forEach((key) => {
      setValue(key, movie[key]);
    });
  }, []);

  useEffect(() => {
    onPosterInputChange();
  }, [watchedImage]);

  return (
    <Container paddingTop={"3em"}>
      <Center>
        <Heading>Editing Movie</Heading>
      </Center>
      <Box>
        <Flex justifyContent={"center"}>
          <Image src={currentPoster} height={"200px"} />
        </Flex>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1em" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              placeholder="Title"
              {...register("title", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {!!errors.title && (errors.title.message as string)}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              maxLength={512}
              maxH={300}
              id="description"
              placeholder="Description"
              {...register("description", {
                required: "This is required",
                maxLength: { value: 512, message: "Maximum 512 symbols" },
              })}
            />
            <FormErrorMessage>
              {!!errors.description && (errors.description.message as string)}
            </FormErrorMessage>
          </FormControl>
          <Flex gap={"1em"} alignItems={"end"}>
            <FormControl isInvalid={!!errors.poster}>
              <FormLabel htmlFor="poster">Poster(optional)</FormLabel>
              <Input
                type="text"
                id="poster"
                {...register("poster", {
                  min: { value: 1, message: "This is required" },
                })}
              />
              <FormErrorMessage>
                {!!errors.poster && (errors.poster.message as string)}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="red" onClick={resetPoster}>
              Clear
            </Button>
          </Flex>
          <Button type="submit" isLoading={isSubmitting}>
            {mode === "new" ? "Create" : "Edit"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MovieForm;
