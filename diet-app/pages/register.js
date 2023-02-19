import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Collapse, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from "next/link";
import { useState } from 'react';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(fn) {
        return e => fn(e.target.value)
    }

    function register(e) {
        e.preventDefault();
        if (password !== confirmPW) {
            return setError("Passwords do not match.");
        }
        setLoading(true);
        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(res => {
            setLoading(false);
            if (res.ok) return res.json();
            else throw new Error("Failed creating new account")
        })
        .then(data => setError(""))
        .catch(e => {
            setLoading(false);
            setError(e.message);
        });
    }

    return <main className={styles.main}>
        <form onSubmit={register}>
        <Stack spacing={4}>
            <Heading>Register</Heading>
            <Collapse in={error}>
                <Alert status="error" mt={2}>
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </Collapse> 
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<AtSignIcon />} />
                <Input placeholder="Username" name="username" value={username} onChange={handleChange(setUsername)}/>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<LockIcon />} />
                <Input placeholder="Password" name="password" type="password" value={password} onChange={handleChange(setPassword)}/>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<LockIcon />} />
                <Input placeholder="Confirm Password" name="confirm-password" type="password" value={confirmPW} onChange={handleChange(setConfirmPW)}/>
            </InputGroup>
            <Button bg="primary.bg" color="primary.fg" type="submit" isDisabled={loading}>Register</Button>
            <Text>Already have an account? <Link as={NextLink} color="primary.bg" href="/">Log in</Link>
            </Text>
        </Stack>
        </form>
    </main>
}