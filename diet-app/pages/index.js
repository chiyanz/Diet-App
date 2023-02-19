import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardHeader, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { appName } from '@/app.config';

export default function Index() {
    return <>
        <main className={styles.main}>
            <Stack spacing={8}>
            <Stack spacing={4}>
                <Heading>🥗 {appName}</Heading>
                <Text fontSize="xl">Personalized meals based on your preferences</Text>
            </Stack>
            <Card>
                <CardHeader>
                    <Heading fontSize="xl">Log In</Heading>
                </CardHeader>
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
                        <Button bg="primary.bg" color="primary.fg">Log in</Button>
                        <Text>Don't have an account? <Link as={NextLink} color="primary.bg" href="/register">Create an account</Link>
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
            </Stack>
        </main>
    </>
}