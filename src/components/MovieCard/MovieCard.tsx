import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
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
  description: string;
  poster: string;
};

const MovieCard = (props: MovieCardProps) => {
  return (
    <Card maxW={"sm"} maxWidth={"150px"}>
      <CardBody>
        <Image onClick={() => console.log("clicked")} src={props.poster} cursor={"pointer"} height={"120px"} />
        <Stack mt="6" spacing="3">
          <Heading
            size="sm"
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            title={props.plot}
          >
            {props.title}
          </Heading>
          <Text
            size={"sm"}
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
        <IconButton
          onClick={props.onDelete}
          aria-label="Delete Movie"
          colorScheme="red"
          icon={<DeleteForeverIcon color="error" />}
        />
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
