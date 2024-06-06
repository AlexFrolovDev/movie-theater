import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import HeaderLink from "./HeaderLink";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Flex gap={"1em"} justifyContent={"space-between"} padding={"0 20%"}>
      <HeaderLink pathname={"/"} text={"Home"} />
      <Flex gap={"1em"} justifyContent={"end"}>
        <HeaderLink color='green' pathname={"/admin/add-movie"} text="Add Movie" />
        <HeaderLink color='green' pathname="/admin" text="Movies List" />
        <HeaderLink color='green' pathname="/admin/schedule-movie" text="Schedules" />
      </Flex>
    </Flex>
  );
};

export default Header;
