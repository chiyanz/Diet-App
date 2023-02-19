import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from "next/link";

export default function Register() {
    return <main className={styles.main}>
        <Stack spacing={4}>
            <Heading>Register</Heading>
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
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<LockIcon />} />
                <Input placeholder="Confirm Password" name="confirm-password" type="password"></Input>
            </InputGroup>
            <Button bg="primary.bg" color="primary.fg">Register</Button>
            <Text>Already have an account? <Link as={NextLink} color="primary.bg" href="/">Log in</Link>
            </Text>
        </Stack>
    </main>
}