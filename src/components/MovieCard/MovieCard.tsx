import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type MovieCardProps = {
  id: string;
  title: string;
  description?: string;
  plot?: string;
  poster: string;
  year: string | number;
  duration?: string | number;
  runtime?: string | number;
  onEditClick: (movieId: string) => void;
  onDeleteClick: (movieId: string) => void;
  scheduled?: boolean;
  scheduleId?: string;
};

const MovieCard = (props: MovieCardProps) => {
  const goToEditPage = () => {
    props?.onEditClick(props.scheduleId ? props.scheduleId : props._id);
  };
  const onDeleteClicked = () => {
    props.onDeleteClick(props._id);
  };

  return (
    <Card maxW={"sm"} maxWidth={"150px"}>
      <CardBody>
        <Image
          onClick={goToEditPage}
          src={props.poster}
          cursor={"pointer"}
          height={"120px"}
        />
        <Stack mt="6" spacing="3">
          <Heading
            size="sm"
            noOfLines={[1, 2]}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            title={props.title}
          >
            {props.title}
          </Heading>
          <Flex direction="column">
            {props.scheduled ? (
              <Text as="b" fontSize={"smaller"}>
                {new Date(props.from).toLocaleDateString()} &nbsp; {new Date(props.from).toLocaleTimeString()}
              </Text>
            ) : null}
            <Text as="b" fontSize={"smaller"}>
              Duration: {props.runtime}m
            </Text>
          </Flex>
          <Text
            size={"sm"}
            noOfLines={[1, 2, 3]}
            maxHeight={"3em"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            title={props.plot}
          >
            {props.plot}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {props.disableDelete ? null : (
          <IconButton
            aria-label="Delete Movie"
            colorScheme="red"
            icon={<DeleteForeverIcon color="error" />}
            onClick={onDeleteClicked}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
