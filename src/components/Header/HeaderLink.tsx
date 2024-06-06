import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderLink = (props) => {
  const { pathname } = useLocation();
  return (
    <Link to={props.pathname}>
      <Text
        size={"sm"}
        as={props.pathname === pathname ? "b" : "span"}
        color={props.color}
        cursor={"pointer"}
      >
        {props.text}
      </Text>
    </Link>
  );
};

export default HeaderLink;
