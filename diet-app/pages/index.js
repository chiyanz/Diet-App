import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardHeader, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Index() {
    return <>
        <main className={styles.main}>
            <Stack spacing={8}>
            <Stack spacing={4}>
                <Heading>🥗 Diet App</Heading>
                <Text fontSize="xl">Personalized meals based on your preferences</Text>
            </Stack>
            <Card>
                <CardHeader>Log In</CardHeader>
                <CardBody>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<AtSignIcon />} />
                            <Input placeholder="Username" name="username"></Input>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<LockIcon />} />
                            <Input placeholder="Password" name="password" type="password"></Input>
                        </InputGroup>
                        <Button>Log in</Button>
                        <Text>Don't have an account? <NextLink href="/register"><Link color="teal.500">Create an account</Link></NextLink>
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
            </Stack>
        </main>
    </>
}