import { appName } from "@/app.config";
import { Button, Flex, Heading, SlideFade, Text } from "@chakra-ui/react";
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

function Option({selected, children, ...props}) {
    return <Button 
        flexBasis="49%" 
        colorScheme={selected ? "red" : "gray"}
        {...props}>
        {children}
    </Button>
}

export default function Onboarding() {
    const [page, setPage] = useState(1);
    const [excludes, setExcludes] = useState([]);
    const [health, setHealth] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const excludeNames = ["Alcohol", "Celery", "Crustacean", "Dairy", "Egg", "Fish", "Gluten", "Mollusk", "Mustard", "Peanut", "Pork", "Red Meat", "Sesame", "Shellfish", "Soy", "Tree nut", "Wheat"];
    const excludeValues = ["alcohol-free", "celery-free", "crustacean-free", "dairy-free", "egg-free", "fish-free", "gluten-free", "mollusk-free", "mustard-free", "peanut-free", "pork-free", "red-meat-free", "sesame-free", "shellfish-free", "tree-nut-free", "wheat-free"];
    const healthNames = ["Kosher", "Keto", "Paleo", "Vegan", "Vegetarian"];
    const healthValues = ["kosher", "keto-friendly", "paleo", "vegan", "vegetarian"];

    function toggleExclude(i) {
        const copy = [...excludes];
        copy[i] = !copy[i]
        setExcludes(copy);
    }

    function toggleHealth(i) {
        const copy = [...health];
        copy[i] = !copy[i]
        setHealth(copy);
    }
    
    function submit() {
        fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
                preferences: {
                    excludes: excludeValues.filter((val, i) => excludes[i]),
                    health: healthValues.filter((val, i) => health[i])
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            else throw new Error();
        })
        .then(data => setSuccess(false))
        .catch(() => setError(true))
        nextPage();
    }

    const nextPage = () => setPage(page + 1);
    return <>
    <Page show={page == 0}>
        <Flex justifyContent="center" flexDir="column" gap={4} height="100%">
            <Heading>Welcome to {appName}!</Heading> 
            <Text>Answer some questions so we can personalize your experience.</Text>
            <Button onClick={nextPage} mt={16}>Continue</Button>
        </Flex>
    </Page>
    <Page show={page == 1}>
        <Flex flexDir="column" height="100%" gap={8} overflow="auto">
            <Heading>Which foods would you like to exclude?</Heading>
            <Flex flexDir="row" gap="2%" rowGap={2} flexWrap="wrap" alignContent="flex-start">
                { 
                    excludeNames.map((name, i) => <Option 
                        selected={excludes[i]} 
                        onClick={() => toggleExclude(i)}>
                            {name}
                        </Option>) 
                }
            </Flex>
            <Button bg="primary.bg" color="primary.fg" w="100%" onClick={nextPage}>Continue</Button>
        </Flex>
    </Page>
    <Page show={page == 2}>
        <Flex flexDir="column" height="100%" gap={8} overflow="auto">
            <Heading>What dietary restrictions do you have?</Heading>
            <Flex flexDir="row" gap="2%" rowGap={2} flexWrap="wrap" alignContent="flex-start">
                { 
                    healthNames.map((name, i) => <Option 
                        selected={health[i]} 
                        onClick={() => toggleHealth(i)}>
                            {name}
                        </Option>) 
                }
            </Flex>
            <Button bg="primary.bg" color="primary.fg" w="100%" onClick={submit}>Continue</Button>
        </Flex>
    </Page>
    <Page show={page == 3}>
        something
    </Page>
    </>
}