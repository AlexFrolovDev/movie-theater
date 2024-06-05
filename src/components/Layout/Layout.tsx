import { Outlet } from "react-router-dom";
import {Flex} from '@chakra-ui/react'
import { Content, Wrapper } from "./styles";
import Header from "../Header";

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Content justifyContent={'center'} alignItems={'stretch'} overflow={'hidden'}>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Layout;
