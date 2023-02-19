import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Button, Card, CardBody, CardHeader, Collapse, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { appName } from '@/app.config';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Index() {
    let router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function handleChange(fn) {
        return e => fn(e.target.value)
    }

    function logIn(e) {
        e.preventDefault();
        setLoading(true);
        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setLoading(false);
            if (res.ok) {
                console.log("successful")
                router.push('/home')
                return res.json()
            }
            else throw new Error()
        })
        .then(data => setError(""))
        .catch(e => {
            setLoading(false);
            setError(e.message);
        });
    }
    
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
                    <Collapse in={error}>
                        <Alert status="error" mt={2}>
                            <AlertIcon />
                            <AlertTitle>An error occurred.</AlertTitle>
                            <AlertDescription>Please try again.</AlertDescription>
                        </Alert>
                    </Collapse> 
                </CardHeader>
                <CardBody>
                    <form onSubmit={logIn}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<AtSignIcon />} />
                            <Input placeholder="Username" name="username" onChange={handleChange(setUsername)} value={username} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<LockIcon />} />
                            <Input placeholder="Password" name="password" type="password" onChange={handleChange(setPassword)} password={password} />
                        </InputGroup>
                        <Button bg="primary.bg" color="primary.fg" type="submit" isDisabled={loading}>Log in</Button>
                        <Text>Don't have an account? <Link as={NextLink} color="primary.bg" href="/register">Create an account</Link>
                        </Text>
                    </Stack>
                    </form>
                </CardBody>
            </Card>
            </Stack>
        </main>
    </>
}