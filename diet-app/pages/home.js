import styles from '@/styles/shared.module.css';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardHeader, Center, Fade, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Slide, Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import { appName } from '@/app.config';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
    const [username, setUsername] = useState("");
    const [meals, setMeals] = useState([]);
    const [mealsLoaded, setMealsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setUsername("username")
        fetch("/api/recipes?q=beef")
        .then(raw => raw.json())
        .then(data => console.log(data))
        .catch(err => setError(true));
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
                    <MenuItem icon={<SettingsIcon/>}>edit preferences</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
        <Box className={styles.main} pos="relative">
            <Stack spacing={4}>
                <Heading fontSize="2xl">Recommended</Heading>
                {mealsLoaded ? 
                <Fade in={mealsLoaded}>
                    <Card>
                        <Image objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/640px-Hamburger_%28black_bg%29.jpg"/>
                        <CardBody>
                            <Stack spacing={2}>
                                <Heading fontSize="xl">Yummy meal</Heading>
                                <Box>
                                    <Tag>Chinese</Tag> <Tag>Vegan</Tag>
                                </Box>
                                <Box fontSize="sm">
                                    <Text>⚡ 300 Calories</Text>
                                    <Text>🕛 15-20min</Text>
                                    <Text></Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Fade> :
                <Center pt={8}>
                    <Spinner/>
                </Center>
                }
            </Stack>
        </Box>
        <Center pos="fixed" bottom="0" w="100%">
            <Button bg="primary.bg" color="primary.fg" fontSize="xl" py={8} w="100%" m={8} as="div">
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