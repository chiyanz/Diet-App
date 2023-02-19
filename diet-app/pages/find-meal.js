import { SearchIcon } from "@chakra-ui/icons";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Collapse, Flex, Heading, Input, InputGroup, InputLeftElement, SlideFade, Stack, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Url from "url"

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

function CuisineOption({selected, children, ...props}) {
    return <Button 
        flexBasis="49%" 
        colorScheme={selected ? "red" : "gray"}
        {...props}>
        {children}
    </Button>
}

export default function FindMeal() {
    const [page, setPage] = useState(0);
    const [meal, setMeal] = useState();
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    const cuisines = ['American', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'Southeast Asian']
    const cuisineVals = ['american', 'british', 'caribbean', 'centraleurope', 'chinese', 'easterneurope', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'middleeastern', 'nordic', 'southamerican', 'southeastasian']

    const nextPage = () => setPage(page + 1);

    function chooseMeal(type) {
        return () => {
            nextPage();
            setMeal(type);
        }
    }

    function toggleCuisine(i) {
        const copy = [...selectedCuisines];
        copy[i] = !copy[i];
        setSelectedCuisines(copy);
    }

    function selectSurprise(i) {
        nextPage();
        setSelectedCuisines(cuisines.map(x => true));
        router.push({
            pathname: "/recommended",
            query: {
                mealType: meal,
                cuisineType: cuisines
            }
        });
    }

    function chooseCuisines() {
        for (let el of selectedCuisines) 
            if (el) {
                router.push({
                    pathname: "/recommended",
                    query: {
                        mealType: meal,
                        cuisineType: cuisines.filter((val, i) => selectedCuisines[i])
                    }
                });
                return;
            }
        setError("Please choose at least one cuisine.")
    }

    function submit() {
        
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
        <Flex flexDir="column" height="100%" gap={8} overflow="auto">
            <Heading>What kinds of cuisine do you want?</Heading>
            <Box my={-4}>
            <Collapse in={error}>
                <Alert status="error" mt={2}>
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </Collapse>
            </Box>
             
            <Button onClick={selectSurprise} flexShrink={0}>✨ Surprise Me ✨</Button>
            <hr/>
            <Flex flexDir="row" gap="2%" rowGap={2} flexWrap="wrap" alignContent="flex-start">
                { 
                    cuisines.map((cuisine, i) => <CuisineOption 
                        selected={selectedCuisines[i]} 
                        onClick={() => toggleCuisine(i)}>
                            {cuisine}
                        </CuisineOption>) 
                }
            </Flex>
            <Button bg="primary.bg" color="primary.fg" onClick={chooseCuisines} flexShrink={0}>Continue</Button>
        </Flex>
    </Page>
    </Box>
}