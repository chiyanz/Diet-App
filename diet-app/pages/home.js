import querystring from 'querystring'
import styles from '@/styles/shared.module.css';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardHeader, Center, Fade, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Slide, Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import { appName } from '@/app.config';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { useRouter } from 'next/router';

export default function Home({user}) {
    let router = useRouter()
    const [username, setUsername] = useState("");
    const [meals, setMeals] = useState([]);
    const [mealsLoaded, setMealsLoaded] = useState(false);
    const [error, setError] = useState(false);

    function editPreferences() {
        router.push('/onboarding')
    }

    useEffect(() => {
        setUsername(user.username)
        let data = { "_id" : user._id };
        let url = new URL("http://localhost:3000/api/user");
        for (let k in data) { url.searchParams.append(k, data[k]) }
        fetch(url).then((res) => {
            if(res.ok)
                return res.json()
            }).then(data => {
                let userPrefs = data.user.preferences
                let paramStr = "" 
                if(userPrefs.excluded !== undefined && userPrefs.excluded.length !== 0) {
                    paramStr += querystring.stringify({excluded: userPrefs.excluded})
                }
                if(userPrefs.health !== undefined && userPrefs.excluded.health !== 0) {
                    paramStr = paramStr ? paramStr + "&": paramStr
                    paramStr += querystring.stringify({health: userPrefs.health})
                }
                paramStr = paramStr ? "?" + paramStr : "?ingr=1%2B&time=1%2B"
                fetch(`/api/recipes${paramStr}`)
                .then(raw => raw.json())
                .then(recipes => {
                    setMeals(recipes);
                    setMealsLoaded(true);
                })
                .catch(err => setError(true));
                })
    }, [])

    return <>
        <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            direction="row" 
            px={8} 
            py={4} 
            shadow="md" 
            bg="primary.bg" 
            color="primary.fg">
            <Heading>{appName}</Heading>
            <Menu>
                <MenuButton>
                    {username} <ChevronDownIcon />
                </MenuButton>
                <MenuList color="black">
                    <MenuItem icon={<SettingsIcon/>} onClick={editPreferences}>edit preferences</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
        <Box className={styles.main} pos="relative">
            <Stack spacing={4}>
                <Heading fontSize="2xl">Recommended</Heading>
                {mealsLoaded ? 
                <Fade in={mealsLoaded}>
                    <Stack spacing={4}>
                    {meals.map(meal => 
                    <NextLink href={meal.link} key={meal.name}>
                    <Card>
                        <Image objectFit="cover" src={meal.img}/>
                        <CardBody>
                            <Stack spacing={2}>
                                <Heading fontSize="xl">{meal.name}</Heading>
                                <Box>
                                    {meal.cuisine.map(name => <Tag>{name.charAt(0).toUpperCase() + name.slice(1)}</Tag>)}
                                </Box>
                                <Box fontSize="sm">
                                    <Text>⚡ {Math.round(meal.calories)} Calories</Text>
                                    <Text>🕛 {meal.time}min</Text>
                                    <Text></Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    </NextLink>
                    )}  
                    </Stack>
                </Fade> :
                <Center pt={8}>
                    <Spinner/>
                </Center>
                }
            </Stack>
        </Box>
        <Center pos="fixed" bottom="0" w="100%">
            <Button bg="primary.bg" color="primary.fg" fontSize="xl" shadow="lg" py={8} w="100%" mx={12} my={4} as="div">
                <Link as={NextLink} href="/find-meal">New Meal</Link>
            </Button>
        </Center>
        <Slide direction="top" in={error}>
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>An error occurred.</AlertTitle>
                <AlertDescription>Could not load meals.</AlertDescription>
            </Alert>
        </Slide> 
    </>
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
  }) {
    const user = req.session.user;
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