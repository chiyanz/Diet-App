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
    return <SlideFade in={show} style={pageStyle} unmountOnExit>
        {children}
    </SlideFade>
}

function CuisineOption({selected, children}) {
    return <Button flexBasis="49%" bg={selected ? "primary.bg" : undefined}>
        {children}
    </Button>
}

export default function findMeal() {
    const [page, setPage] = useState(1);
    const [meal, setMeal] = useState();
    const cuisines = ["Americanadsfasdf", "B", "C", "D", "E", "A", "B", "C", "D", "E"]

    const nextPage = () => setPage(page + 1);

    function chooseMeal(type) {
        return () => {
            nextPage();
            setMeal(type);
        }
    }

    return <Box pos="relative">
    <Page show={page == 0}>
        <Flex flexDir="column" height="100%" gap={8}>
            <Heading>What are you making today?</Heading>
            <Flex flexDir="column" gap={8} flex={1}>
                <Button flex={1} onClick={chooseMeal("breakfast")} fontSize="lg">Breakfast</Button>
                <Button flex={1} onClick={chooseMeal("lunch")} fontSize="lg">Lunch</Button>
                <Button flex={1} onClick={chooseMeal("dinner")} fontSize="lg">Dinner</Button>
                <Button flex={1} onClick={chooseMeal("snack")} fontSize="lg">Snack</Button>
            </Flex>
        </Flex>
    </Page>
    <Page show={page == 1}>
        <Flex flexDir="column" height="100%" gap={8}>
            <Heading>What kinds of cuisine do you want?</Heading>
            <Button>✨ Surprise Me ✨</Button>
            <hr/>
            <Flex flexDir="row" gap="2%" rowGap={2} flexWrap="wrap" flex={1} alignContent="flex-start">
                { 
                    cuisines.map(cuisine => <CuisineOption>{cuisine}</CuisineOption>) 
                }
            </Flex>
        </Flex>
    </Page>
    </Box>
}