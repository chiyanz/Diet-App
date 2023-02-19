import { Box, Button, Flex, Heading, SlideFade, Stack } from "@chakra-ui/react";
import { useState } from "react";

const pageStyle = {
    position:"absolute", 
    top: 0,
    padding: "32px",
    height: "100vh",
    boxSizing: "border-box"
};
function Page({show, children}) {
    return <SlideFade in={show} style={pageStyle}>
        {children}
    </SlideFade>
}
export default function findMeal() {
    const [page, setPage] = useState(0);
    const nextPage = () => setPage(page + 1);
    return <Box pos="relative">
    <Page show={page == 0}>
        <Flex flexDir="column" height="100%" gap={8}>
            <Heading>What are you making today?</Heading>
            <Flex flexDir="column" gap={8} flex={1}>
                <Button flex={1} onClick={()=>{}} fontSize="lg">Breakfast</Button>
                <Button flex={1} fontSize="lg">Lunch</Button>
                <Button flex={1} fontSize="lg">Dinner</Button>
                <Button flex={1} fontSize="lg">Snack</Button>
            </Flex>
        </Flex>
    </Page>
    </Box>
}