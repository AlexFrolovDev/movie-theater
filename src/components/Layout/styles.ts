import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled(Flex)`
    flex: 1;
    justify-content: center;

    & > div {
        width: 100%;
    }
`;
