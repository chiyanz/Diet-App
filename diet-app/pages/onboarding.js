import { appName } from "@/app.config";
import { Button, Flex, Heading, SlideFade, Text } from "@chakra-ui/react";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import Link from "next/link";
import { useRouter } from "next/router";

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

export default function Onboarding({user}) {
    let router = useRouter()
    const [page, setPage] = useState(1);
    const [excludes, setExcludes] = useState([]);
    const [health, setHealth] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const excludeNames = ["Celery", "Crustacean", "Dairy", "Egg", "Fish", "Gluten", "Mollusk", "Mustard", "Peanut", "Pork", "Red Meat", "Sesame", "Shellfish", "Soy", "Tree nut", "Wheat"];
    const excludeValues = ["celery-free", "crustacean-free", "dairy-free", "egg-free", "fish-free", "gluten-free", "mollusk-free", "mustard-free", "peanut-free", "pork-free", "red-meat-free", "sesame-free", "shellfish-free", "tree-nut-free", "wheat-free"];
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
                _id: user._id,
                preferences: {
                    health: [...excludeValues.filter((val, i) => excludes[i]), 
                    ...healthValues.filter((val, i) => health[i])]
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
        .then(res => {
            if (res.ok) {
                // router.push('/home')
                return res.json()
            }
            else throw new Error();
        })
        .then(data => setSuccess(true))
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
                    excludeNames.map((name, i) => <Option key={i} 
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
                    healthNames.map((name, i) => <Option key={i}
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
        <Flex justifyContent="center" flexDir="column" gap={4} height="100%">
            {
                error ? <Heading textAlign="center">Something went wrong.</Heading> :
                (success ? <Heading textAlign="center">Successfully saved preferences.</Heading> : <Heading>Loading...</Heading>)
            }
            <Link href="/home"><Button display={error||success} w="100%">Return Home</Button></Link> 
        </Flex>
    </Page>
    </>
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
  }) {
    const user = req.session.user;
    console.log(user)
    if (user === undefined) {
      console.log("not logged in")
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: { isLoggedIn: false}
        },
      };
    }
  
    return {
      props: { user: req.session.user },
    };
  },
  sessionOptions);