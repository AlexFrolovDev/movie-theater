import { Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Flex gap={"1em"} justifyContent={"center"}>
      <Link to="/">
        <Text as={pathname === "/" ? "b" : "span"} cursor={"pointer"}>
          Home
        </Text>
      </Link>
      <Link to="admin/add-movie">
        <Text
          as={pathname === "/admin/add-movie" ? "b" : "span"}
          cursor={"pointer"}
        >
          Add Movie
        </Text>
      </Link>
      <Link to="/admin">
        <Text as={pathname === "/admin" ? "b" : "span"} cursor={"pointer"}>
          Movies List
        </Text>
      </Link>
    </Flex>
  );
};

export default Header;
